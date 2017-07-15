import { createAccount } from '../src'

describe('createAccount', () => {
  it('has errors if type missing key', () => {
    expect(createAccount({ name: 'jose' }).errors.missingKeys).toContain('type')
  })
  it('has errors if type missing name', () => {
    expect(createAccount({ type: 'organge' }).errors.missingKeys).toContain('name')
  })
  it('has errors if type missing name', () => {
    expect(createAccount({}).errors.missingKeys).toContain('name')
    expect(createAccount({}).errors.missingKeys).toContain('type')
  })
  it('has errors if type has invalid value', () => {
    expect(createAccount({ name: 'new', type: 'orange' }).errors.notValidValues.join(',')).toContain('orange')
  })
})