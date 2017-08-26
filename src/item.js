import { Either, Maybe } from 'ramda-fantasy'
const [Right, Left] = [Either.Right, Either.Left]
//myHelpers
import { containsRequiredKeys, containsValidValuesForKeys } from './validators'
import { generateRandomOfSix } from './helpers'
const generateItemId = () => `${new Date().toISOString().slice(-4)}TOKEN${generateRandomOfSix()}`

export const createItem = (propsObj, transaction) => {
  return Right({_id: propsObj._id || generateItemId(), ...propsObj, dueDate: propsObj.dueDate || transaction.date, errors: [] })
  .chain(containsRequiredKeys(['accountId', 'amount','dueDate']))
  .either(propsObjWithErrors => propsObjWithErrors, propsObj => propsObj)
}