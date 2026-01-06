import { useWasmLoader } from './useWasmLoader';

export interface EmulatorModule
{
  ccall: (name: string, returnType: string | null, argTypes: string[], args: any[]) => any;
  cwrap: (name: string, returnType: string | null, argTypes: string[]) => (...args: any[]) => any;
}

export function useEmulatorWasm()
{
  const { loading, error, getModule } = useWasmLoader({
    moduleName: 'EmulatorModule',
    scriptSrc: '/wasm/emu4380_demo.js',
    exportName: 'Module'
  });

  const getEmulatorModule = (): EmulatorModule | null =>
  {
    return getModule() as EmulatorModule | null;
  };

  return { loading, error, getEmulatorModule };
}
