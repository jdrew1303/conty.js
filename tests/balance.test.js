import { createItem, addItem, addItems, removeItem, updateItem, validateTransaction, getBalanceOf } from '../src'

describe('balances', () => {
  // Seeds
  const trasactions = [
    addItems([{ accountId: 'one', amount: 100 }, { accountId: 'two', amount: -100 }]),
    addItems([{ accountId: 'one', amount: 100 }, { accountId: 'three', amount: -70 }, { accountId: 'four', amount: -30 }]),
    addItems([{ accountId: 'one', amount: 100 }, { accountId: 'two', amount: -100 }])
  ]
  it('gets balances of account one', () => {
    expect(getBalanceOf('one', trasactions)).toEqual(300)
  })
  it('gets balances of account two', () => {
    expect(getBalanceOf('two', trasactions)).toEqual(-200)
  })
  it('gets balances of account three', () => {
    expect(getBalanceOf('three', trasactions)).toEqual(-70)
  })
  it('gets balances of account four', () => {
    expect(getBalanceOf('four', trasactions)).toEqual(-30)
  })
})
