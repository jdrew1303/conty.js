import { generateCreateAccount, generateSaveAccount } from '../src'
const createAccount = generateCreateAccount()

describe('createAccount missing keys errors', () => {
  it('has errors if missing type', () => {
    expect(createAccount({ name: 'jose' }).errors.find(error => error.type === 'missingKeys').values).toContain('type')
  })
  it('has errors if type missing name', () => {
    expect(createAccount({ type: 'organge' }).errors.find(error => error.type === 'missingKeys').values).toContain('name')
  })
  it('has errors if type missing name or name', () => {
    expect(createAccount({}).errors.find(error => error.type === 'missingKeys').values).toContain('name')
    expect(createAccount({}).errors.find(error => error.type === 'missingKeys').values).toContain('type')
  })
})

describe('createAccount valid with all required keys', () => {
  //returns undefined
  it('has errors if type missing name or name', () => {
    expect(createAccount({ name: 'account', type: 'activo' }).errors.length).toEqual(0)
  })
})

describe('createAccount invalid for missing type', () => {
  it('has errors if type has invalid value', () => {
    expect(createAccount({ name: 'new', type: 'orange' }).errors.find(error => error.type === 'notValidValues').values.join(',')).toContain('orange')
  })
})

describe('createAccount valid for type', () => {
  //returns undefined
  it('has no errors if type has valid value', () => {
    expect(createAccount({ name: 'new', type: 'activo' }).errors.length).toEqual(0)
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

describe('generate Save account', () => {
  const validAccount = createAccount({ name: 'new', type: 'activo' }),
    invalidAccount = createAccount({ name: 'new' }),
    mySaveAccountFx = generateSaveAccount((account) => {
      return true
    })
  it('throw error if transacion has errors', () => {
    expect(() => mySaveAccountFx(invalidAccount))
      .toThrow()
  })
  it('doesnt throw error if transacion has no errors', () => {
    expect(() => mySaveAccountFx(validAccount))
      .not.toThrow()
  })
})