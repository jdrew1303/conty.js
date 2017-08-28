interface Item {
  _id?: string
  accountId: string
  amount: number
}
export const createItem: (propsObj: Item) => Item