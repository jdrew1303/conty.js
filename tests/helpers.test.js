import { generateRandomWithSize } from '../src/helpers'

describe('random Generator', () => {
  it('generates a random number between 1000 - 9999', () => {
    expect(generateRandomWithSize(4)()).toBeGreaterThanOrEqual(1000)
    expect(generateRandomWithSize(4)()).toBeLessThanOrEqual(9999)
  })
})