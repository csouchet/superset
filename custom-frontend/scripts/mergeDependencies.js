const fs = require('fs');
const path = require('path');

const supersetPath = '../superset-frontend';
const customPath = '.';

// Read package.json files
const supersetPackageJsonPath = path.join(supersetPath, 'package.json');
const customPackageJsonPath = path.join(customPath, 'package.json');

const supersetPackageJson = JSON.parse(fs.readFileSync(supersetPackageJsonPath, 'utf-8'));
const customPackageJson = JSON.parse(fs.readFileSync(customPackageJsonPath, 'utf-8'));

// Merge devDependencies
customPackageJson.devDependencies = {
  ...customPackageJson.devDependencies,
  ...Object.fromEntries(
    Object.entries(supersetPackageJson.devDependencies || {}).map(([key, value]) =>
      [key, value.replace(/^file:tools\//, `file:${supersetPath}/tools/`)]
    )
  )
};

customPackageJson.dependencies = {
  ...customPackageJson.dependencies,
  ...Object.fromEntries(
    Object.entries(supersetPackageJson.dependencies || {}).map(([key, value]) =>
       [key, value.replace(/^file:\.\//, `file:${supersetPath}/`)]
    )
  )
};

customPackageJson.engines = supersetPackageJson.engines;
customPackageJson.overrides = supersetPackageJson.overrides;

// Write the updated package.json file
fs.writeFileSync(customPackageJsonPath, JSON.stringify(customPackageJson, null, 2));

console.log('Dev dependencies merged successfully!');
