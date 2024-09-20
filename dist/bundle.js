/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/board.js":
/*!*********************************!*\
  !*** ./src/components/board.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _board_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.css */ \"./src/components/board.css\");\n/* harmony import */ var _lib_memo2D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/memo2D */ \"./src/lib/memo2D.js\");\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ \"./src/utils/utils.js\");\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n/**\n * This component represents the board\n */\n\nclass Board {\n  constructor() {\n    _defineProperty(this, \"prev\", null);\n\n    _defineProperty(this, \"board\", new Array(9));\n\n    _defineProperty(this, \"speed\", 1000);\n\n    _defineProperty(this, \"row\", null);\n\n    _defineProperty(this, \"column\", null);\n\n    _defineProperty(this, \"sector\", null);\n\n    _defineProperty(this, \"solved\", false);\n\n    _defineProperty(this, \"clearAllCellClasses\", () => {\n      this.board.forEach(row => row.forEach(({\n        $el\n      }) => {\n        $el.className = '';\n      }));\n    });\n\n    _defineProperty(this, \"setUpMemo\", () => {\n      this.board.forEach((boardRow, i) => boardRow.forEach((cell, j) => {\n        if (cell.value !== '') {\n          if (!this.row.setVal(i, cell.value, true) || !this.column.setVal(j, cell.value, true) || !this.sector.setVal((0,_utils_utils__WEBPACK_IMPORTED_MODULE_2__.getSector)(i, j), cell.value, true)) {\n            throw new Error('Incorrect board');\n          }\n        }\n      }));\n    });\n\n    _defineProperty(this, \"createNewMemo\", () => {\n      this.row = new _lib_memo2D__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n      this.column = new _lib_memo2D__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n      this.sector = new _lib_memo2D__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\n      try {\n        this.setUpMemo();\n        return true;\n      } catch (e) {\n        alert(e.message);\n        return false;\n      }\n    });\n\n    _defineProperty(this, \"getFirstUnsolved\", (row, column) => {\n      for (let i = row; i < 9; i += 1) {\n        for (let j = i === row ? column : 0; j < 9; j += 1) {\n          const {\n            value\n          } = this.board[i][j];\n\n          if (value === '') {\n            return [i, j];\n          }\n        }\n      }\n\n      return [false, false];\n    });\n\n    _defineProperty(this, \"updateClassList\", (currentCell, prevCell, solvedOrFault) => {\n      if (prevCell) {\n        prevCell.className = solvedOrFault;\n\n        if (solvedOrFault === 'fault') {\n          setTimeout(() => {\n            prevCell.classList.remove(solvedOrFault);\n          }, this.speed / 2);\n        }\n      }\n\n      currentCell.className = 'current';\n    });\n\n    _defineProperty(this, \"setCellValue\", (row, column, value, solvedOrFault = null) => {\n      // Step 1: Get the cell\n      const cell = this.board[row][column]; // Step 2: Set the value\n\n      cell.value = value;\n\n      if (+cell.$el.innerText !== value) {\n        cell.$el.innerText = value;\n      } // Step 3: Visualization steps if required\n\n\n      if (solvedOrFault) {\n        this.updateClassList(cell.$el, this.prev, solvedOrFault);\n        this.prev = cell.$el;\n      }\n    });\n\n    _defineProperty(this, \"tryOne\", (row, column, sector, num) => new Promise(resolve => {\n      // Set Data\n      this.row.setVal(row, num, true);\n      this.column.setVal(column, num, true);\n      this.sector.setVal(sector, num, true);\n      this.setCellValue(row, column, num, 'solved'); // For visualizing it\n\n      setTimeout(() => {\n        this.solveBoard(row, column).then(res => {\n          if (!res) {\n            // Unset Data\n            this.row.setVal(row, num, false);\n            this.column.setVal(column, num, false);\n            this.sector.setVal(sector, num, false);\n            this.setCellValue(row, column, '', 'fault');\n          }\n\n          resolve(res);\n        });\n      }, this.speed);\n    }));\n\n    _defineProperty(this, \"solveBoard\", async (row = 0, column = 0) => {\n      // Step 1: Base case\n      const [x, y] = this.getFirstUnsolved(row, column);\n\n      if (x === false) {\n        this.solved = true;\n        return true;\n      } // Step 2: Solve\n\n\n      const s = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_2__.getSector)(x, y);\n      let solved = false;\n\n      for (let i = 1; i <= 9; i += 1) {\n        if (!this.row.checkIfIn(x, i) && !this.column.checkIfIn(y, i) && !this.sector.checkIfIn(s, i)) {\n          solved = await this.tryOne(x, y, s, i);\n        }\n\n        if (solved) {\n          break;\n        }\n      } // Step 3: Return result\n\n\n      return solved;\n    });\n\n    _defineProperty(this, \"cleanUp\", () => {\n      this.solved = false;\n      this.prev = null;\n      this.clearAllCellClasses();\n    });\n\n    _defineProperty(this, \"setUpBeforeSolveAndSolve\", async ({\n      target\n    }) => {\n      // Clean up board in case we are solving again\n      this.cleanUp(); // Set memo and solve board\n\n      if (this.createNewMemo()) {\n        target.setAttribute('disabled', true);\n        await this.solveBoard();\n        target.removeAttribute('disabled'); // Check if board was successfully solved\n\n        if (!this.solved) {\n          alert('Board not solvable');\n        } else {\n          alert('Solved');\n        }\n      }\n    });\n\n    _defineProperty(this, \"handleInputFromArray\", value => {\n      try {\n        const array = JSON.parse(value);\n        array.forEach((row, i) => row.forEach((cell, j) => this.setCellValue(i, j, cell === '.' ? '' : +cell)));\n      } catch (_err) {\n        alert('Incorrect array');\n      }\n    });\n\n    _defineProperty(this, \"handleSpeedInput\", ({\n      target: {\n        value\n      }\n    }) => {\n      // Step 1: Set the value\n      this.speed = +value;\n    });\n\n    _defineProperty(this, \"handleInput\", event => {\n      // Step 1: Destructuring\n      const {\n        target: element\n      } = event;\n      const {\n        innerText: value,\n        id\n      } = element;\n      const [x, y] = id.split('-'); // Step 2: Validation\n\n      if (value.length !== 0 && !/^[0-9]$/.test(value)) {\n        this.setCellValue(x, y, '');\n        return;\n      } // Step 3: Setting values\n\n\n      this.setCellValue(x, y, value.length === 0 ? '' : +value);\n    });\n  }\n\n  /**\n   * Renders the board\n   * @returns {HTMLTableElement} - The main table which holds the board\n   */\n  render() {\n    // Step 1: Create the board\n    for (let i = 0; i < 9; i += 1) {\n      this.board[i] = new Array(9);\n    } // Step 3: Generate the table\n\n\n    const table = document.createElement('table');\n\n    for (let i = 0; i < 9; i += 1) {\n      // Individual row\n      const tr = document.createElement('tr');\n\n      for (let j = 0; j < 9; j += 1) {\n        // Individual cell\n        const td = document.createElement('td'); // Setting attributes\n\n        td.addEventListener('input', this.handleInput);\n        td.setAttribute('id', `${i}-${j}`);\n        td.contentEditable = true; // Append to the row\n\n        tr.appendChild(td); // Setting the value in board\n\n        this.board[i][j] = {\n          $el: td,\n          value: ''\n        };\n      }\n\n      table.appendChild(tr);\n    }\n\n    return table;\n  }\n\n}\n\n//# sourceURL=webpack://sudoku/./src/components/board.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_util_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/util.css */ \"./src/style/util.css\");\n/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style/style.css */ \"./src/style/style.css\");\n/* harmony import */ var _components_board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/board */ \"./src/components/board.js\");\n\n\n\nconst board = new _components_board__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\ndocument.querySelector('#main').appendChild(board.render());\ndocument.querySelector('#solve').addEventListener('click', board.setUpBeforeSolveAndSolve);\ndocument.querySelector('#speed').addEventListener('input', board.handleSpeedInput);\ndocument.querySelector('#addArrayButton').addEventListener('click', () => board.handleInputFromArray(document.querySelector('#arrayInput').value));\n\n//# sourceURL=webpack://sudoku/./src/index.js?");

