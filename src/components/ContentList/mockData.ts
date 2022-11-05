import { v4 as uuid } from 'uuid'
export interface ItemType {
  id: string
  title: string
}
const data: Array<ItemType> = []

for (let i = 0; i < 10000; i++) {
  data.push({
    id: uuid(),
    title: `test items ${Math.random()}`,
  })
}

export default data
