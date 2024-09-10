/* eslint no-extend-native: 0 */
// core-js comes with Next.js. So, you can import it like below
// import includes from 'core-js/stable/string/virtual/includes'
// import repeat from 'core-js/stable/string/virtual/repeat'
// import assign from 'core-js/stable/object/assign'

// Add your polyfills
import 'core-js/stable'
import 'raf/polyfill'

// promise 관련 설정
require('es6-promise').polyfill()

// This files runs at the very beginning (even before React and Next.js core)
console.log('Load your polyfills')

// String.prototype.includes = includes
// String.prototype.repeat = repeat
// Object.assign = assign
