import { useEffect, useRef, useState } from 'react';
import { useWasmLoader, getWasmModule } from '../hooks/useWasmLoader';
import { FaKey, FaLock, FaUnlock, FaLockOpen, FaLightbulb } from 'react-icons/fa';

declare global {
  interface Window {
    Module: any;
  }
}

// Conversion utilities (shared across components)
const convertInputToDecimal = (input: string, format: string): number | null => {
  try {
    switch (format) {
      case 'ascii':
        // Convert ASCII string to decimal (concatenate char codes)
        if (!input) return null;
        const codes = Array.from(input).map(c => c.charCodeAt(0));
        return parseInt(codes.join(''));
      case 'decimal':
        return parseInt(input);
      case 'hex':
        return parseInt(input, 16);
      case 'binary':
        return parseInt(input, 2);
      default:
        return null;
    }
  } catch {
    return null;
  }
};

const convertDecimalToOutput = (value: string, format: string): string => {
  try {
    const num = parseInt(value);
    switch (format) {
      case 'ascii':
        // Convert decimal to ASCII string (split digits and convert each to char)
        const str = value.toString();
        let result = '';
        for (let i = 0; i < str.length; i += 2) {
          const code = parseInt(str.slice(i, i + 2));
          if (code >= 32 && code <= 126) {
            result += String.fromCharCode(code);
          }
        }
        return result || value;
      case 'decimal':
        return value;
      case 'hex':
        return num.toString(16).toUpperCase();
      case 'binary':
        return num.toString(2);
      default:
        return value;
    }
  } catch {
    return value;
  }
};

