import { Either, Maybe } from 'ramda-fantasy'
const [Right, Left] = [Either.Right, Either.Left]
const defaultConf = {
  validTypes: ['activo', 'pasivo']
}
// myHelpers
import { containsRequiredKeys, containsValidValuesForKeys } from './validators'

export const createAccount = (conf = defaultConf) => {
  return (propsObj) => {
    return Right(propsObj)
      .chain(containsRequiredKeys(['name', 'type']))
      .chain(containsValidValuesForKeys([{ keyName: 'type', validValues: conf.validTypes }]))
      .either(propsObjWithErrors => propsObjWithErrors, (propsObj) => ({ ...propsObj, _id: propsObj.name }))
  }
}


