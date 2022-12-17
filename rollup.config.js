const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
const serve = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');
const nodeResolve = require('@rollup/plugin-node-resolve');
const { name, author, description } = require('./package.json');

const pkgName = 'IdleDiscover';

const banner = `
/**
 * ${name} - ${description}.
 * (c) ${new Date().getFullYear()} ${author.name} - ${author.email}
 * Released under the MIT License.
 */
`;

module.exports = {
  input: './src/index.ts',
  output: [
    {
      name: pkgName,
      format: 'umd',
      file: `dist/${name}.js`,
      banner,
    },
    {
      name: pkgName,
      format: 'umd',
      file: `dist/${name}.min.js`,
      plugins: [terser()],
    },
    {
      name: pkgName,
      format: 'es',
      file: `dist/${name}.esm.js`,
      banner,
    },
    {
      name: pkgName,
      format: 'es',
      file: `dist/${name}.esm.min.js`,
      plugins: [terser()],
    },
  ],
  plugins: [
    typescript({
      compilerOptions: {
        lib: ['es2021', 'dom'],
        target: 'es5',
      },
      declaration: false,
      sourceMap: false,
    }),

    nodeResolve(),

    process.env.NODE_ENV === 'development' ? serve({
      port: 9527,
      open: true,
      openPage: '/index.html',
      verbose: true,
      contentBase: ['example', 'dist'],
    }) : null,

    process.env.NODE_ENV === 'development' ? livereload() : null,
  ],
};
