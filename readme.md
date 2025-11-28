
# spiky-cli

Transpile TypeScript spiky.js blocks to working python code that can be executed on a Spike Prime Robot.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![NPM Downloads](https://img.shields.io/npm/dm/spiky-cli)



## Installation

Install spiky-cli with npm or yarn

```bash
  npm install spiky-cli --save
```
```bash
  yarn add spiky-cli
```

or instantly run it using npx
```bash
  npx spiky-cli init
```
## Commands

#### init

```bash
  spiky-cli init
```

Initialize a new `config.spiky.json` file thats configures the build command.

| Option | Description                |
| :-------- | :------------------------- |
| `-y` | *Optional*. Skips the prompts and uses the default values |

#### build

```bash
  spiky-cli build
```

Transpile your TypeScript spiky.js blocks into python code. Uses the config file for export options.

| Parameter | Description                       |
| :--------| :-------------------------------- |
| `--overwrite`       | *Optional*. Enables instant overwriting |
| `--keeplines`       | *Optional*. Keeps the lines of your spiky.js code. |

#### version

```bash
  spiky-cli version
```

Logs the current version

#### update

```bash
  spiky-cli update
```

Updates the spiky-cli and spiky.js to the newest available version.

#### help

```bash
  spiky-cli help
```

Logs out a help form.


## Types 

#### SpikyConfig

Layout of the config.spiky.json file.

| Property | Type |  Description                       |
| :--------| :------- | :-------------------------------- |
| `inputFileName` | string |  **Required**. The name of the input file in which you use the spiky.js blocks |
| `export`  | object     | *Required*. An object that sets different export settings. |

#### export

type="python"

| Property | Type |  Description                       |
| :--------| :------- | :-------------------------------- |
| `type` | python or project |  **Required**.  |
| `formatOutput`  | boolean | *Required*. Enable format settings |
| `formatterSettings`  | boolean | *Optional*. Only available if formatOutput=true. For options: [check here](https://www.npmjs.com/package/@wasm-fmt/ruff_fmt#Usage) |

type="project"

| Property | Type |  Description                       |
| :--------| :------- | :-------------------------------- |
| `type` | python or project |  **Required**.  |
| `folderName`  | string | *Required*. The path to the folder that holds your existing project. If this path is not reachable, a new folder with projectbody.json will be created. |



## FAQ

#### Is this package made, maintained or managed by Lego or any associated company?

No, this project is not handled by Lego in any way.
## Developers

- [@leontm-dev](https://www.github.com/leontm-dev)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Acknowledgements

 - [ast-transpiler](https://github.com/ccxt/ast-transpiler)


