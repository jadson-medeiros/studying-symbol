const assert = require('assert')

// --- keys
const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = 'value for normal objects'
user[uniqueKey] = 'value for symbol'

//console.log('getting normal objects', user.userName)

assert.deepStrictEqual(user.userName, 'value for normal Objects')

assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

// is not secret!
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - Bad pratice
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)
// ---keys

// Well known Symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        // remove the last and return
        value: this.items.pop()
      }
    }
  })
}

// for(const item of obj) {
//   console.log('item', item)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }
}

const myDate = new MyDate(
  [2022, 05, 01],
  [2020, 03, 06],
  [2019, 02, 02]
)

const expectedDates = [
  new Date(2022, 05, 01),
  new Date(2020, 03, 06),
  new Date(2019, 02, 02)
]

assert.deepStrictEqual(user[Symbol.for('kItems')], expectedDates)