// Key Generation Card
export function RSAKeyGenerationCard() {
  const [p, setP] = useState('61');
  const [q, setQ] = useState('53');
  const [e, setE] = useState('17');
  const [n, setN] = useState('');
  const [d, setD] = useState('');
  const [lambda, setLambda] = useState('');
  const [error, setError] = useState('');
  const { loading, error: loadError, wasmReady } = useWasmLoader({
    moduleName: 'rsa',
    scriptSrc: '/PersonalSite/projects/public/rsa_demo.js',
    exportName: 'RSAModule',
  });

  const handleCalculate = () => {
    if (!wasmReady.current) {
      setError('WebAssembly not loaded yet');
      return;
    }

    try {
      const p_val = parseInt(p);
      const q_val = parseInt(q);
      const e_val = parseInt(e);

      if (isNaN(p_val) || isNaN(q_val) || isNaN(e_val)) {
        setError('All values must be valid integers');
        return;
      }

      // Validate primes
      const wasmModule = getWasmModule('rsa');
      const p_valid = wasmModule.ccall('is_prime', 'number', ['number'], [p_val]);
      const q_valid = wasmModule.ccall('is_prime', 'number', ['number'], [q_val]);

      if (!p_valid) {
        setError('p must be a prime number');
        return;
      }
      if (!q_valid) {
        setError('q must be a prime number');
        return;
      }

      // Calculate n and lambda
      const n_val = wasmModule.ccall('calculate_n', 'number', ['number', 'number'], [p_val, q_val]);
      const lambda_val = wasmModule.ccall('calculate_lambda', 'number', ['number', 'number'], [p_val, q_val]);

      // Validate e
      const e_valid = wasmModule.ccall('validate_e_value', 'number', ['number', 'number'], [e_val, lambda_val]);
      if (!e_valid) {
        setError('e must be coprime to lambda and between 3 and lambda-1');
        return;
      }

      // Calculate private exponent d
      const d_val = wasmModule.ccall('calculate_d', 'number', ['number', 'number'], [e_val, lambda_val]);

      setN(n_val.toString());
      setD(d_val.toString());
      setLambda(lambda_val.toString());
      setError('');
    } catch (err) {
      setError(`Error calculating: ${err}`);
    }
  };

  if (loading) {
    return (
      <div className="p-3 sm:p-6 bg-(--color-surface) rounded-lg border border-(--color-overlay)">
        <h3 className="text-base sm:text-lg font-bold mb-2 text-(--color-text)">Key Generation</h3>
        <div className="text-(--color-subtle) animate-pulse">
          Loading WebAssembly module...
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 bg-(--color-surface) rounded-lg border border-(--color-overlay) overflow-hidden">
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-(--color-text) flex items-center gap-2">
        <FaKey className="text-(--color-foam) flex-shrink-0" /> Key Generation
      </h3>
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
              onChange={(e) => setP(e.target.value)}
              className="w-full p-2 sm:p-2.5 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
              placeholder="61"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
              Prime q
            </label>
            <input
              type="number"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full p-2 sm:p-2.5 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
              placeholder="53"
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
            onChange={(e) => setE(e.target.value)}
            className="w-full p-2 sm:p-3 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
            placeholder="17"
          />
        </div>

        <button
          onClick={handleCalculate}
          disabled={!wasmReady.current}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-(--color-foam) hover:bg-(--color-foam)/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base rounded transition-colors font-semibold"
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
            <FaLightbulb className="text-(--color-gold) mt-0.5 flex-shrink-0" />
            <span>Enter two prime numbers (p, q) and public exponent (e) to generate RSA key pairs. Copy these keys to the encryption/decryption cards below.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// Encryption Card
export function RSAEncryptionCard() {
  const [e, setE] = useState('17');
  const [n, setN] = useState('3233');
  const [m, setM] = useState('10');
  const [ciphertext, setCiphertext] = useState('');
  const [error, setError] = useState('');
  const [inputFormat, setInputFormat] = useState<'ascii' | 'decimal' | 'hex' | 'binary'>('decimal');
  const [outputFormat, setOutputFormat] = useState<'ascii' | 'decimal' | 'hex' | 'binary'>('decimal');
  const { loading, error: loadError, wasmReady } = useWasmLoader({
    moduleName: 'rsa',
    scriptSrc: '/PersonalSite/projects/public/rsa_demo.js',
    exportName: 'RSAModule',
  });

  const handleEncrypt = () => {
    if (!wasmReady.current) {
      setError('WebAssembly not loaded yet');
      return;
    }

    if (!e || !n) {
      setError('Public key (e, n) is required');
      return;
    }

    try {
      const e_val = parseInt(e);
      const n_val = parseInt(n);
      const m_val = convertInputToDecimal(m, inputFormat);

      if (isNaN(e_val) || isNaN(n_val) || m_val === null || isNaN(m_val)) {
        setError('All values must be valid integers');
        return;
      }

      // Check if m < n
      if (m_val >= n_val) {
        setError('Plaintext value must be less than n');
        return;
      }

      // Perform modular exponentiation: c = m^e mod n
      // Using JavaScript's built-in BigInt for large number support
      const result = (BigInt(m_val) ** BigInt(e_val) % BigInt(n_val)).toString();

      const formattedResult = convertDecimalToOutput(result, outputFormat);
      setCiphertext(formattedResult);
      setError('');
    } catch (err) {
      setError(`Error encrypting: ${err}`);
      setCiphertext('');
    }
  };

  if (loading) {
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
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-(--color-text) flex items-center gap-2">
        <FaLock className="text-(--color-pine) flex-shrink-0" /> Encryption
      </h3>
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
              placeholder="17"
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
              placeholder="3233"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Input Format
          </label>
          <div className="flex gap-2">
            {(['ascii', 'decimal', 'hex', 'binary'] as const).map((format) => (
              <button
                key={format}
                onClick={() => {
                  setInputFormat(format);
                  setM('');
                }}
                className={`flex-1 px-2 py-1.5 rounded text-xs sm:text-xs font-semibold transition-colors ${
                  inputFormat === format
                    ? 'bg-(--color-foam) text-white'
                    : 'bg-(--color-muted) text-(--color-text) hover:bg-(--color-overlay)'
                }`}
              >
                {format.toUpperCase()}
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
            placeholder={inputFormat === 'ascii' ? 'Enter text' : inputFormat === 'hex' ? '0A' : inputFormat === 'binary' ? '1010' : '10'}
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Output Format
          </label>
          <div className="flex gap-2">
            {(['ascii', 'decimal', 'hex', 'binary'] as const).map((format) => (
              <button
                key={format}
                onClick={() => setOutputFormat(format)}
                className={`flex-1 px-2 py-1.5 rounded text-xs sm:text-xs font-semibold transition-colors ${
                  outputFormat === format
                    ? 'bg-(--color-pine) text-white'
                    : 'bg-(--color-muted) text-(--color-text) hover:bg-(--color-overlay)'
                }`}
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleEncrypt}
          disabled={!wasmReady.current}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-(--color-pine) hover:bg-(--color-pine)/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base rounded transition-colors font-semibold"
        >
          Encrypt
        </button>

        {ciphertext && (
          <div className="p-2 sm:p-3 bg-(--color-muted) rounded">
            <p className="text-xs text-(--color-subtle) mb-1">Ciphertext (c)</p>
            <p className="font-mono text-xs sm:text-sm text-(--color-text) break-all">{ciphertext}</p>
          </div>
        )}

        <div className="text-xs sm:text-sm text-(--color-subtle) p-2 sm:p-3 bg-(--color-base)/50 rounded">
          <span className="flex items-start gap-2">
            <FaLightbulb className="text-(--color-gold) mt-0.5 flex-shrink-0" />
            <span>Enter public key (e, n) from key generation above, choose input/output formats, then encrypt your plaintext.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// Decryption Card
export function RSADecryptionCard() {
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [n, setN] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [error, setError] = useState('');
  const [inputFormat, setInputFormat] = useState<'ascii' | 'decimal' | 'hex' | 'binary'>('decimal');
  const [outputFormat, setOutputFormat] = useState<'ascii' | 'decimal' | 'hex' | 'binary'>('decimal');
  const { loading, error: loadError, wasmReady } = useWasmLoader({
    moduleName: 'rsa',
    scriptSrc: '/PersonalSite/projects/public/rsa_demo.js',
    exportName: 'RSAModule',
  });

  const handleDecrypt = () => {
    if (!wasmReady.current) {
      setError('WebAssembly not loaded yet');
      return;
    }

    if (!c || !d || !n) {
      setError('Ciphertext, d, and n are required');
      return;
    }

    try {
      const c_val = convertInputToDecimal(c, inputFormat);
      const d_val = parseInt(d);
      const n_val = parseInt(n);

      if (c_val === null || isNaN(c_val) || isNaN(d_val) || isNaN(n_val)) {
        setError('All values must be valid integers');
        return;
      }

      const wasmModule = getWasmModule('rsa');
      const result = wasmModule.ccall(
        'rsa_decrypt',
        'string',
        ['number', 'number', 'number'],
        [c_val, d_val, n_val]
      );

      if (result === 'ERROR' || !result) {
        setError('Decryption failed');
        setPlaintext('');
      } else {
        const formattedResult = convertDecimalToOutput(result, outputFormat);
        setPlaintext(formattedResult);
        setError('');
      }
    } catch (err) {
      setError(`Error decrypting: ${err}`);
      setPlaintext('');
    }
  };

  if (loading) {
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
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-(--color-text) flex items-center gap-2">
        <FaUnlock className="text-(--color-rose) flex-shrink-0" /> Decryption
      </h3>
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
            {(['ascii', 'decimal', 'hex', 'binary'] as const).map((format) => (
              <button
                key={format}
                onClick={() => {
                  setInputFormat(format);
                  setC('');
                }}
                className={`flex-1 px-2 py-1.5 rounded text-xs sm:text-xs font-semibold transition-colors ${
                  inputFormat === format
                    ? 'bg-(--color-foam) text-white'
                    : 'bg-(--color-muted) text-(--color-text) hover:bg-(--color-overlay)'
                }`}
              >
                {format.toUpperCase()}
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
            {(['ascii', 'decimal', 'hex', 'binary'] as const).map((format) => (
              <button
                key={format}
                onClick={() => setOutputFormat(format)}
                className={`flex-1 px-2 py-1.5 rounded text-xs sm:text-xs font-semibold transition-colors ${
                  outputFormat === format
                    ? 'bg-(--color-rose) text-white'
                    : 'bg-(--color-muted) text-(--color-text) hover:bg-(--color-overlay)'
                }`}
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDecrypt}
          disabled={!wasmReady.current || !c || !d || !n}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-(--color-rose) hover:bg-(--color-rose)/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base rounded transition-colors font-semibold"
        >
          Decrypt
        </button>

        {plaintext && (
          <div className="p-2 sm:p-3 bg-(--color-muted) rounded">
            <p className="text-xs text-(--color-subtle) mb-1">Plaintext (m)</p>
            <p className="font-mono text-xs sm:text-sm text-(--color-text) break-all">{plaintext}</p>
          </div>
        )}

        <div className="text-xs sm:text-sm text-(--color-subtle) p-2 sm:p-3 bg-(--color-base)/50 rounded">
          <span className="flex items-start gap-2">
            <FaLightbulb className="text-(--color-gold) mt-0.5 flex-shrink-0" />
            <span>Enter ciphertext and private key (d, n) from key generation to decrypt. Choose formats for input and output.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
