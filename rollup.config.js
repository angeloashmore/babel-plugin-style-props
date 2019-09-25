import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const __PROD__ = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), '@babel/core'],
  plugins: [
    typescript(),
    __PROD__ && terser(), // minifies generated bundles
  ],
}
