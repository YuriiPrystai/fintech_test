import React from 'react'

const PopupWithAddInfo = ({ setPopupIsVisible, info }) => (
  <div className="popup">
    <div className="popup_content">
      <p><b>Html url</b> - {info.html_url}</p>
      <p><b>Type</b> - {info.type}</p>
      <p><b>Public repos</b> - {info.public_repos}</p>
      <p><b>Followers</b> - {info.followers}</p>
      <button
        type="button"
        className="popup_content_button-close"
        onClick={() => setPopupIsVisible(false)}
      >
        Close
      </button>
    </div>
  </div>
)

export default PopupWithAddInfo
