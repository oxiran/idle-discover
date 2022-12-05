const terser = require('@rollup/plugin-terser');
const typescript = require('@rollup/plugin-typescript');
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
      file: `dist/ut${name}ils.esm.js`,
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
    }),
  ],
};
