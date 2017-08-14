import { addItem, addItems } from '../src'

describe('addItem to transaction', () => {
  it('adds item to empty transaction', () => {
    expect(addItem({accountId: 'bankYYY', amount: 1 }).items).toEqual([{accountId: 'bankYYY', amount: 1 }])
  })
})

describe('addItems to transaction', () => {
  it('adds items to empty transaction', () => {
    expect(addItems([{accountId: 'bankYYY', amount: 1 }]).items).toEqual([{accountId: 'bankYYY', amount: 1 }])
  })
})

