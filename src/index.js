import { Either, Maybe } from 'ramda-fantasy'
import R from 'ramda'
const [Right, Left] = [Either.Right, Either.Left]
export const createAccount = (propsObj) => {
  return Right(propsObj)
    .chain(containsRequiredKeys(['name', 'type']))
    .chain(containsValidValuesForKeys([{ keyName: 'type', validValues: ['activo', 'pasivo'] }]))
    .either((errors) => ({ errors }), (propsObj) => ({ ...propsObj, errors: 'no Error' }))
}


const containsRequiredKeys =
  R.curry(
    (keys, props) => {
      return Maybe(
        keys.reduce((keysMissing, key) => R.has(key)(props) ? keysMissing : [...keysMissing, key], []))
        .chain(keysMissing => keysMissing.length === 0 ? Right(props) : Left({ missingKeys: keysMissing }))
    }
  )

const containsValidValuesForKeys =
  R.curry(
    (validations, props) => {
      return Maybe(
        validations.reduce((notValidValues, validation) => validation.validValues.includes(props[validation.keyName]) ? notValidValues : [...notValidValues, `${props[validation.keyName]} is not a valid value for ${validation.keyName}`], []))
        .chain(keysMissing => Maybe(keysMissing).isNothing ? Right(props) : Left({ notValidValues: keysMissing }))
    }
  )
