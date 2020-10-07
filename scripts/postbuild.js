const concat = require('concat');
const fs = require('fs-extra');
const path = require('path');
const g = require('glob');

const glob = (tmpl = "") => new Promise((res) => g(tmpl, (err, files) => {
  if (err) {
    throw err;
  } else {
    res(files);
  }
}));

const ORIGINAL_APP_PATH = 'dist/devextreme-angular-form-generator';
const CURRENT_LIB_ASSETS_PATH = 'dist/mini-lib/mini-lib-assets';
const CURRENT_LIB_PATH = 'dist/mini-lib';

const scripts = [
  `${ORIGINAL_APP_PATH}/runtime-es5.js`,
  `${ORIGINAL_APP_PATH}/polyfills-es5.js`,
  `${ORIGINAL_APP_PATH}/main-es5.js`,
];

const assets = () => Promise.all([
  glob(`${ORIGINAL_APP_PATH}/*.woff2`),
  glob(`${ORIGINAL_APP_PATH}/*.woff`),
  glob(`${ORIGINAL_APP_PATH}/*.ttf`),
  glob(`${ORIGINAL_APP_PATH}/*.eot`),
  glob(`${ORIGINAL_APP_PATH}/*.css`),
]).then((all) => all.flat());

const index = () => fs.writeFile(`${CURRENT_LIB_PATH}/index.html`, `
<!DOCTYPE html>
<html>
  <head>
    <script src="mini-lib.js"></script>
    <link rel="stylesheet" href="mini-lib-assets/styles.css"/>
  </head>
  <body>
    <mini-web-component data-miniKey="someComponent"></mini-web-component>
    <script>
      window.someComponent = {
        fields: [
          {
            type: 'group',
            columns: '12',
            title: 'Input fields:',
            fields: [
              {
                type: 'label',
                title: 'TagBox',
                columns: '4',
              },
              {
                type: 'tag-box',
                name: 'arr',
                items: ['a', 'b', 'c'],
                defaultValue: ['b'],
                columns: '8',
              },
              {
                type: 'label',
                title: 'SelectBox',
                columns: '4',
              },
              {
                type: 'select-box',
                name: 'arr1',
                items: ['a', 'b', 'c'],
                columns: '8',
              },
              {
                type: 'label',
                title: 'TextBox',
                columns: '4',
              },
              {
                type: 'text-box',
                name: 'text',
                columns: '8',
              },
              {
                type: 'label',
                title: 'CheckBox',
                columns: '4',
              },
              {
                type: 'check-box',
                name: 'omg',
                columns: '8',
              },
            ]
          }
        ],
        handler: () => new Promise((res) => res({
          a: 'aaa',
          b: 'bbb',
          c: 'ccc',
          arr: ['a'],
          arr1: [],
          text: '',
          omg: true,
        })),
        change: (data) => console.log(data),
      }
    </script>
  </body>
</html>
`.slice(1));

fs.ensureDir(CURRENT_LIB_PATH)
  .then(() => concat(scripts, `${CURRENT_LIB_PATH}/mini-lib.js`))
  .then(() => assets())
  .then((assets) => assets.forEach((a) => fs.copySync(a, `${CURRENT_LIB_ASSETS_PATH}/${path.basename(a)}`)))
  .then(() => index())
  .catch((e) => console.log('ERROR', JSON.stringify(e)));
