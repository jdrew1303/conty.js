import { Either, Maybe } from 'ramda-fantasy'
const [Right, Left] = [Either.Right, Either.Left]
const defaultConf = {
  validTypes: ['activo', 'pasivo']
}
// myHelpers
import { containsRequiredKeys, containsValidValuesForKeys } from './validators'

export const generateCreateAccount = (conf = defaultConf) => {
  return (propsObj) => {
    return Right({...propsObj, errors: [] })
      .chain(containsRequiredKeys(['name', 'type']))
      .chain(containsValidValuesForKeys([{ keyName: 'type', validValues: conf.validTypes }]))
      .either(propsObjWithErrors => propsObjWithErrors, (propsObj) => ({ ...propsObj, _id: propsObj.name }))
  }
}


export const generateSaveAccount = (saveAccountFx) => {
  return (account) => {
    if(account.errors.length > 0){
      throw "Can not save account due to errors"
    } else {
      return saveAccountFx(account)
    }
  }
}