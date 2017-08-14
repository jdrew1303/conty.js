import { generateRandomOfFour } from './helpers'
const generateTransactionId = () => `${new Date().toISOString()}TOKEN${generateRandomOfFour()}`

const emptyTransaction = () => ({ _id: generateTransactionId(), items: [] })

export const addItem = (item, transaction = emptyTransaction()) => (
  {
    ...transaction,
    items: [...transaction.items, item]
  }
)

export const addItems = (items, transaction = emptyTransaction()) => (
  items.reduce((transaction, item) => addItem(item, transaction), transaction)
)

