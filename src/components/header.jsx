import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { BUTTON_STATUSES } from '../constants/constants'
import {
  activeButtonState,
  displayedUsersState,
  selectedUsersState,
  usersState,
} from '../recoil/atoms'

const Header = () => {
  const allUsers = useRecoilValue(usersState)
  const selectedUsers = useRecoilValue(selectedUsersState)
  const [, setDisplayedUsers] = useRecoilState(displayedUsersState)
  const activeButton = useRecoilValue(activeButtonState)

  const [searchInput, setSearchInput] = useState('')

  const UpdateDisplayedUsers = () => {
    setSearchInput('')
    if (activeButton === BUTTON_STATUSES.USERS) {
      setDisplayedUsers(allUsers)
    } else if (activeButton === BUTTON_STATUSES.SELECTED_USERS) {
      setDisplayedUsers(selectedUsers)
    }
  }

  useEffect(() => {
    UpdateDisplayedUsers()
  }, [activeButton])

  const SearchInListOfUsers = (value) => {
    setSearchInput(value)
    if (activeButton === BUTTON_STATUSES.USERS) {
      setDisplayedUsers(allUsers.filter((user) => user.login.includes(value)))
    } else if (activeButton === BUTTON_STATUSES.SELECTED_USERS) {
      setDisplayedUsers(selectedUsers.filter((user) => user.login.includes(value)))
    }
  }

  return (
    <div className="header">
      <p className="header_title">Search by login</p>
      <input
        id="input_search"
        className="header_input-search"
        type="text"
        name="input_search"
        onChange={(event) => SearchInListOfUsers(event.target.value)}
        value={searchInput}
      />
    </div>
  )
}

export default Header
