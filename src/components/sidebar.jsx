import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { BUTTON_STATUSES } from '../constants/constants'
import { activeButtonState } from '../recoil/atoms'

const Sidebar = () => {
  const [activeButton, setActiveButton] = useRecoilState(activeButtonState)

  useEffect(() => {
    setActiveButton(BUTTON_STATUSES.USERS)
  }, [])

  const handleChangeActiveButton = (event) => {
    setActiveButton(event.target.value)
  }

  return (
    <div className="sidebar">
      <button
        className={activeButton === BUTTON_STATUSES.USERS ? 'sidebar_button active' : 'sidebar_button'}
        value={BUTTON_STATUSES.USERS}
        onClick={handleChangeActiveButton}
      >
        {BUTTON_STATUSES.USERS}
      </button>
      <button
        className={activeButton === BUTTON_STATUSES.SELECTED_USERS ? 'sidebar_button active' : 'sidebar_button'}
        value={BUTTON_STATUSES.SELECTED_USERS}
        onClick={handleChangeActiveButton}
      >
        {BUTTON_STATUSES.SELECTED_USERS}
      </button>
    </div>
  )
}

export default Sidebar
