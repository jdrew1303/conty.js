import { createItem } from './item'
import { generateRandomOfFour } from './helpers'
const generateTransactionId = () => `${new Date().toISOString()}TOKEN${generateRandomOfFour()}`

const emptyTransaction = () => ({
  _id: generateTransactionId(),
  items: [], 
  errors: []
})

export const addItem = (item, transaction = emptyTransaction()) => {
  return validateTransaction({
    ...transaction,
    items: [...transaction.items, createItem(item)]
  })
}

export const addItems = (items, transaction = emptyTransaction()) => (
  items.reduce((transaction, item) => addItem(item, transaction), transaction)
)

export const removeItem = (itemId, transaction) => {
  return validateTransaction({
    ...transaction,
    items: transaction.items.filter(item => item._id !== itemId)
  })
}

export const updateItem = (modifiedItem, transaction) => {
  return validateTransaction({
    ...transaction,
    items: transaction.items.map(item => item._id === modifiedItem._id ? modifiedItem : item )
  })
}

const validateTransaction = (transaction) => {
  return validations.reduce((prev, curr) => curr(prev), clearErrors(transaction))
}

const checkAmount = (transaction) => (
  transaction.items.reduce((prev, curr) => prev + curr.amount, 0) === 0 ? transaction : addAmountNotZeroError(transaction)
)

const checkInvalidItem =  (transaction) =>  (
  concatItemErrors(transaction).length > 0 ? addItemErrors(transaction, concatItemErrors(transaction)): transaction
)

const concatItemErrors = (transaction) =>  (
  transaction.items.reduce((prev, curr) => curr.errors ? prev.concat(curr.errors): prev, [])
)
// Add new validations functions to the array
const validations = [
  checkAmount,
  checkInvalidItem
]

const addAmountNotZeroError = (transation) => (
  { ...transation, errors: ['Transaction Amount not zero'] }
)

const addItemErrors = (transaction, itemsErrors) => (
  { ...transaction, errors: [...transaction.errors, ...itemsErrors] }
)

const clearErrors = (transaction) => {
  return {...transaction, errors: []} 
}