import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { getUserByName, getUsers } from '../api/users'
import { BUTTON_STATUSES } from '../constants/constants'
import { sortByField } from '../helpers/sortByField'
import {
  activeButtonState,
  displayedUsersState,
  idsOfSelectedUsersState,
  selectedUsersState,
  usersState,
} from '../recoil/atoms'
import PopupWithAddInfo from './popupWithAddInfo'

const Main = () => {
  const [allUsers, setAllUsers] = useRecoilState(usersState)
  const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUsersState)
  const [selectedUsersIds, setSelectedUsersIds] = useRecoilState(idsOfSelectedUsersState)
  const [displayedUsers, setDisplayedUsers] = useRecoilState(displayedUsersState)
  const activeButton = useRecoilValue(activeButtonState)

  const [popupIsVisible, setPopupIsVisible] = useState(false)
  const [infoForPopup, setInfoForPopup] = useState()

  useEffect(() => {
    getUsers()
      .then(({ data }) => {
        setAllUsers(data)
        setDisplayedUsers(data)
      })
    setSelectedUsers(JSON.parse(window.localStorage.getItem('selectedUsers')) || [])
    setSelectedUsersIds(JSON.parse(window.localStorage.getItem('selectedUsersIds')) || [])
  }, [])

  useEffect(() => {
    window.localStorage.setItem('selectedUsers', JSON.stringify(selectedUsers))
    window.localStorage.setItem('selectedUsersIds', JSON.stringify(selectedUsersIds))
  }, [selectedUsers])

  useEffect(() => {
    if (activeButton === BUTTON_STATUSES.USERS && allUsers) {
      setDisplayedUsers(allUsers)
    } else if (activeButton === BUTTON_STATUSES.SELECTED_USERS && selectedUsers) {
      setDisplayedUsers(selectedUsers)
    }
  }, [activeButton])

  const ShowAddInfo = (userName) => {
    getUserByName(userName)
      .then(({ data }) => {
        setInfoForPopup(data)
        setPopupIsVisible(true)
      })
  }

  const SelectUser = (userId) => {
    setSelectedUsersIds([
      ...selectedUsersIds,
      userId,
    ])
    setSelectedUsers([
      ...selectedUsers,
      ...allUsers.filter((user) => user.id === userId),
    ])
  }

  const DeleteUserFromSelected = (userId) => {
    let newDisplayedUsers = displayedUsers.filter((user) => user.id !== userId)
    let newSelectedUsers = selectedUsers.filter((user) => user.id !== userId)
    let newSelectedIds = selectedUsersIds.filter((id) => id !== userId)
    setSelectedUsers([ ...newSelectedUsers ])
    setDisplayedUsers([ ...newDisplayedUsers ])
    setSelectedUsersIds([ ...newSelectedIds ])
  }

  const DeleteAllUsers = () => {
    if (activeButton === BUTTON_STATUSES.SELECTED_USERS) {
      setSelectedUsers([])
      setSelectedUsersIds([])
      setDisplayedUsers([])
    }
  }

  const FilterUsers = (field) => {
    setDisplayedUsers([...displayedUsers].sort(sortByField(field)))
    if (activeButton === BUTTON_STATUSES.SELECTED_USERS) {
      setSelectedUsers([...selectedUsers].sort(sortByField(field)))
    } else if (activeButton === BUTTON_STATUSES.USERS) {
      setAllUsers([...allUsers].sort(sortByField(field)))
    }
  }

  return (
    <div className="main-content">
      <section className="main-content_filters">
        <p className="main-content_filters_title">
          Filters
        </p>
        <button
          type="button"
          className="main-content_filters_button"
          onClick={() => FilterUsers('id')}
        >
          By id
        </button>
        <button
          type="button"
          className="main-content_filters_button"
          onClick={() => FilterUsers('login')}
        >
          By login
        </button>
      </section>
      {
        <>
          <p className="main-content_title">
            {activeButton}
          </p>
          {
            activeButton === BUTTON_STATUSES.SELECTED_USERS && (
              <button
                type="button"
                className="main-content_button-delete-all"
                onClick={() => DeleteAllUsers()}
                disabled={!selectedUsers.length}
              >
                Delete all users
              </button>
            )
          }
          {
             displayedUsers.length
              ? (
                displayedUsers.map((user, index) => {
                  return (
                    <div key={user.id} className="main-content_user-block">
                      <img className="main-content_user-block_avatar" src={user.avatar_url} alt="" />
                      <p className="main-content_user-block_login">
                        {user.login}
                      </p>
                      <button
                        type="button"
                        className="main-content_user-block_button main-content_user-block_button-info"
                        onClick={() => ShowAddInfo(user.login)}
                      >
                        Info
                      </button>
                      {
                        activeButton === BUTTON_STATUSES.USERS && (
                          <button
                            type="button"
                            className="main-content_user-block_button main-content_user-block_button-select"
                            onClick={() => SelectUser(user.id)}
                            disabled={selectedUsersIds.includes(user.id)}
                          >
                            Select
                          </button>
                        )
                      }
                      {
                        activeButton === BUTTON_STATUSES.SELECTED_USERS && (
                          <button
                            type="button"
                            className="main-content_user-block_button main-content_user-block_button-delete"
                            onClick={() => DeleteUserFromSelected(user.id)}
                          >
                            Delete
                          </button>
                        )
                      }
                    </div>
                  )
                })
              )
              : 'There are no users'
          }
        </>
      }
      {
        popupIsVisible && infoForPopup && (
          <PopupWithAddInfo
            setPopupIsVisible={setPopupIsVisible}
            info={infoForPopup}
          />
        )
      }
    </div>
  )
}

export default Main