/***/ }),

/***/ "./src/lib/memo2D.js":
/*!***************************!*\
  !*** ./src/lib/memo2D.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Memo2D)\n/* harmony export */ });\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * A memo for the row, column and sector data\n */\nclass Memo2D {\n  constructor() {\n    _defineProperty(this, \"store\", new Map());\n\n    _defineProperty(this, \"checkIfIn\", (pos, value) => this.store.get(pos) && this.store.get(pos).get(value));\n\n    _defineProperty(this, \"setVal\", (row, column, value) => {\n      // Check if row is set\n      if (this.store.get(row)) {\n        // Check if true is already set and trying to set true\n        if (value && this.store.get(row).get(column)) {\n          return false;\n        }\n\n        this.store.get(row).set(column, value);\n        return true;\n      } // When row not set\n\n\n      this.store.set(row, new Map([[column, value]]));\n      return true;\n    });\n  }\n\n}\n\n//# sourceURL=webpack://sudoku/./src/lib/memo2D.js?");

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSector: () => (/* binding */ getSector)\n/* harmony export */ });\n/**\n * Get the sector from row and column\n * @param {Number} row\n * @param {Number} column\n */\nconst getSector = (row, column) => {\n  for (let i = 0; i < 9; i += 3) {\n    if (row <= i + 2) {\n      for (let j = 0; j < 9; j += 3) {\n        if (column <= j + 2) {\n          return i + 1 + parseInt(j / 3, 10);\n        }\n      }\n    }\n  }\n\n  return false;\n};\n\n//# sourceURL=webpack://sudoku/./src/utils/utils.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/components/board.css":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/components/board.css ***!
  \**********************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"td {\\n  height:40px;\\n  width:40px;\\n  border:1px solid #49c1a2;\\n  color: #249c7d;\\n  text-align:center;\\n  border-radius: 5px;\\n}\\n\\ntd:nth-child(3n) {\\n  border-right:solid #49c1a2;\\n}\\n\\ntr:first-child {\\n  border-top:solid #49c1a2;\\n}\\n\\ntr:nth-child(3n) td {\\n  border-bottom:solid #49c1a2;\\n}\\n\\ntr:nth-child(2n) td:nth-child(2n),\\ntr:nth-child(2n+1) td:nth-child(2n+1) {\\n  background-color: rgba(73, 193, 162, 0.5)\\n}\\n\\ntd.current {\\n  color: #9F6000 !important;\\n  background-color: #FEEFB3 !important;\\n}\\n\\n\\ntd.fault {\\n  color: #D8000C !important;\\n  background-color: #FFD2D2 !important;\\n}\\n\\ntd.solved {\\n  color: #4F8A10 !important;\\n  background-color: #DFF2BF !important;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://sudoku/./src/components/board.css?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet%5B1%5D.rules%5B1%5D.use%5B2%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/style.css":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/style.css ***!
  \*****************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* BASE STYLES */\\n* {\\n  box-sizing: border-box;\\n  padding: 0;\\n  margin: 0;\\n}\\n\\nbody {\\n  font-family: 'Open Sans', sans-serif;\\n  background-color: #fff;\\n  color: #333;\\n  line-height: 1.6;\\n}\\n\\nh1, h2 {\\n  font-weight: 300;\\n  line-height: 1.2;\\n}\\n\\nheader {\\n  position: fixed;\\n  width: 100%;\\n  padding: 0.7rem;\\n  color: #737373;\\n  box-shadow: 0 5px 6px -6px #d3d3d3;\\n}\\n\\ninput, textarea, button {\\n  padding: 0.5rem;\\n  flex-grow: 1;\\n  max-width: 349px;\\n}\\n\\ntextarea {\\n  resize: none;\\n}\\n\\n/* Other styles */\\n.wrapper {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n  height: 100vh;\\n}\\n\\n.card {\\n  display: flex;\\n  flex-wrap: wrap;\\n  justify-content: center;\\n  align-items: center;\\n  padding: 3rem 5rem;\\n  margin-bottom: 5rem;\\n  background-color: #fff;\\n  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;\\n}\\n\\n.input-wrapper {\\n  margin: 0.1rem 1rem 1rem;\\n}\\n\\n.input-wrapper label {\\n  display: block;\\n  margin-bottom: 3px;\\n  color: #333;\\n}\\n\\n.input-wrapper input,\\n.input-wrapper textarea {\\n  padding: 7px;\\n  width: 100%;\\n  border: 1px solid #ccc;\\n  border-radius: 3px;\\n}\\n\\n.input-wrapper button {\\n  width: 100%;\\n  border-radius: 3px;\\n  outline: none;\\n  cursor: pointer;\\n}\\n\\n@media(max-width:766px) {\\n  .card {\\n    box-shadow: none;\\n  }\\n\\n  .controls {\\n    margin-top: 3rem;\\n  }\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://sudoku/./src/style/style.css?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet%5B1%5D.rules%5B1%5D.use%5B2%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/util.css":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/util.css ***!
  \****************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* Text colors */\\n.text-primary {\\n  color: #28a745;\\n}\\n\\n.text-secondary {\\n  color: #0284d0;\\n}\\n\\n/* Fonts */\\n.font-normal {\\n  font-weight: 400;\\n}\\n\\n/* Button */\\n.btn {\\n  cursor: pointer;\\n  display: inline-block;\\n  padding: 7px;\\n  color: #fff;\\n  background-color: #49c1a2;\\n  border: none;\\n  border-radius: 3px;\\n}\\n\\n.btn:hover {\\n  opacity: 0.9;\\n}\\n\\n.btn:disabled {\\n  background-color: gray;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://sudoku/./src/style/util.css?./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet%5B1%5D.rules%5B1%5D.use%5B2%5D");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://sudoku/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./src/components/board.css":
/*!**********************************!*\
  !*** ./src/components/board.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_board_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./board.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/components/board.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_board_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"], options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_board_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals || {});\n\n//# sourceURL=webpack://sudoku/./src/components/board.css?");

/***/ }),

/***/ "./src/style/style.css":
/*!*****************************!*\
  !*** ./src/style/style.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/style.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"], options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_style_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals || {});\n\n//# sourceURL=webpack://sudoku/./src/style/style.css?");

/***/ }),

/***/ "./src/style/util.css":
/*!****************************!*\
  !*** ./src/style/util.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_util_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./util.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./src/style/util.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_util_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"], options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_util_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals || {});\n\n//# sourceURL=webpack://sudoku/./src/style/util.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://sudoku/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;