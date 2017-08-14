import { Either, Maybe } from 'ramda-fantasy'
const [Right, Left] = [Either.Right, Either.Left]

// myHelpers
import { containsRequiredKeys, containsValidValuesForKeys } from './validators'

export const createAccount = (propsObj) => {
  return Right(propsObj)
    .chain(containsRequiredKeys(['name', 'type']))
    .chain(containsValidValuesForKeys([{ keyName: 'type', validValues: ['activo', 'pasivo'] }]))
    .either((errors) => ({ errors }), (propsObj) => ({ ...propsObj, _id: propsObj.name }))
}


