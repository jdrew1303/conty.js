import { Either, Maybe } from 'ramda-fantasy'
const [Right, Left] = [Either.Right, Either.Left]
//myHelpers
import { containsRequiredKeys, containsValidValuesForKeys } from './validators'


export const createItem = (propsObj) => {
  return Right(propsObj)
  .chain(containsRequiredKeys(['accountId', 'amount','dueDate']))
  .either((errors) => ({ errors }), (propsObj) => ({ ...propsObj }))
}