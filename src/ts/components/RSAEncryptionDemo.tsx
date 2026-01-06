import { useEffect, useState } from 'react';
import { useWasmLoader, getWasmModule } from '../hooks/useWasmLoader';
import { FaKey, FaLock, FaUnlock, FaLockOpen, FaLightbulb, FaExclamationTriangle } from 'react-icons/fa';

declare global {
  interface Window {
    Module: any;
  }
}

// Conversion utilities (shared across components)
const convertInputToDecimal = (input: string, format: string): number | null =>
{
  try
  {
    switch (format)
    {
      case 'string':
      {
        // For string format, process one character at a time
        // Return the character code of the first character
        if (!input)
        {
          return null;
        }
        const firstChar = input.charCodeAt(0);
        return firstChar;
      }
      case 'decimal':
        return parseInt(input);
      case 'hex':
        return parseInt(input, 16);
      case 'binary':
        return parseInt(input, 2);
      default:
        return null;
    }
  }
  catch
  {
    return null;
  }
};

// Helper to format comma-separated decimal list into hex list
const formatDecimalListToHex = (list: string): string =>
{
  return list
    .split(',')
    .map((v) => v.trim())
    .filter((v) => v.length > 0)
    .map((v) => BigInt(v).toString(16).toUpperCase())
    .join(',');
};

// Helper to format comma-separated decimal list into character string
const formatDecimalListToString = (list: string): string =>
{
  return list
    .split(',')
    .map((v) => v.trim())
    .filter((v) => v.length > 0)
    .map((v) => String.fromCharCode(Number(v)))
    .join('');
};

// Helper to parse comma-separated hex list to bigint array
const parseHexListToBigInt = (input: string): bigint[] =>
{
  const parts = input
    .split(',')
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
  if (parts.length === 0)
  {
    return [];
  }
  return parts.map((p) =>
  {
    const val = BigInt(`0x${p}`);
    return val;
  });
};

const convertDecimalToOutput = (value: string, format: string): string =>
{
  try
  {
    const num = parseInt(value);
    switch (format)
    {
      case 'string':
        // Convert decimal back to string character if it's a valid printable ASCII code
        if (num >= 32 && num <= 126)
        {
          return String.fromCharCode(num);
        }
        // If not a valid printable ASCII, return the decimal value
        return value;
      case 'decimal':
        return value;
      case 'hex':
        return num.toString(16).toUpperCase();
      case 'binary':
        return num.toString(2);
      default:
        return value;
    }
  }
  catch
  {
    return value;
  }
};

// Helper function to check if a number is prime
const isPrime = (num: number): boolean =>
{
  if (num <= 1)
  {
    return false;
  }
  if (num <= 3)
  {
    return true;
  }
  if (num % 2 === 0 || num % 3 === 0)
  {
    return false;
  }
  for (let i = 5; i * i <= num; i += 6)
  {
    if (num % i === 0 || num % (i + 2) === 0)
    {
      return false;
    }
  }
  return true;
};

// Helper function to generate a random 4-digit prime
const generateRandomPrime = (): number =>
{
  let prime = 0;
  while (!isPrime(prime))
  {
    prime = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }
  return prime;
};

// Helper function to calculate GCD
const gcd = (a: number, b: number): number =>
{
  return b === 0 ? a : gcd(b, a % b);
};

// Helper function to calculate modular multiplicative inverse using Extended Euclidean Algorithm
const modularInverse = (e: number, lambda: number): number =>
{
  let [old_r, r] = [e, lambda];
  let [old_s, s] = [1, 0];

  while (r !== 0)
  {
    const quotient = Math.floor(old_r / r);
    [old_r, r] = [r, old_r - quotient * r];
    [old_s, s] = [s, old_s - quotient * s];
  }

  return old_s < 0 ? old_s + lambda : old_s;
};

