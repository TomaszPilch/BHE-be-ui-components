export type NavigationItem = {
  actions: number
  isParent: boolean
  items: NavigationItem[]
  name: string
  url: string
}

export type ActionNames = 'view' | 'edit' | 'delete'

export type RightName = 'LIST' | 'VIEW' | 'ADD' | 'EDIT' | 'DELETE'

export type AllRightsType = {
  [right: number]: false | number
}
