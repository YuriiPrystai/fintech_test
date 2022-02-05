import { atom } from 'recoil'

export const activeButtonState = atom({
  key: 'activeButton',
  default: null,
})

export const usersState = atom({
  key: 'users',
  default: [],
})

export const selectedUsersState = atom({
  key: 'selectedUsers',
  default: [],
})

export const idsOfSelectedUsersState = atom({
  key: 'idsSelectedUsers',
  default: [],
})
