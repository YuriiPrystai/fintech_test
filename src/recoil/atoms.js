import { atom } from 'recoil'

import { BUTTON_STATUSES } from '../constants/constants'

export const activeButtonState = atom({
  key: 'activeButton',
  default: BUTTON_STATUSES.USERS,
})

export const usersState = atom({
  key: 'users',
  default: [],
})

export const selectedUsersState = atom({
  key: 'selectedUsers',
  default: [],
})

export const displayedUsersState = atom({
  key: 'displayedUsers',
  default: [],
})

export const idsOfSelectedUsersState = atom({
  key: 'idsSelectedUsers',
  default: [],
})
