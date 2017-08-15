# ContyJS - Functional JS library for making accounting simple

## Use

### createAccount(confObj = defaultConfObj)

  defaultConfObj = {
    validTypes: ['assets', 'liabilities', 'equity', 'bank', 'incomes', 'expenses']
  }
  
  createAccount returns a function that recibe the acocount props, validates it's structure and return the account in a valid format for saving with thek _id key.  

  ### createItem(itemObj)
  
