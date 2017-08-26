import { createItem } from '../src'

describe('createItem missing keys errors', () => {
  it('has errors if missing amount', () => {
    expect(createItem({ accountId: 'bankYYY', dueDate: '2017-02-02'  }).errors.find(error => error.type === 'missingKeys').values).toContain('amount')
  })
  it('has errors if type missing accountId', () => {
    expect(createItem({ amount: 25.25, dueDate: '2017-02-02'  }).errors.find(error => error.type === 'missingKeys').values).toContain('accountId')
  })
  it('has errors if type missing name or name', () => {
    expect(createItem({dueDate: '2017-02-02' }).errors.find(error => error.type === 'missingKeys').values).toContain('amount')
    expect(createItem({dueDate: '2017-02-02' }).errors.find(error => error.type === 'missingKeys').values).toContain('accountId')
  })
})

describe('createItem valid with all required keys', () => {
  it('has no errors when all required keys are present', () => {
    expect(createItem({ accountId: 'account', amount: 25.25, dueDate: new Date() }).errors.length).toEqual(0)
  })
})

describe('createItem valid with all keys', () => {
  it('returns object with keys name', () => {
    expect(Object.keys(createItem({ accountId: 'new', amount: 25, dueDate: new Date() }))).toContain('accountId')
  })
  it('returns object with keys type', () => {
    expect(Object.keys(createItem({ accountId: 'new', amount: 25, dueDate: new Date() }))).toContain('amount')
  })
  it('returns object with keys _id', () => {
    expect(Object.keys(createItem({ accountId: 'new', amount: 25, dueDate: new Date() }))).toContain('_id')
  })
})
