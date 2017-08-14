import { createItem } from '../src'

describe('createItem missing keys errors', () => {
  it('has errors if missing amount', () => {
    expect(createItem({ accountId: 'bankYYY' }).errors.missingKeys).toContain('amount')
  })
  it('has errors if type missing accountId', () => {
    expect(createItem({ amount: 25.25 }).errors.missingKeys).toContain('accountId')
  })
  it('has errors if type missing name or name', () => {
    expect(createItem({}).errors.missingKeys).toContain('amount')
    expect(createItem({}).errors.missingKeys).toContain('accountId')
  })
})

describe('createItem valid with all required keys', () => {
  //returns undefined
  it('has errors if type missing name or name', () => {
    expect(createItem({ accountId: 'account', amount: 25.25, dueDate: new Date() }).errors).toBeFalsy()
  })
})

describe('createItem valid', () => {
  it('returns object with keys name', () => {
    expect(Object.keys(createItem({ accountId: 'new', amount: 25, dueDate: new Date() }))).toContain('accountId')
  })
  it('returns object with keys type', () => {
    expect(Object.keys(createItem({ accountId: 'new', amount: 25, dueDate: new Date() }))).toContain('amount')
  })
})
