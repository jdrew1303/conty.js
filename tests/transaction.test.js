import { createItem, addItem, addItems, removeItem, updateItem, validateTransaction, generateSaveTransaction } from '../src'
import R from 'ramda'

describe('addItem to transaction', () => {
  it('adds item to empty transaction', () => {
    expect(R.pick(['accountId', 'amount'], addItem({ accountId: 'bankYYY', amount: 1 }).items[0])).toEqual({ accountId: 'bankYYY', amount: 1 })
  })
})

describe('addItems to transaction', () => {
  it('adds items to empty transaction', () => {
    expect(R.pick(['accountId', 'amount'], addItems([{ accountId: 'bankYYY', amount: 1 }]).items[0])).toEqual({ accountId: 'bankYYY', amount: 1 })
  })
})

describe('it validates transactions', () => {
  it('adds error if amount not zero', () => {
    expect(
      addItems([{ accountId: 'bankYYY', amount: 1 }])
        .errors.join(''))
      .toMatch('zero')
  })

  it('has no error if amount not zero', () => {
    expect(
      addItems([{ accountId: 'bankYYY', amount: 1, dueDate: new Date() }, { accountId: 'bankZZZ', amount: -1, dueDate: new Date() }])
        .errors)
      .toEqual([])
  })

})


describe('it removes item from transactions', () => {
  it('add two item', () => {
    expect(
      addItems([
        { accountId: 'bankYYY', amount: 1 },
        { accountId: 'bankZZZ', amount: -1 }
      ]).items.length
    ).toEqual(2)
  })
  it('add two item', () => {
    const item1 = createItem({ accountId: 'bankYYY', amount: 1 }),
      item2 = createItem({ accountId: 'bankZZZ', amount: -1 }),
      transaction = addItems([item1, item2])
    expect(removeItem(item1._id, transaction).items.length).toEqual(1)
    expect(removeItem(item2._id, removeItem(item1._id, transaction)).items.length).toEqual(0)
  })
  it('update item', () => {
    const item1 = createItem({ accountId: 'bankYYY', amount: 1 }),
      item2 = createItem({ accountId: 'bankZZZ', amount: -3 }),
      transaction = addItems([item1, item2])
    expect(transaction.errors.join('')).toMatch('zero')
    const updatedTransaction = updateItem({ ...item2, amount: -1 }, transaction)
    expect(updatedTransaction.errors.join('')).not.toMatch('zero')
    expect(updatedTransaction.items.length).toEqual(2)
  })
})
fdescribe('generate Save transaction', () => {
  const item1 = createItem({ accountId: 'bankYYY', amount: 1, dueDate: new Date() }),
  item2 = createItem({ accountId: 'bankZZZ', amount: -3, dueDate: new Date() }),
  item3 = createItem({ accountId: 'bankZZZ', amount: -1, dueDate: new Date() }),
  mySaveTransactionFx = generateSaveTransaction((transaction) => {
    console.log(transaction)
    return true
  })
  it('throw error if transacion has errors', () => {
    expect(() => mySaveTransactionFx(addItems([item1, item2])))
    .toThrow()
  })
  it('doesnt throw error if transacion has no errors', () => {
    expect(() => mySaveTransactionFx(addItems([item1, item3])))
    .not.toThrow()
  })
  it('doesnt throw error if transacion is corrected before saving', () => {
    expect(() => mySaveTransactionFx(updateItem({ ...item2, amount: -1 }, addItems([item1, item2]))))
    .not.toThrow()
  })
})