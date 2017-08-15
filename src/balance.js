export const getBalanceOf = (accountId, transactions) => (
  mergeItems(transactions)
  .filter(items => items.accountId === accountId)
  .reduce((prev, curr) => prev + curr.amount, 0)
)

const mergeItems = (transactions) => (
  transactions.reduce((prev, curr) => prev.concat(curr.items),[])
)