// Helper function to calculate Carmichael's lambda
const calculateLambda = (p: number, q: number): number =>
{
  const p_minus_1 = p - 1;
  const q_minus_1 = q - 1;
  return (p_minus_1 * q_minus_1) / gcd(p_minus_1, q_minus_1);
};

// Helper function to find a suitable e value
const findSuitableE = (p: number, q: number): number =>
{
  const lambda = calculateLambda(p, q);
  // Try common e values first
  const commonEs = [17, 65537, 3, 5, 7, 11, 13];
  for (const e of commonEs)
  {
    if (e < lambda && gcd(e, lambda) === 1)
    {
      return e;
    }
  }
  // If no common e works, find any valid e
  for (let e = 3; e < lambda; e += 2)
  {
    if (gcd(e, lambda) === 1)
    {
      return e;
    }
  }
  return 17; // fallback
};

// Key Generation Card
export function RSAKeyGenerationCard()
{
  // Generate random 4-digit primes on component mount
  const [suggestedP, setSuggestedP] = useState(generateRandomPrime());
  const [suggestedQ, setSuggestedQ] = useState(generateRandomPrime());
  const [suggestedE, setSuggestedE] = useState(() => findSuitableE(suggestedP, suggestedQ));

  const [p, setP] = useState('');
  const [q, setQ] = useState('');
  const [e, setE] = useState('');
  const [n, setN] = useState('');
  const [d, setD] = useState('');
  const [lambda, setLambda] = useState('');
  const [error, setError] = useState('');

  // Clear error when inputs change
  const handlePChange = (value: string) =>
  {
    setP(value);
    setError('');
  };
  const handleQChange = (value: string) =>
  {
    setQ(value);
    setError('');
  };
  const handleEChange = (value: string) =>
  {
    setE(value);
    setError('');
  };

  // Update suggested e when p or q changes
  useEffect(() =>
  {
    const p_val = p ? parseInt(p) : suggestedP;
    const q_val = q ? parseInt(q) : suggestedQ;

    if (isPrime(p_val) && isPrime(q_val) && p_val !== q_val)
    {
      setSuggestedE(findSuitableE(p_val, q_val));
    }
    else
    {
      setSuggestedE(findSuitableE(suggestedP, suggestedQ));
    }
  }, [p, q, suggestedP, suggestedQ]);

  const { loading, error: loadError, wasmReady } = useWasmLoader({
    moduleName: 'rsa',
    scriptSrc: '/PersonalSite/wasm/rsa_demo.js',
    exportName: 'RSAModule',
  });

  const handleCalculate = () =>
  {
    if (!wasmReady.current)
    {
      setError('WebAssembly not loaded yet');
      return;
    }

    try
    {
      const p_val = parseInt(p);
      const q_val = parseInt(q);
      const e_val = parseInt(e);

      if (isNaN(p_val) || isNaN(q_val) || isNaN(e_val))
      {
        setError('All values must be valid integers');
        return;
      }

      // Validate primes
      const wasmModule = getWasmModule('rsa');
      const p_valid = wasmModule.ccall('is_prime', 'number', ['number'], [p_val]);
      const q_valid = wasmModule.ccall('is_prime', 'number', ['number'], [q_val]);

      if (!p_valid)
      {
        setError('p must be a prime number');
        return;
      }
      if (!q_valid)
      {
        setError('q must be a prime number');
        return;
      }

      // Calculate n and lambda
      const n_val = wasmModule.ccall('calculate_n', 'number', ['number', 'number'], [p_val, q_val]);
      const lambda_val = wasmModule.ccall('calculate_lambda', 'number', ['number', 'number'], [p_val, q_val]);

      // Validate e
      const e_valid = wasmModule.ccall('validate_e_value', 'number', ['number', 'number'], [e_val, lambda_val]);
      if (!e_valid)
      {
        setError('e must be coprime to lambda and between 3 and lambda-1');
        return;
      }

      // Calculate private exponent d
      const d_val = modularInverse(e_val, lambda_val);

      setN(n_val.toString());
      setD(d_val.toString());
      setLambda(lambda_val.toString());

      // Persist latest generated keys for other cards
      localStorage.setItem('rsa_last_p', p_val.toString());
      localStorage.setItem('rsa_last_q', q_val.toString());
      localStorage.setItem('rsa_last_e', e_val.toString());
      localStorage.setItem('rsa_last_n', n_val.toString());
      localStorage.setItem('rsa_last_d', d_val.toString());
      setError('');
    }
    catch (err)
    {
      setError(`Error calculating: ${err}`);
    }
  };

  if (loading)
  {
    return (
      <div className="p-3 sm:p-6 bg-(--color-surface) rounded-lg border border-(--color-overlay)">
        <h3 className="text-base sm:text-lg font-bold mb-2 text-(--color-text)">Key Generation</h3>
        <div className="text-(--color-subtle) animate-pulse">
          Loading WebAssembly module...
        </div>
      </div>
    );
  }

  const handleUseSuggested = () =>
  {
    // Regenerate fresh random primes on each click
    const newP = generateRandomPrime();
    const newQ = generateRandomPrime();
    const newE = findSuitableE(newP, newQ);

    setSuggestedP(newP);
    setSuggestedQ(newQ);
    setSuggestedE(newE);

    setP(newP.toString());
    setQ(newQ.toString());
    setE(newE.toString());
    setError('');
  };

  return (
    <div className="p-3 sm:p-6 bg-(--color-surface) rounded-lg border border-(--color-overlay) overflow-hidden">
      <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold text-(--color-text) flex items-center gap-2">
          <FaKey className="text-(--color-iris) shrink-0" /> Key Generation
        </h3>
        <button
          onClick={handleUseSuggested}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded border border-(--color-iris)/50 bg-(--color-iris)/10 text-(--color-iris) hover:bg-(--color-iris)/30 transition-all duration-300 hover:scale-98"
        >
          Use Random Primes
        </button>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {(error || loadError) && (
          <div className="p-3 bg-(--color-rose)/20 border border-(--color-rose)/50 rounded text-(--color-rose) text-sm">
            {error || loadError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
              Prime p
            </label>
            <input
              type="number"
              value={p}
              onChange={(e) => handlePChange(e.target.value)}
              className="w-full p-2 sm:p-2.5 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
              placeholder={`Suggested: ${suggestedP}`}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
              Prime q
            </label>
            <input
              type="number"
              value={q}
              onChange={(e) => handleQChange(e.target.value)}
              className="w-full p-2 sm:p-2.5 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
              placeholder={`Suggested: ${suggestedQ}`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Public Exponent e
          </label>
          <input
            type="number"
            value={e}
            onChange={(e) => handleEChange(e.target.value)}
            className="w-full p-2 sm:p-3 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
            placeholder={`Suggested: ${suggestedE}`}
          />
        </div>

        <button
          onClick={handleCalculate}
          disabled={!wasmReady.current}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-(--color-iris) hover:bg-(--color-iris)/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base rounded transition-all duration-400 hover:scale-98 active:scale-95 font-semibold"
        >
          Generate Key Pairs
        </button>

        {n && d && (
          <div className="space-y-3 sm:space-y-4">
            <div className="p-2 sm:p-3 bg-(--color-pine)/10 border border-(--color-pine)/30 rounded">
              <p className="text-xs sm:text-sm font-semibold text-(--color-pine) mb-2 flex items-center gap-1">
                <FaUnlock /> Public Key (for encryption)
              </p>
              <div className="font-mono text-xs sm:text-sm text-(--color-text) space-y-1">
                <p><span className="text-(--color-subtle)">e =</span> {e}</p>
                <p><span className="text-(--color-subtle)">n =</span> {n}</p>
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-(--color-rose)/10 border border-(--color-rose)/30 rounded">
              <p className="text-xs sm:text-sm font-semibold text-(--color-rose) mb-2 flex items-center gap-1">
                <FaLockOpen /> Private Key (for decryption)
              </p>
              <div className="font-mono text-xs sm:text-sm text-(--color-text) space-y-1">
                <p><span className="text-(--color-subtle)">d =</span> {d}</p>
                <p><span className="text-(--color-subtle)">n =</span> {n}</p>
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-(--color-muted) rounded text-xs text-(--color-subtle)">
              <p><strong>λ(n):</strong> {lambda} (Carmichael's totient)</p>
            </div>
          </div>
        )}

        <div className="text-xs sm:text-sm text-(--color-subtle) p-2 sm:p-3 bg-(--color-base)/50 rounded">
          <span className="flex items-start gap-2">
            <FaLightbulb className="text-(--color-gold) mt-0.5 shrink-0" />
            <span>Enter two prime numbers (p, q) and public exponent (e) to generate RSA key pairs. Copy these keys to the encryption/decryption cards below.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// Encryption Card
export function RSAEncryptionCard()
{
  const [e, setE] = useState('');
  const [n, setN] = useState('');
  const [m, setM] = useState('');
  const [rawCiphertext, setRawCiphertext] = useState(''); // Store raw decimal result
  const [ciphertext, setCiphertext] = useState('');
  const [lastCipherWasString, setLastCipherWasString] = useState(false);
  const [error, setError] = useState('');
  const [inputFormat, setInputFormat] = useState<'string' | 'decimal' | 'hex' | 'binary'>('string');
  const [outputFormat, setOutputFormat] = useState<'string' | 'decimal' | 'hex' | 'binary'>('string');
  const { loading, error: loadError, wasmReady } = useWasmLoader({
    moduleName: 'rsa',
    scriptSrc: '/PersonalSite/wasm/rsa_demo.js',
    exportName: 'RSAModule',
  });

  const handleFillFromGenerator = () =>
  {
    const storedE = localStorage.getItem('rsa_last_e');
    const storedN = localStorage.getItem('rsa_last_n');
    if (!storedE || !storedN)
    {
      setError('Generate keys first in Key Generation');
      return;
    }
    setE(storedE);
    setN(storedN);
    setError('');
  };

  // Update formatted output when output format changes
  useEffect(() =>
  {
    if (!rawCiphertext)
    {
      return;
    }
    if (lastCipherWasString)
    {
      setCiphertext(formatDecimalListToHex(rawCiphertext));
      return;
    }
    const formattedResult = convertDecimalToOutput(rawCiphertext, outputFormat);
    setCiphertext(formattedResult);
  }, [outputFormat, rawCiphertext, lastCipherWasString]);

  const handleEncrypt = () =>
  {
    if (!wasmReady.current)
    {
      setError('WebAssembly not loaded yet');
      return;
    }

    if (!e || !n)
    {
      setError('Public key (e, n) is required');
      return;
    }

    try
    {
      const e_val = BigInt(e);
      const n_val = BigInt(n);

      if (inputFormat === 'string')
      {
        if (!m)
        {
          setError('Enter text to encrypt');
          return;
        }
        const chars = Array.from(m);
        const codes = chars.map((ch) => BigInt(ch.charCodeAt(0)));
        if (codes.some((code) => code >= n_val))
        {
          setError('Each character code must be less than n');
          return;
        }
        const results = codes.map((code) => (code ** e_val % n_val).toString());
        const rawList = results.join(',');
        setRawCiphertext(rawList);
        setLastCipherWasString(true);
        // Always show hex list for string mode
        setCiphertext(formatDecimalListToHex(rawList));
        setError('');
        return;
      }

      const m_val = convertInputToDecimal(m, inputFormat);

      if (m_val === null)
      {
        setError('Invalid input value');
        return;
      }

      const m_bigint = BigInt(m_val);

      // Check if m < n
      if (m_bigint >= n_val)
      {
        setError('Plaintext value must be less than n');
        return;
      }

      // Perform modular exponentiation: c = m^e mod n
      const result = (m_bigint ** e_val % n_val).toString();

      setRawCiphertext(result);
      setLastCipherWasString(false);
      const formattedResult = convertDecimalToOutput(result, outputFormat);
      setCiphertext(formattedResult);
      setError('');
    }
    catch (err)
    {
      setError(`Error encrypting: ${err}`);
      setRawCiphertext('');
      setCiphertext('');
      setLastCipherWasString(false);
    }
  };

  if (loading)
  {
    return (
      <div className="p-3 sm:p-6 bg-(--color-surface) rounded-lg border border-(--color-overlay)">
        <h3 className="text-base sm:text-lg font-bold mb-2 text-(--color-text)">Encryption</h3>
        <div className="text-(--color-subtle) animate-pulse">
          Loading WebAssembly module...
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 bg-(--color-surface) rounded-lg border border-(--color-overlay) overflow-hidden">
      <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold text-(--color-text) flex items-center gap-2">
          <FaLock className="text-(--color-pine) shrink-0" /> Encryption
        </h3>
        <button
          onClick={handleFillFromGenerator}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded border border-(--color-pine)/50 bg-(--color-pine)/10 text-(--color-pine) hover:bg-(--color-pine)/30 transition-all duration-300 hover:scale-98"
        >
          Fill from Generator
        </button>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {(error || loadError) && (
          <div className="p-3 bg-(--color-rose)/20 border border-(--color-rose)/50 rounded text-(--color-rose) text-sm">
            {error || loadError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
              Public e
            </label>
            <input
              type="number"
              value={e}
              onChange={(e) => setE(e.target.value)}
              className="w-full p-2 sm:p-2.5 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
              placeholder="e"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
              Modulus n
            </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              className="w-full p-2 sm:p-2.5 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
              placeholder="n"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Input Format
          </label>
          <div className="flex gap-2">
            {(['string', 'decimal', 'hex', 'binary'] as const).map((format) => (
              <button
                key={format}
                onClick={() =>
                {
                  setInputFormat(format);
                  setM('');
                }}
                className={`flex-1 px-2 py-1.5 rounded text-xs sm:text-xs font-semibold transition-all duration-400 hover:scale-98 ${
                  inputFormat === format
                    ? 'bg-(--color-foam) text-white'
                    : 'bg-(--color-muted) text-(--color-text) hover:bg-(--color-overlay)'
                }`}
              >
                {format === 'string' ? 'STRING' : format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Plaintext (m)
          </label>
          <input
            type="text"
            value={m}
            onChange={(e) => setM(e.target.value)}
            className="w-full p-2 sm:p-3 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
            placeholder={inputFormat === 'string' ? 'Enter text' : inputFormat === 'hex' ? '42' : inputFormat === 'binary' ? '1000010' : '66'}
          />
          {inputFormat === 'string' && (
            <p className="text-xs text-(--color-subtle) mt-1">Each character will be encrypted separately</p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Output Format
          </label>
          <div className="flex gap-2">
            {(['string', 'decimal', 'hex', 'binary'] as const).map((format) => (
              <button
                key={format}
                onClick={() => setOutputFormat(format)}
                className={`flex-1 px-2 py-1.5 rounded text-xs sm:text-xs font-semibold transition-all duration-400 hover:scale-98 ${
                  outputFormat === format
                    ? 'bg-(--color-pine) text-white'
                    : 'bg-(--color-muted) text-(--color-text) hover:bg-(--color-overlay)'
                }`}
              >
                {format === 'string' ? 'STRING' : format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleEncrypt}
          disabled={!wasmReady.current}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-(--color-pine) hover:bg-(--color-pine)/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base rounded transition-all duration-400 hover:scale-98 active:scale-95 font-semibold"
        >
          Encrypt
        </button>

        {ciphertext && (
          <div className="p-2 sm:p-3 bg-(--color-muted) rounded">
            <p className="text-xs text-(--color-subtle) mb-1">Ciphertext (c)</p>
            <p className="font-mono text-xs sm:text-sm text-(--color-text) break-all">{ciphertext}</p>
            {lastCipherWasString && (
              <p className="text-[11px] text-(--color-subtle) mt-1">Format: comma-separated hex values (per character)</p>
            )}
          </div>
        )}

        <div className="text-xs sm:text-sm text-(--color-subtle) p-2 sm:p-3 bg-(--color-base)/50 rounded">
          <span className="flex items-start gap-2">
            <FaLightbulb className="text-(--color-gold) mt-0.5 shrink-0" />
            <span>Enter public key (e, n) from key generation above, choose input/output formats, then encrypt your plaintext.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// Decryption Card
export function RSADecryptionCard()
{
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [n, setN] = useState('');
  const [rawPlaintext, setRawPlaintext] = useState(''); // Store raw decimal result
  const [plaintext, setPlaintext] = useState('');
  const [lastPlainWasString, setLastPlainWasString] = useState(false);
  const [error, setError] = useState('');
  const [inputFormat, setInputFormat] = useState<'string' | 'decimal' | 'hex' | 'binary'>('string');
  const [outputFormat, setOutputFormat] = useState<'string' | 'decimal' | 'hex' | 'binary'>('string');
  const { loading, error: loadError, wasmReady } = useWasmLoader({
    moduleName: 'rsa',
    scriptSrc: '/PersonalSite/wasm/rsa_demo.js',
    exportName: 'RSAModule',
  });

  const handleFillFromGenerator = () =>
  {
    const storedD = localStorage.getItem('rsa_last_d');
    const storedN = localStorage.getItem('rsa_last_n');
    if (!storedD || !storedN)
    {
      setError('Generate keys first in Key Generation');
      return;
    }
    setD(storedD);
    setN(storedN);
    setError('');
  };

  // Update formatted output when output format changes
  useEffect(() =>
  {
    if (!rawPlaintext)
    {
      return;
    }
    if (lastPlainWasString)
    {
      setPlaintext(formatDecimalListToString(rawPlaintext));
      return;
    }
    const formattedResult = convertDecimalToOutput(rawPlaintext, outputFormat);
    setPlaintext(formattedResult);
  }, [outputFormat, rawPlaintext, lastPlainWasString]);

  const handleDecrypt = () =>
  {
    if (!wasmReady.current)
    {
      setError('WebAssembly not loaded yet');
      return;
    }

    if (!c || !d || !n)
    {
      setError('Ciphertext, d, and n are required');
      return;
    }

    try
    {
      const d_val = BigInt(d);
      const n_val = BigInt(n);

      if (inputFormat === 'string')
      {
        if (!c)
        {
          setError('Enter ciphertext to decrypt');
          return;
        }
        const cipherList = parseHexListToBigInt(c);
        if (cipherList.length === 0)
        {
          setError('Invalid ciphertext list');
          return;
        }
        const results = cipherList.map((val) => (val ** d_val % n_val).toString());
        const rawList = results.join(',');
        setRawPlaintext(rawList);
        setLastPlainWasString(true);
        setPlaintext(formatDecimalListToString(rawList));
        setError('');
        return;
      }

      const c_val = convertInputToDecimal(c, inputFormat);

      if (c_val === null)
      {
        setError('Invalid input value');
        return;
      }

      const c_bigint = BigInt(c_val);

      // Perform modular exponentiation: m = c^d mod n
      const result = (c_bigint ** d_val % n_val).toString();

      setRawPlaintext(result);
      setLastPlainWasString(false);
      const formattedResult = convertDecimalToOutput(result, outputFormat);
      setPlaintext(formattedResult);
      setError('');
    }
    catch (err)
    {
      setError(`Error decrypting: ${err}`);
      setRawPlaintext('');
      setPlaintext('');
      setLastPlainWasString(false);
    }
  };

  if (loading)
  {
    return (
      <div className="p-3 sm:p-6 bg-(--color-surface) rounded-lg border border-(--color-overlay)">
        <h3 className="text-base sm:text-lg font-bold mb-2 text-(--color-text)">Decryption</h3>
        <div className="text-(--color-subtle) animate-pulse">
          Loading WebAssembly module...
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 bg-(--color-surface) rounded-lg border border-(--color-overlay) overflow-hidden">
      <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold text-(--color-text) flex items-center gap-2">
          <FaUnlock className="text-(--color-rose) shrink-0" /> Decryption
        </h3>
        <button
          onClick={handleFillFromGenerator}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded border border-(--color-rose)/50 bg-(--color-rose)/10 text-(--color-rose) hover:bg-(--color-rose)/30 transition-all duration-300 hover:scale-98"
        >
          Fill from Generator
        </button>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {(error || loadError) && (
          <div className="p-3 bg-(--color-rose)/20 border border-(--color-rose)/50 rounded text-(--color-rose) text-sm">
            {error || loadError}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
              Private d
            </label>
            <input
              type="number"
              value={d}
              onChange={(e) => setD(e.target.value)}
              className="w-full p-2 sm:p-2.5 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
              placeholder="d"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
              Modulus n
            </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              className="w-full p-2 sm:p-2.5 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
              placeholder="n"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Input Format
          </label>
          <div className="flex gap-2">
            {(['string', 'decimal', 'hex', 'binary'] as const).map((format) => (
              <button
                key={format}
                onClick={() =>
                {
                  setInputFormat(format);
                  setC('');
                }}
                className={`flex-1 px-2 py-1.5 rounded text-xs sm:text-xs font-semibold transition-all duration-400 hover:scale-98 ${
                  inputFormat === format
                    ? 'bg-(--color-foam) text-white'
                    : 'bg-(--color-muted) text-(--color-text) hover:bg-(--color-overlay)'
                }`}
              >
                {format === 'string' ? 'STRING' : format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Ciphertext (c)
          </label>
          <input
            type="text"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="w-full p-2 sm:p-3 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
            placeholder="Enter ciphertext"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Output Format
          </label>
          <div className="flex gap-2">
            {(['string', 'decimal', 'hex', 'binary'] as const).map((format) => (
              <button
                key={format}
                onClick={() => setOutputFormat(format)}
                className={`flex-1 px-2 py-1.5 rounded text-xs sm:text-xs font-semibold transition-all duration-400 hover:scale-98 ${
                  outputFormat === format
                    ? 'bg-(--color-rose) text-white'
                    : 'bg-(--color-muted) text-(--color-text) hover:bg-(--color-overlay)'
                }`}
              >
                {format === 'string' ? 'STRING' : format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDecrypt}
          disabled={!wasmReady.current || !c || !d || !n}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-(--color-rose) hover:bg-(--color-rose)/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base rounded transition-all duration-400 hover:scale-98 active:scale-95 font-semibold"
        >
          Decrypt
        </button>

        {plaintext && (
          <div className="p-2 sm:p-3 bg-(--color-muted) rounded">
            <p className="text-xs text-(--color-subtle) mb-1">Plaintext (m)</p>
            <p className="font-mono text-xs sm:text-sm text-(--color-text) break-all">{plaintext}</p>
            {lastPlainWasString && (
              <p className="text-[11px] text-(--color-subtle) mt-1">Decrypted string from comma-separated hex list</p>
            )}
          </div>
        )}

        <div className="text-xs sm:text-sm text-(--color-subtle) p-2 sm:p-3 bg-(--color-base)/50 rounded">
          <span className="flex items-start gap-2">
            <FaLightbulb className="text-(--color-gold) mt-0.5 shrink-0" />
            <span>
              Enter ciphertext and private key (d, n) from key generation to decrypt. Choose formats for input and output.
            </span>
          </span>
          <span className="flex items-start gap-2 mt-2 text-(--color-love)">
            <FaExclamationTriangle className="mt-0.5 shrink-0" />
            <span>Warning: Larger values or longer strings may take extra time to decrypt. Algorithm is not optimized for performance and is intended solely for educational purposes.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
