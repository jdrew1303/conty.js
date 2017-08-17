# ContyJS - Functional JS library for making accounting simple

## Use

### generateCreateAccount(confObj = defaultConfObj)

  defaultConfObj = {
    validTypes: ['assets', 'liabilities', 'equity', 'bank', 'incomes', 'expenses']
  }
  
  generateCreateAccount returns a createAccount function that recibe the account props, validates it's structure and return the account in a valid format for saving with thek _id key.  

  ### createItem(itemObj)
  


account: 
{
  _id: same as name
  name: string has no validation
  type: string has array validation
  error: array of error objects
}

transaction: {
  _id: generatedRandomly,
  date: dateISOString
  items: item[]
}