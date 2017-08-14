import R from 'ramda'
import { Either, Maybe } from 'ramda-fantasy'
const [Right, Left] = [Either.Right, Either.Left]

export const containsRequiredKeys =
R.curry(
  (keys, props) => {
    return Maybe(
      keys.reduce((keysMissing, key) => R.has(key)(props) ? keysMissing : [...keysMissing, key], []))
      .chain(keysMissing => keysMissing.length === 0 ? Right(props) : Left({ missingKeys: keysMissing }))
  }
)

export const containsValidValuesForKeys =
R.curry(
  (validations, props) => {
    return Maybe(
      validations.reduce((notValidValues, validation) => validation.validValues.includes(props[validation.keyName]) ? notValidValues : [...notValidValues, `${props[validation.keyName]} is not a valid value for ${validation.keyName}`], []))
      .chain(invalidValues => invalidValues.length === 0 ? Right(props) : Left({ notValidValues: invalidValues }))
  }
)
