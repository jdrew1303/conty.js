# ContyJS - Functional JS library for making accounting simple

## Use

### generateCreateAccount(confObj = defaultConfObj)

  defaultConfObj = {
    validTypes: ['assets', 'liabilities', 'equity', 'bank', 'incomes', 'expenses']
  }

account: 
  {
    _id: same as name
    name: string has no validation
    type: string has array validation
    error: array of error objects
  }
  
  generateCreateAccount returns a createAccount function that recibe the account props, validates it's structure and return the account in a valid format for saving with thek _id key.  

  ### createItem(itemObj)
  


transaction: {
  _id: generatedRandomly,
  items: item[]
}

item: {
  accountId
  amount
  dueDate
}