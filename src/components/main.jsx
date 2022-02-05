import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { getUserByName, getUsers } from '../api/users'
import { BUTTON_STATUSES } from '../constants/constants'
import { activeButtonState, idsOfSelectedUsersState, selectedUsersState, usersState } from '../recoil/atoms'
import PopupWithAddInfo from './popupWithAddInfo'

const Main = () => {

  const [allUsers, setAllUsers] = useRecoilState(usersState)
  const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUsersState)
  const [selectedUsersIds, setSelectedUsersIds] = useRecoilState(idsOfSelectedUsersState)
  const activeButton = useRecoilValue(activeButtonState)

  const [popupIsVisible, setPopupIsVisible] = useState(false)
  const [infoForPopup, setInfoForPopup] = useState()

  const ShowAddInfo = (userName) => {
    getUserByName(userName)
      .then(({ data }) => {
        setInfoForPopup(data)
        setPopupIsVisible(true)
      })
  }

  const SelectUser = (userIndex) => {
    setSelectedUsersIds([
      ...selectedUsersIds,
      allUsers[userIndex].id,
    ])
    setSelectedUsers([
      ...selectedUsers,
      allUsers[userIndex],
    ])
  }

  const DeleteUserFromSelected = (userIndex) => {
    let newSelectedUsers = [...selectedUsers]
    let newSelectedIds = [...selectedUsersIds]
    newSelectedUsers.splice(userIndex, 1)
    newSelectedIds.splice(selectedUsersIds.indexOf(selectedUsers[userIndex].id), 1)
    setSelectedUsers([ ...newSelectedUsers ])
    setSelectedUsersIds([ ...newSelectedIds ])
  }

  const DeleteAllUsers = () => {
    setSelectedUsers([])
    setSelectedUsersIds([])
  }
  
  useEffect(() => {
    getUsers()
      .then(({ data }) => {
        setAllUsers(data)
      })   
  }, [])

  console.log(activeButton);

  return (
    <div className="main-content">
      {
        <>
          <p className="main-content_title">
            {activeButton}
          </p>
          {
            activeButton === BUTTON_STATUSES.SELECTED_USERS && (
              <button
                className="main-content_button-delete-all"
                onClick={() => DeleteAllUsers()}
                disabled={!selectedUsers.length}
              >
                Delete all users
              </button>
            )
          }
          {
            activeButton === BUTTON_STATUSES.USERS && allUsers.length
              ? (
                allUsers.map((user, index) => {
                  return (
                    <div key={user.id} className="main-content_user-block">
                      <img className="main-content_user-block_avatar" src={user.avatar_url} alt="" />
                      <p className="main-content_user-block_login">
                        {user.login}
                      </p>
                      <button
                        className="main-content_user-block_button main-content_user-block_button-info"
                        onClick={() => ShowAddInfo(user.login)}
                      >
                        Info
                      </button>
                      <button
                        className="main-content_user-block_button main-content_user-block_button-select"
                        onClick={() => SelectUser(index)}
                        disabled={selectedUsersIds.includes(user.id)}
                      >
                        Select
                      </button>
                    </div>
                  )
                })
              )
              : activeButton === BUTTON_STATUSES.SELECTED_USERS && selectedUsers.length
                ? (
                  selectedUsers.map((user, index) => {
                    return (
                      <div key={user.id} className="main-content_user-block">
                        <img className="main-content_user-block_avatar" src={user.avatar_url} alt="" />
                        <p className="main-content_user-block_login">
                          {user.login}
                        </p>
                        <button
                          className="main-content_user-block_button main-content_user-block_button-info"
                          onClick={() => ShowAddInfo(user.login)}
                        >
                          Info
                        </button>
                        <button
                          className="main-content_user-block_button main-content_user-block_button-delete"
                          onClick={() => DeleteUserFromSelected(index)}
                        >
                          Delete
                        </button>
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
