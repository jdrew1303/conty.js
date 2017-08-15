import { addItem, addItems, validateTransaction } from '../src'

describe('addItem to transaction', () => {
  it('adds item to empty transaction', () => {
    expect(addItem({ accountId: 'bankYYY', amount: 1 }).items).toEqual([{ accountId: 'bankYYY', amount: 1 }])
  })
})

describe('addItems to transaction', () => {
  it('adds items to empty transaction', () => {
    expect(addItems([{ accountId: 'bankYYY', amount: 1 }]).items).toEqual([{ accountId: 'bankYYY', amount: 1 }])
  })
})

describe('it validates transactions', () => {
  it('adds error if amount not zero', () => {
    expect(
      validateTransaction(
        addItems([{ accountId: 'bankYYY', amount: 1 }]))
        .errors.join(''))
      .toMatch('zero')
  })
  it('has no error if amount equals zero', () => {
     expect(
      validateTransaction(
        addItems([{ accountId: 'bankYYY', amount: 1 },{ accountId: 'bankZZZ', amount: -1 }]))
        .errors)
      .toBeFalsy()
  })
})
