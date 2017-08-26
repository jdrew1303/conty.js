import { createItem } from './item'
import { generateRandomOfFour } from './helpers'

import R from 'ramda'
import { Maybe } from 'ramda-fantasy'

const generateTransactionId = () => `${new Date().toISOString()}TOKEN${generateRandomOfFour()}`
const emptyTransaction = () => ({
  _id: generateTransactionId(),
  doc_type: 'transaction',
  date: new Date().toISOString(),
  items: [],
  errors: []
})

export const createTransaction = (props) => (props ? { ...emptyTransaction(), ...props } : { ...emptyTransaction() })

export const addItem = R.curry((item, transaction) => {
  return validateTransaction({
    ...transaction,
    items: [...transaction.items, createItem(item, transaction)]
  })
})

export const addItems = R.curry((items, transaction) => (
  items.reduce((transaction, item) => addItem(item, transaction), transaction)
))

export const removeItem = R.curry((itemId, transaction) => {
  return validateTransaction({
    ...transaction,
    items: transaction.items.filter(item => item._id !== itemId)
  })
})

export const updateItem = R.curry((modifiedItem, transaction) => {
  return validateTransaction({
    ...transaction,
    items: transaction.items.map(item => item._id === modifiedItem._id ? createItem(modifiedItem) : item)
  })
})

const validateTransaction = (transaction) => {
  return validations.reduce((prev, curr) => curr(prev), clearErrors(transaction))
}
// Math.round(sum * 1000000) con esto elimino los errores decimales e-7 no nos afectan. la lib soporta 4 decimales 
const checkAmount = (transaction) => (
  Maybe(transaction.items.reduce((prev, curr) => prev + curr.amount, 0))
  .map(sum => Math.round(sum * 10000000) === 0 ? transaction : addAmountNotZeroError(transaction, sum)).value
)

const checkInvalidItem = (transaction) => (
  concatItemErrors(transaction).length > 0 ? addItemErrors(concatItemErrors(transaction), transaction) : transaction
)

const concatItemErrors = (transaction) => (
  transaction.items.reduce((prev, curr) => curr.errors ? prev.concat(curr.errors) : prev, [])
)
// Add new validations functions to the array
const validations = [
  checkAmount,
  checkInvalidItem
]

const addAmountNotZeroError = (transation, sum) => (
  { ...transation, errors: [`Transaction amount is not zero. Difference ${sum}`] }
)

const addItemErrors = (itemsErrors, transaction) => (
  { ...transaction, errors: [...transaction.errors, ...itemsErrors] }
)

const clearErrors = (transaction) => {
  return { ...transaction, errors: [] }
}

export const generateSaveTransaction = (saveFx) => {
  return (transaction) => {
    if (transaction.errors.length > 0) {
      throw `Can not save transaction due to errors ${transaction.errors.join('')}`
    } else {
      return saveFx(transaction)
    }
  }
}