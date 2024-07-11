import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const path = require('path')

export default {
  input: path.resolve(__dirname, '../blocks/yandex-maps/view.js'),
  output: {
    file: path.resolve(__dirname, '../../assets/js/yandex-maps.js'),
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: true,
      main: true,
      jsnext: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 0.25%, not dead',
            useBuiltIns: 'entry',
            corejs: 3,
            debug: false,
            forceAllTransforms: true,
          },
        ],
      ],
    }),
    replace({
      preventAssignment: true,
    }),
  ],
}
