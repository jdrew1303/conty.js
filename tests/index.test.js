import { createAccount } from '../src'

describe('createAccount missing keys errors', () => {
  it('has errors if missing type', () => {
    expect(createAccount({ name: 'jose' }).errors.missingKeys).toContain('type')
  })
  it('has errors if type missing name', () => {
    expect(createAccount({ type: 'organge' }).errors.missingKeys).toContain('name')
  })
  it('has errors if type missing name or name', () => {
    expect(createAccount({}).errors.missingKeys).toContain('name')
    expect(createAccount({}).errors.missingKeys).toContain('type')
  })
})

describe('createAccount valid with all required keys', () => {
  //returns undefined
  it('has errors if type missing name or name', () => {
    expect(createAccount({ name: 'account', type: 'activo' }).errors.missingKeys).toBeFalsy()
  })
})

describe('createAccount invalid for missing type', () => {
  it('has errors if type has invalid value', () => {
    expect(createAccount({ name: 'new', type: 'orange' }).errors.notValidValues.join(',')).toContain('orange')
  })
})

describe('createAccount valid for type', () => {
   //returns undefined
  it('has no errors if type has valid value', () => {
    expect(createAccount({ name: 'new', type: 'activo' }).errors.notValidValues).toBeFalsy()
  })

})

describe('createAccount valid', () => {
 it('returns object with keys name', () => {
  expect(Object.keys(createAccount({ name: 'new', type: 'activo' }))).toContain('name')
 })
 it('returns object with keys type', () => {
  expect(Object.keys(createAccount({ name: 'new', type: 'activo' }))).toContain('type')
 })
 it('returns object with keys _id', () => {
  expect(Object.keys(createAccount({ name: 'new', type: 'activo' }))).toContain('_id')
 })
 it('returns object with keys _id === name', () => {
  expect(createAccount({ name: 'new', type: 'activo' })._id).toBe('new')
 })
})
