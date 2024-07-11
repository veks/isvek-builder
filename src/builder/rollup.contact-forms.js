import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const path = require('path')

export default {
  input: path.resolve(__dirname, '../blocks/contact-forms/view.js'),
  output: {
    file: path.resolve(__dirname, '../../assets/js/contact-forms.js'),
    format: 'umd',
    name: 'isvekPlugin',
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      babelHelpers: 'runtime',
      plugins: [
        [
          '@babel/plugin-transform-runtime', {
          'helpers': true,
          'regenerator': true,
        }],
      ],
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
    nodeResolve({
      jsnext: true,
      main: false,
    }),
    replace({
      preventAssignment: true,
    }),
  ],
}
