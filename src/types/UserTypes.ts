export type UserGroup = Object & {
  key: number
  label: string
}

export type UserType = {
  email: string
  image: string
  username: string
  name: string
  surname: string
  phone: string
  role: number
  userGroups: Array<UserGroup>
  selectedGroup: UserGroup
}
