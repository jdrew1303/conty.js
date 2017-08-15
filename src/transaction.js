import { generateRandomOfFour } from './helpers'
const generateTransactionId = () => `${new Date().toISOString()}TOKEN${generateRandomOfFour()}`

const emptyTransaction = () => ({
  _id: generateTransactionId(),
  items: []
})

export const addItem = (item, transaction = emptyTransaction()) => (
  {
    ...transaction,
    items: [...transaction.items, item]
  }
)

export const addItems = (items, transaction = emptyTransaction()) => (
  items.reduce((transaction, item) => addItem(item, transaction), transaction)
)

export const validateTransaction = (transaction) => {
  return validations.reduce((prev, curr) => curr(prev), transaction)
}

const checkAmount = (transaction) => (
  transaction.items.reduce((prev, curr) => prev + curr.amount, 0) === 0 ? transaction : addAmountNotZeroError(transaction)
)

// Add new validations functions to the array
const validations = [
  checkAmount
]


const addAmountNotZeroError = (transation) => (
  { ...transation, errors: ['Transaction Amount not zero'] }
)
