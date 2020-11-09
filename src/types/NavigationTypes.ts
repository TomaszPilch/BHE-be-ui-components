export type NavigationItem = {
  actions: number
  isParent: boolean
  items: NavigationItem[]
  name: string
  url: string
  fabricIcon?: string
}

export type ActionNames = 'view' | 'edit' | 'delete'

export type RightName = 'LIST' | 'VIEW' | 'ADD' | 'EDIT' | 'DELETE'

export type AllRightsType = {
  [right: number]: false | number
}

export type ChangeRedirectUrlType = (url: string, urlAs?: string) => void
