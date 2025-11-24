// Make Vue available globally for @vue/test-utils (CommonJS setup)
const Vue = require('vue')
const VueCompilerDOM = require('@vue/compiler-dom')
const VueServerRenderer = require('@vue/server-renderer')

// Ensure both global and globalThis have Vue and related namespaces so UMD bundles can find them
global.Vue = Vue
global.VueCompilerDOM = VueCompilerDOM
global.VueServerRenderer = VueServerRenderer
global.globalThis = global.globalThis || global
global.globalThis.Vue = Vue
global.globalThis.VueCompilerDOM = VueCompilerDOM
global.globalThis.VueServerRenderer = VueServerRenderer

// Do NOT require @vue/test-utils here. setupFilesAfterEnv runs before tests,
// so we only need to expose the Vue globals and the test modules will import
// @vue/test-utils after these globals are set.

module.exports = {}
