import { useEffect, useRef, useState } from 'react';
import { ContentCard } from '../components/ContentCard';
import { useWasmLoader, getWasmModule } from '../hooks/useWasmLoader';
import { FaLock, FaUnlock, FaLightbulb } from 'react-icons/fa';

declare global {
  interface Window {
    Module: any;
  }
}

export function DESEncryptionCard() {
  const [plaintext, setPlaintext] = useState('HELLO123');
  const [key, setKey] = useState('SECRET!!');
  const [ciphertext, setCiphertext] = useState('');
  const [error, setError] = useState('');
  const { loading, error: loadError, wasmReady } = useWasmLoader({
    moduleName: 'des',
    scriptSrc: '/PersonalSite/projects/public/des_demo.js',
    exportName: 'DESModule',
  });

  const handleEncrypt = () => {
    if (!wasmReady.current) {
      setError('WebAssembly not loaded yet');
      return;
    }

    if (plaintext.length !== 8) {
      setError('Plaintext must be exactly 8 characters');
      return;
    }

    if (key.length !== 8) {
      setError('Key must be exactly 8 characters');
      return;
    }

    try {
      const wasmModule = getWasmModule('des');
      const result = wasmModule.ccall(
        'des_encrypt_text',
        'string',
        ['string', 'string'],
        [plaintext, key]
      );

      if (result === 'ERROR') {
        setError('Encryption failed');
        setCiphertext('');
      } else {
        setCiphertext(result);
        setError('');
      }
    } catch (err) {
      setError(`Error encrypting: ${err}`);
      setCiphertext('');
    }
  };

  if (loading) {
    return (
      <div className="p-3 sm:p-6 bg-(--color-surface) rounded-lg border border-(--color-overlay)">
        <h3 className="text-base sm:text-lg font-bold mb-2 text-(--color-text) flex items-center gap-2">
          <FaLock className="text-(--color-pine) flex-shrink-0" /> Encryption
        </h3>
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

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Plaintext (8 characters)
          </label>
          <input
            type="text"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value.toUpperCase())}
            maxLength={8}
            className="w-full p-2 sm:p-3 bg-(--color-base) text-(--color-text) rounded border border-(--color-overlay) font-mono text-xs sm:text-sm"
            placeholder="MAX8CHAR"
          />
          <p className="text-xs text-(--color-subtle) mt-1">
            {plaintext.length}/8 characters
          </p>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Key (8 characters)
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase())}
            maxLength={8}
            className="w-full p-2 sm:p-3 bg-(--color-base) text-(--color-text) rounded border border-(--color-overlay) font-mono text-xs sm:text-sm"
            placeholder="SECRETKY"
          />
          <p className="text-xs text-(--color-subtle) mt-1">
            {key.length}/8 characters
          </p>
        </div>

        <button
          onClick={handleEncrypt}
          disabled={!wasmReady.current || plaintext.length !== 8 || key.length !== 8}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-(--color-pine) hover:bg-(--color-pine)/80 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors font-semibold text-sm sm:text-base"
        >
          Encrypt
        </button>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Ciphertext (Hex)
          </label>
          <div className="w-full p-2 sm:p-3 bg-(--color-muted) text-(--color-text) rounded border border-(--color-overlay) font-mono text-xs sm:text-sm break-all min-h-12 flex items-center">
            {ciphertext || 'Output will appear here...'}
          </div>
        </div>

        <div className="text-xs sm:text-sm text-(--color-subtle) p-2 sm:p-3 bg-(--color-base)/50 rounded">
          <span className="flex items-start gap-2">
            <FaLightbulb className="text-(--color-gold) mt-0.5 flex-shrink-0" />
            <span>Enter an 8-character plaintext and key, then click Encrypt to generate ciphertext using DES compiled to WebAssembly.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function DESDecryptionCard() {
  const [ciphertext, setCiphertext] = useState('');
  const [key, setKey] = useState('SECRET!!');
  const [plaintext, setPlaintext] = useState('');
  const [error, setError] = useState('');
  const { loading, error: loadError, wasmReady } = useWasmLoader({
    moduleName: 'des',
    scriptSrc: '/PersonalSite/projects/public/des_demo.js',
    exportName: 'DESModule',
  });

  const handleDecrypt = () => {
    if (!wasmReady.current) {
      setError('WebAssembly not loaded yet');
      return;
    }

    if (!ciphertext) {
      setError('Ciphertext is required');
      return;
    }

    if (key.length !== 8) {
      setError('Key must be exactly 8 characters');
      return;
    }

    try {
      const wasmModule = getWasmModule('des');
      const result = wasmModule.ccall(
        'des_decrypt_text',
        'string',
        ['string', 'string'],
        [ciphertext, key]
      );

      if (result === 'ERROR' || !result) {
        setError('Decryption failed');
        setPlaintext('');
      } else {
        setPlaintext(result.replace(/\0/g, ''));
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
        <h3 className="text-base sm:text-lg font-bold mb-2 text-(--color-text) flex items-center gap-2">
          <FaUnlock className="text-(--color-rose) flex-shrink-0" /> Decryption
        </h3>
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

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Ciphertext (Hex)
          </label>
          <input
            type="text"
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value.toLowerCase())}
            className="w-full p-2 sm:p-3 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
            placeholder="85e813540f0ab405"
          />
          <p className="text-xs text-(--color-subtle) mt-1">
            Enter hex ciphertext (16 characters)
          </p>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Key (8 characters)
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase())}
            maxLength={8}
            className="w-full p-2 sm:p-3 bg-(--color-base) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono"
            placeholder="SECRETKY"
          />
          <p className="text-xs text-(--color-subtle) mt-1">
            {key.length}/8 characters
          </p>
        </div>

        <button
          onClick={handleDecrypt}
          disabled={!wasmReady.current || !ciphertext || key.length !== 8}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-(--color-rose) hover:bg-(--color-rose)/80 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm sm:text-base rounded transition-colors font-semibold"
        >
          Decrypt
        </button>

        <div>
          <label className="block text-xs sm:text-sm font-semibold mb-2 text-(--color-text) truncate">
            Plaintext
          </label>
          <div className="w-full p-2 sm:p-3 bg-(--color-muted) text-xs sm:text-sm text-(--color-text) rounded border border-(--color-overlay) font-mono break-all min-h-12 flex items-center">
            {plaintext || 'Output will appear here...'}
          </div>
        </div>

        <div className="text-xs sm:text-sm text-(--color-subtle) p-2 sm:p-3 bg-(--color-base)/50 rounded">
          <span className="flex items-start gap-2">
            <FaLightbulb className="text-(--color-gold) mt-0.5 flex-shrink-0" />
            <span>Enter the hex ciphertext and the 8-character key used for encryption, then click Decrypt to recover the original plaintext.</span>
          </span>
        </div>
      </div>
    </div>
  );
}
