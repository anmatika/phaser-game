export type Item = {
  name: string,
  value: number,
  collected: boolean
}

export default class Collection {
  public static items: Item[]

  public static getItems() {
    return Collection.items ?? []
  }

  public static getItem(name: string) {
    Collection.items.find(item => item.name === name)
  }

  public static collect(name: string) {
    if (!Collection.items) {
      Collection.items = []
    }

    if (!Collection.items.find(item => item.name === name)) {
      Collection.items.push({
        name: name,
        value: 0,
        collected: false
      })
    }

    Collection.items.forEach(item => {
      if (item.name === name) {
        item.value++,
          item.collected = true
      }
    })
  }
}
