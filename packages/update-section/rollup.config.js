import { builtinModules } from 'module';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { dependencies } from './package.json';

export default {
  input: './src/index.ts',
  external: [...builtinModules, ...Object.keys(dependencies || {})],
  plugins: [
    resolve(),
    typescript({
      rootDir: 'src',
    }),
  ],
  output: {
    format: 'cjs',
    dir: './out',
    exports: 'auto',
  },
};
