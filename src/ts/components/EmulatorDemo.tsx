import React, { useState, useEffect, useRef } from 'react';
import { useWasmLoader, getWasmModule } from '../hooks/useWasmLoader';
import { FaMicrochip, FaPlay, FaStepForward, FaRedo, FaLightbulb, FaBug, FaFastForward } from 'react-icons/fa';

// Add custom styles for console and input
const consoleStyles = `
  .console-container::-webkit-scrollbar {
    width: 8px;
  }
  .console-container::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  .console-container::-webkit-scrollbar-thumb {
    background: #22c55e;
    border-radius: 4px;
  }
  .console-container::-webkit-scrollbar-thumb:hover {
    background: #16a34a;
  }
  .console-input::-webkit-outer-spin-button,
  .console-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .console-input[type=number] {
    -moz-appearance: textfield;
  }
`;

interface RegisterState
{
  [key: string]: number;
}

export function EmulatorDemo()
{
  const { loading, error: loadError, wasmReady } = useWasmLoader({
    moduleName: 'emulator',
    scriptSrc: '/PersonalSite/wasm/emu4380_demo.js',
    exportName: 'EmulatorModule',
  });
  const [registers, setRegisters] = useState<RegisterState>({});
  const [programLoaded, setProgramLoaded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string[]>([]);
  const [consoleOutputDebug, setConsoleOutputDebug] = useState<string[]>([]);
  const [consoleOutputRegular, setConsoleOutputRegular] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [currentPC, setCurrentPC] = useState(0);
  const [currentInstruction, setCurrentInstruction] = useState('');
  const [programHalted, setProgramHalted] = useState(false);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [pausedForInput, setPausedForInput] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [debugMode, setDebugMode] = useState(false);
  const [totalCycles, setTotalCycles] = useState(0);
  const fastFinishRef = useRef(false);
  const initializeRef = useRef(false);

  // Helper to get the appropriate console output based on debug mode
  const consoleOutput = debugMode ? consoleOutputDebug : consoleOutputRegular;

  // Initialize emulator when WASM is ready
  useEffect(() =>
  {
    if (loading || loadError) return;
    if (initializeRef.current) return;

    // Check if the module is available
    const module = getWasmModule('emulator');
    if (!module) return;

    try
    {
      initializeRef.current = true;
      // Initialize with 128KB memory
      const result = module.ccall('init_emulator', 'number', ['number'], [131072]);
      if (result !== 1)
      {
        initializeRef.current = false;
      }
    }
    catch (err)
    {
      console.error('Initialization error:', err);
      initializeRef.current = false;
    }

    return () => {
      initializeRef.current = false;
    };
  }, [loading, loadError]);

  // Helper to add syntax highlighting to console output
  const highlightConsoleLine = (line: string) => {
    const debugIndex = line.indexOf('[DEBUG]');
    
    const highlightPart = (text: string, isDebug: boolean) => {
      const parts = text.split(/(\d+)/g);
      const baseColor = isDebug ? 'text-rose-400' : 'text-green-400';
      
      return (
        <span className={baseColor}>
          {parts.map((part, i) => {
            // Only highlight numbers in cyan if NOT in debug message
            if (/^\d+$/.test(part) && !isDebug) {
              return <span key={i} className="text-cyan-400">{part}</span>;
            }
            return <span key={i}>{part}</span>;
          })}
        </span>
      );
    };
    
    if (debugIndex !== -1) {
      // Split at [DEBUG] and color each part differently
      const beforeDebug = line.substring(0, debugIndex);
      const debugPart = line.substring(debugIndex);
      
      return (
        <>
          {beforeDebug && highlightPart(beforeDebug, false)}
          {highlightPart(debugPart, true)}
        </>
      );
    }
    
    // No debug message, just normal highlighting
    return highlightPart(line, false);
  };

  // Helper function to filter debug output
  const filterDebugOutput = (lines: string[]): string[] =>
  {
    return lines
      .map(line => {
        const debugIndex = line.indexOf('[DEBUG]');
        if (debugIndex !== -1) {
          return line.substring(0, debugIndex).trim();
        }
        return line;
      })
      .filter(line => line.length > 0);
  };

  const updateRegisterDisplay = () =>
  {
    const module = getWasmModule('emulator');
    if (!module) return;

    try
    {
      const regsJson = module.ccall('get_registers', 'string', [], []);
      const regsData = JSON.parse(regsJson);
      setRegisters(regsData);

      const pc = module.ccall('get_pc', 'number', [], []);
      setCurrentPC(pc);

      // Get current instruction
      try
      {
        const instrPtr = module.ccall('get_current_instruction', 'number', [], []);
        if (instrPtr !== 0)
        {
          const instrStr = module.UTF8ToString(instrPtr);
          if (instrStr && instrStr.length > 0)
          {
            setCurrentInstruction(instrStr);
          }
          else
          {
            setCurrentInstruction('N/A');
          }
          module.ccall('free_memory', null, ['number'], [instrPtr]);
        }
        else
        {
          setCurrentInstruction('N/A');
        }
      }
      catch (instrErr)
      {
        console.error('Error getting instruction:', instrErr);
        setCurrentInstruction('N/A');
      }

      // Get cycle information
      try
      {
        const cycles = module.ccall('get_total_cycles', 'number', [], []);
        const lastInstrCycles = module.ccall('get_last_instruction_cycles', 'number', [], []);
        
        setTotalCycles(cycles || 0);
      }
      catch (e)
      {
        console.error('Error getting cycles:', e);
        setTotalCycles(0);
      }

      // Get console output
      try
      {
        const consolePtr = module.ccall('get_console_output', 'string', [], []);
        if (consolePtr && consolePtr.length > 0)
        {
          const lines = consolePtr.split('\n').filter((line: string) => line.trim().length > 0);
          // Always add to debug version
          setConsoleOutputDebug(prev => [...prev, ...lines]);
          // Add filtered version to regular
          const filteredLines = filterDebugOutput(lines);
          if (filteredLines.length > 0)
          {
            setConsoleOutputRegular(prev => [...prev, ...filteredLines]);
          }
        }
      }
      catch (consoleErr)
      {
        console.error('Error getting console output:', consoleErr);
      }
    }
    catch (err)
    {
      console.error('Error reading registers:', err);
    }
  };

  const loadExampleProgram = async (programName?: string) =>
  {
    const module = getWasmModule('emulator');
    if (!module) return;

    const program = programName || selectedProgram;
    const programDescriptions: { [key: string]: string } = {
      'Program_A': 'Fibonacci Calculator',
      'Program_B': 'Program B',
      'Program_C': 'Program C',
      'Program_D': 'Program D',
      'testall': 'All Tests',
      'testall_v2': 'All Tests V2'
    };

    try
    {
      // Fetch the selected program binary
      const response = await fetch(`/PersonalSite/wasm/${program}.bin`);
      if (!response.ok)
      {
        setError(`Failed to load binary for ${program}`);
        return;
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const binary = new Uint8Array(arrayBuffer);

      // Allocate memory and copy binary data
      const ptr = module.ccall('allocate_memory', 'number', ['number'], [binary.length]);
      
      // Access the heap through the module's HEAPU8 property
      const HEAPU8 = module.HEAPU8;
      if (!HEAPU8)
      {
        setError('Memory heap not available');
        return;
      }
      
      // Copy binary data to the allocated memory
      HEAPU8.set(binary, ptr);

      // Load the program
      const result = module.ccall('load_program', 'number', ['number', 'number'], [ptr, binary.length]);
      module.ccall('free_memory', null, ['number'], [ptr]);

      if (result === 1)
      {
        setProgramLoaded(true);
        setProgramHalted(false);
        setTotalCycles(0);
        setExecutionOutput([`Program loaded: ${programDescriptions[program]} (Project 4 - ${program})`, 'Ready to execute']);
        setConsoleOutputDebug([]);
        setConsoleOutputRegular([]);
        module.ccall('clear_console_output', null, [], []);
        updateRegisterDisplay();
        setError('');
      }
      else
      {
        setError('Failed to load program');
      }
    }
    catch (err)
    {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(`Error loading program: ${errorMsg}`);
      if (debugMode) console.error('Load error:', err);
    }
  };

  const stepInstruction = () =>
  {
    const module = getWasmModule('emulator');
    if (!module || !programLoaded || programHalted) return;

    try
    {
      const result = module.ccall('step', 'number', [], []);
      if (debugMode) console.log('step() returned:', result);

      if (result === 1)
      {
        updateRegisterDisplay();
        setExecutionOutput(prev => [...prev, `Step: PC=0x${currentPC.toString(16).toUpperCase()}`]);
      }
      else if (result === 2)
      {
        // Input requested
        setPausedForInput(false); // Step mode doesn't need to resume with run
        updateRegisterDisplay();
        setShowInputDialog(true);
        setInputValue('');
        setExecutionOutput(prev => [...prev, 'Program waiting for input...']);
      }
      else if (result === 0)
      {
        // Program halted
        setProgramHalted(true);
        updateRegisterDisplay();
        setExecutionOutput(prev => [...prev, 'Program halted (TRP 0)']);
      }
      else if (result === -1)
      {
        setProgramHalted(true);
        setError('Execution error encountered');
        setExecutionOutput(prev => [...prev, 'ERROR: Execution failed']);
        if (debugMode) console.error('Step returned -1 (execution error)');
      }
    }
    catch (err)
    {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(`Step error: ${errorMsg}`);
      if (debugMode) console.error('Step error:', err);
    }
  };

  const runProgram = () =>
  {
    const module = getWasmModule('emulator');
    if (!module || !programLoaded || programHalted) return;

    setIsRunning(true);
    fastFinishRef.current = false; // Reset fast finish flag
    let stepCount = 0;
    let lastUpdateTime = Date.now();
    const UPDATE_INTERVAL_MS = 100; // Update display every 100ms in animated mode

    // Fast-finish mode: run synchronously until completion
    const runFastFinish = () =>
    {
      try
      {
        while (true)
        {
          const result = module.ccall('step', 'number', [], []);
          if (debugMode) console.log('step() returned:', result);

          if (result === 1)
          {
            stepCount++;
            // Continue looping
          }
          else if (result === 2)
          {
            // Input requested
            setPausedForInput(true);
            setIsRunning(false);
            updateRegisterDisplay();
            setShowInputDialog(true);
            setInputValue('');
            setExecutionOutput(prev => [...prev, 'Program waiting for input...']);
            return;
          }
          else if (result === 0)
          {
            // Program halted (TRP 0)
            setProgramHalted(true);
            setIsRunning(false);
            fastFinishRef.current = false;
            updateRegisterDisplay();
            setExecutionOutput(prev => [...prev, `Program halted after ${stepCount} steps`]);
            return;
          }
          else if (result === -1)
          {
            // Execution error
            setProgramHalted(true);
            setIsRunning(false);
            fastFinishRef.current = false;
            setError('Execution error');
            setExecutionOutput(prev => [...prev, 'ERROR: Execution failed']);
            if (debugMode) console.error('Step returned -1 (execution error)');
            return;
          }
          else if (result === -2)
          {
            // Max cycles exceeded
            setProgramHalted(true);
            setIsRunning(false);
            fastFinishRef.current = false;
            setError('Max cycles exceeded (possible infinite loop)');
            setExecutionOutput(prev => [...prev, 'ERROR: Max cycles exceeded']);
            if (debugMode) console.error('Step returned -2 (max cycles exceeded)');
            return;
          }
        }
      }
      catch (err)
      {
        const errorMsg = err instanceof Error ? err.message : String(err);
        setError(`Run error: ${errorMsg}`);
        setExecutionOutput(prev => [...prev, `ERROR: ${errorMsg}`]);
        console.error('Run error:', err);
        setIsRunning(false);
      }
    };

    // Animated mode: run with frame updates
    const executeNextStep = () =>
    {
      if (!programLoaded) return;

      try
      {
        // Check if fast-finish was requested
        if (fastFinishRef.current)
        {
          runFastFinish();
          return;
        }

        const result = module.ccall('step', 'number', [], []);
        if (debugMode) console.log('step() returned:', result);

        if (result === 1)
        {
          // Step executed successfully
          stepCount++;
          
          // Throttle updates to every 100ms for performance
          const now = Date.now();
          if (now - lastUpdateTime >= UPDATE_INTERVAL_MS)
          {
            updateRegisterDisplay();
            lastUpdateTime = now;
          }
          
          // Schedule next step with requestAnimationFrame
          requestAnimationFrame(() =>
          {
            executeNextStep();
          });
        }
        else if (result === 2)
        {
          // Input requested
          setPausedForInput(true);
          setIsRunning(false);
          updateRegisterDisplay();
          setShowInputDialog(true);
          setInputValue('');
          setExecutionOutput(prev => [...prev, 'Program waiting for input...']);
        }
        else if (result === 0)
        {
          // Program halted (TRP 0)
          setProgramHalted(true);
          setIsRunning(false);
          fastFinishRef.current = false;
          updateRegisterDisplay();
          setExecutionOutput(prev => [...prev, `Program halted after ${stepCount} steps`]);
        }
        else if (result === -1)
        {
          // Execution error
          setProgramHalted(true);
          setIsRunning(false);
          fastFinishRef.current = false;
          setError('Execution error');
          setExecutionOutput(prev => [...prev, 'ERROR: Execution failed']);
          if (debugMode) console.error('Step returned -1 (execution error)');
        }
        else if (result === -2)
        {
          // Max cycles exceeded
          setProgramHalted(true);
          setIsRunning(false);
          fastFinishRef.current = false;
          setError('Max cycles exceeded (possible infinite loop)');
          setExecutionOutput(prev => [...prev, 'ERROR: Max cycles exceeded']);
          if (debugMode) console.error('Step returned -2 (max cycles exceeded)');
        }
      }
      catch (err)
      {
        const errorMsg = err instanceof Error ? err.message : String(err);
        setError(`Run error: ${errorMsg}`);
        setExecutionOutput(prev => [...prev, `ERROR: ${errorMsg}`]);
        console.error('Run error:', err);
        setIsRunning(false);
      }
    };

    // Start the execution loop
    executeNextStep();
  };

  const resetEmulator = () =>
  {
    const module = getWasmModule('emulator');
    if (!module) return;

    try
    {
      module.ccall('reset', 'number', [], []);
      module.ccall('clear_console_output', null, [], []);
      setProgramHalted(false);
      setTotalCycles(0);
      updateRegisterDisplay();
      setExecutionOutput(['Emulator reset']);
      setConsoleOutputDebug([]);
      setConsoleOutputRegular([]);
      setError('');
    }
    catch (err)
    {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(`Reset error: ${errorMsg}`);
      console.error('Reset error:', err);
    }
  };

  const handleInputSubmit = () =>
  {
    const module = getWasmModule('emulator');
    if (!module) return;

    const inputNum = parseInt(inputValue, 10);
    if (isNaN(inputNum))
    {
      setError('Please enter a valid integer');
      return;
    }

    if (debugMode)
    {
      console.log('handleInputSubmit: Submitting input value:', inputNum, 'pausedForInput:', pausedForInput);
      console.log('handleInputSubmit: Current PC before provide_input:', module.ccall('get_pc', 'number', [], []));
    }
    setShowInputDialog(false);
    setInputValue('');
    // Add input echo to both debug and regular outputs
    setConsoleOutputDebug(prev => [...prev, `> ${inputNum}`]);
    setConsoleOutputRegular(prev => [...prev, `> ${inputNum}`]);

    // Provide input to the emulator
    module.ccall('provide_input', null, ['number'], [inputNum]);
    if (debugMode) console.log('handleInputSubmit: PC after provide_input:', module.ccall('get_pc', 'number', [], []));
    module.ccall('clear_input_request', null, [], []);
    if (debugMode) console.log('handleInputSubmit: Called provide_input and clear_input_request');

    // Continue execution based on what mode we were in
    setTimeout(() =>
    {
      if (debugMode)
      {
        console.log('handleInputSubmit: Resuming execution, pausedForInput:', pausedForInput);
        console.log('handleInputSubmit: PC before resuming run/step:', module.ccall('get_pc', 'number', [], []));
      }
      if (pausedForInput)
      {
        // Continue running
        if (debugMode) console.log('handleInputSubmit: Calling runProgram()');
        runProgram();
      }
      else
      {
        // Continue stepping
        if (debugMode) console.log('handleInputSubmit: Calling stepInstruction()');
        stepInstruction();
      }
    }, 100);
  };

  if (loading)
  {
    return (
      <div className="p-6 bg-(--color-surface) rounded-lg border border-(--color-overlay)">
        <div className="text-(--color-subtle) animate-pulse">
          Loading WebAssembly emulator...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Custom styles */}
      <style>{consoleStyles}</style>
      
      {/* Hint */}
      <div className="text-xs sm:text-sm text-(--color-subtle) p-3 rounded bg-(--color-base)/50">
        <span className="flex items-start gap-2">
          <FaLightbulb className="text-(--color-gold) mt-0.5 shrink-0" />
          <span>
            This is a working CS4380 CPU emulator running in your browser via WebAssembly. 
            The example program calculates Fibonacci numbers (Project 4 - Program A). 
            Step through or run the instructions to see the register states and console output change.
            When the program requests input (TRP #2), you will be prompted to enter an integer value.
          </span>
        </span>
      </div>

      {(error || loadError) && (
        <div className="p-3 bg-(--color-rose)/20 border border-(--color-rose)/50 rounded text-(--color-rose) text-sm">
          {error || loadError}
        </div>
      )}

      {/* Control Panel */}
      <div className="p-4 bg-(--color-surface) rounded-lg border border-(--color-overlay)">
        <h3 className="text-lg font-bold mb-4 text-(--color-text) flex items-center gap-2">
          <FaMicrochip className="text-(--color-pine)" /> Control Panel
        </h3>
        
        {/* Program Selection and Debug Toggle */}
        <div className="mb-4 flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-(--color-gold) mb-2">Select Program</label>
            <select
              value={selectedProgram}
              onChange={(e) => {
                setSelectedProgram(e.target.value);
                setProgramLoaded(false);
                setProgramHalted(false);
                setError('');
              }}
              className="w-full px-3 py-2 bg-(--color-base) border border-(--color-overlay) rounded text-(--color-text) focus:outline-none focus:border-(--color-gold) cursor-pointer"
            >
              <option value="" disabled>Select Program...</option>
              <option value="Program_A">Program A - Fibonacci</option>
              <option value="Program_B">Program B</option>
              <option value="Program_C">Program C</option>
              <option value="Program_D">Program D</option>
              <option value="testall">Test All</option>
              <option value="testall_v2">Test All V2</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => loadExampleProgram()}
            disabled={programLoaded || !selectedProgram}
            className="px-4 py-2 bg-(--color-pine)/80 hover:bg-(--color-pine) disabled:bg-(--color-overlay) disabled:cursor-not-allowed text-white rounded transition-all duration-400 hover:scale-98 active:scale-95"
          >
            Load Program
          </button>
          
          <button
            onClick={stepInstruction}
            disabled={!programLoaded || isRunning || programHalted}
            className="px-4 py-2 bg-(--color-gold)/80 hover:bg-(--color-gold) disabled:bg-(--color-overlay) disabled:cursor-not-allowed text-white rounded transition-all duration-400 hover:scale-98 active:scale-95 flex items-center gap-2"
          >
            <FaStepForward /> Step
          </button>
          
          <button
            onClick={runProgram}
            disabled={!programLoaded || isRunning || programHalted}
            className="px-4 py-2 bg-(--color-iris)/80 hover:bg-(--color-iris) disabled:bg-(--color-overlay) disabled:cursor-not-allowed text-white rounded transition-all duration-400 hover:scale-98 active:scale-95 flex items-center gap-2"
          >
            <FaPlay /> Run
          </button>
          
          <button
            onClick={() => fastFinishRef.current = true}
            disabled={!programLoaded || !isRunning || programHalted}
            className="px-4 py-2 bg-(--color-gold)/80 hover:bg-(--color-gold) disabled:bg-(--color-overlay) disabled:cursor-not-allowed text-white rounded transition-all duration-400 hover:scale-98 active:scale-95 flex items-center gap-2"
          >
            <FaFastForward /> Finish
          </button>
          
          <button
            onClick={resetEmulator}
            disabled={!programLoaded || isRunning}
            className="px-4 py-2 bg-(--color-rose)/80 hover:bg-(--color-rose) disabled:bg-(--color-overlay) disabled:cursor-not-allowed text-white rounded transition-all duration-400 hover:scale-98 active:scale-95 flex items-center gap-2"
          >
            <FaRedo /> Reset
          </button>
          
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-(--color-subtle)">Off</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={debugMode}
                onChange={(e) => setDebugMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-(--color-base) peer-checked:bg-(--color-gold) rounded-full peer transition-colors border border-(--color-overlay)"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-(--color-overlay) rounded-full peer-checked:translate-x-5 transition-transform"></div>
            </label>
            <span className="text-xs text-(--color-subtle) flex items-center gap-1">
              <FaBug /> Debug
            </span>
          </div>
        </div>
      </div>

      {/* Current Instruction */}
      {programLoaded && (
        <div className="p-4 bg-(--color-surface) rounded-lg border border-(--color-overlay)">
          <h3 className="text-lg font-bold mb-3 text-(--color-text)">Current Instruction</h3>
          <div className="bg-(--color-base)/50 rounded p-3 space-y-2">
            <div className="font-mono text-sm">
              <span className="text-(--color-gold) font-bold">PC:</span>{' '}
              <span className="text-(--color-text)">0x{currentPC.toString(16).toUpperCase().padStart(8, '0')}</span>
            </div>
            <div className="font-mono text-sm">
              <span className="text-(--color-gold) font-bold">Instruction:</span>{' '}
              <span className="text-(--color-text)">{currentInstruction || 'N/A'}</span>
            </div>
            <div className="font-mono text-sm">
              <span className="text-(--color-pine) font-bold">Total Memory Cycles:</span>{' '}
              <span className="text-(--color-text)">{totalCycles}</span>
            </div>
          </div>
        </div>
      )}

      {/* Registers Display */}
      <div className="p-4 bg-(--color-surface) rounded-lg border border-(--color-overlay)">
        <h3 className="text-lg font-bold mb-4 text-(--color-text)">Register File</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-sm">
          {Object.entries(registers).map(([reg, value]) => (
            <div key={reg} className="p-2 bg-(--color-base)/50 rounded">
              <span className="text-(--color-gold) font-bold">{reg}:</span>{' '}
              <span className="text-(--color-text)">0x{value.toString(16).toUpperCase().padStart(8, '0')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Console Output */}
      {consoleOutput.length > 0 && (
        <div className="p-4 bg-(--color-surface) rounded-lg border border-(--color-overlay)">
          <h3 className="text-lg font-bold mb-4 text-(--color-text)">Console Output</h3>
          <div className="console-container bg-black/80 rounded p-3 max-h-48 overflow-y-auto font-mono text-sm">
            {consoleOutput.map((line, i) => (
              <div key={i}>{highlightConsoleLine(line)}</div>
            ))}
            
            {/* Console Input */}
            {showInputDialog && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-green-400">&gt;</span>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleInputSubmit();
                    }
                  }}
                  className="console-input flex-1 bg-black text-green-400 font-mono text-sm border border-green-400/50 rounded px-2 py-1 focus:outline-none focus:border-green-400"
                  placeholder="Enter integer"
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Execution Output */}
      <div className="p-4 bg-(--color-surface) rounded-lg border border-(--color-overlay)">
        <h3 className="text-lg font-bold mb-4 text-(--color-text)">Execution Log</h3>
        <div className="bg-(--color-base)/50 rounded p-3 max-h-48 overflow-y-auto font-mono text-sm">
          {executionOutput.map((line, i) => (
            <div key={i} className="text-(--color-text)">{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
