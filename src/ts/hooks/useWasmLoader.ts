import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    [key: string]: any;
  }
}

// Global WASM module registry
const wasmModules = new Map<string, any>();
const wasmLoadingPromises = new Map<string, Promise<void>>();

export interface UseWasmLoaderOptions {
  moduleName: string;
  scriptSrc: string;
  exportName?: string; // The global export name (e.g., "DESModule", "RSAModule")
}

/**
 * Shared hook for loading WASM modules
 * Prevents duplicate loads and allows multiple modules to coexist on the same page
 */
export function useWasmLoader({ moduleName, scriptSrc, exportName }: UseWasmLoaderOptions)
{
  const [loading, setLoading] = useState(!wasmModules.has(moduleName));
  const [error, setError] = useState('');
  const wasmReady = useRef(!!wasmModules.has(moduleName));
  const actualExportName = exportName || moduleName;

  useEffect(() =>
  {
    // If already loaded, we're done
    if (wasmModules.has(moduleName))
    {
      wasmReady.current = true;
      setLoading(false);
      return;
    }

    // If loading is in progress, wait for it
    if (wasmLoadingPromises.has(moduleName))
    {
      const promise = wasmLoadingPromises.get(moduleName)!;
      promise
        .then(() =>
        {
          wasmReady.current = true;
          setLoading(false);
        })
        .catch(() =>
        {
          setError('Failed to load WebAssembly module');
          setLoading(false);
        });
      return;
    }

    // Start loading
    const loadPromise = new Promise<void>((resolve, reject) =>
    {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;

      script.onload = () =>
      {
        // Access the module factory from the global window using the export name
        const moduleFactory = (window as any)[actualExportName];

        if (moduleFactory && typeof moduleFactory === 'function')
        {
          // MODULARIZE=1: Call the factory function to create the module
          const moduleObj = moduleFactory();

          // Wait for runtime initialization
          moduleObj.then((instance: any) =>
          {
            // Assign to both the registry and window for easy access
            wasmModules.set(moduleName, instance);
            (window as any)[actualExportName] = instance;
            wasmReady.current = true;
            setLoading(false);
            resolve();
          }).catch((err: Error) =>
          {
            setError(`Failed to initialize ${moduleName}: ${err.message}`);
            setLoading(false);
            reject(err);
          });
        }
        else if (moduleFactory)
        {
          // Non-modular mode (shouldn't happen with MODULARIZE=1, but handle it)
          wasmModules.set(moduleName, moduleFactory);
          wasmReady.current = true;
          setLoading(false);
          resolve();
        }
        else
        {
          reject(new Error(`Module export name "${actualExportName}" not found`));
        }
      };

      script.onerror = () =>
      {
        reject(new Error('Script load failed'));
      };

      document.body.appendChild(script);
    });

    wasmLoadingPromises.set(moduleName, loadPromise);

    loadPromise
      .then(() =>
      {
        wasmReady.current = true;
        setLoading(false);
      })
      .catch(() =>
      {
        setError('Failed to load WebAssembly module');
        setLoading(false);
      });
  }, [moduleName, scriptSrc, actualExportName]);

  return { loading, error, wasmReady };
}

/**
 * Get a loaded WASM module by name
 */
export function getWasmModule(moduleName: string)
{
  return wasmModules.get(moduleName);
}

/**
 * Check if a WASM module is loaded
 */
export function isWasmModuleLoaded(moduleName: string)
{
  return wasmModules.has(moduleName);
}
