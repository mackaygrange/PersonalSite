import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

export function TerminalDemo() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new Terminal({
      rows: 15,
      cols: 60,
      fontSize: 14,
      theme: {
        background: '#1a1a2e',
        foreground: '#e0e0e0',
        cursor: '#00ff00',
      }
    });

    terminal.open(terminalRef.current);
    terminal.write('$ Welcome to my terminal!\r\n');
    terminal.write('$ echo "This is a demo"\r\n');
    terminal.write('This is a demo\r\n');
    terminal.write('$ ');

    const handleData = (data: string) => {
      if (data === '\r') {
        terminal.write('\r\n$ ');
      } else if (data === '\u007F') {
        // Backspace
        terminal.write('\b \b');
      } else {
        terminal.write(data);
      }
    };

    terminal.onData(handleData);

    return () => {
      terminal.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{
        width: '100%',
        minHeight: '300px',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    />
  );
}