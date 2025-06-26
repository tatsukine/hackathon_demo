import React from 'react'
import NavigationBar from './NavigationBar';

const TimeLine = ({handleLogout}) => {
  return (
    <div className="text-center p-4">
      <h1>TimeLine</h1>
      <p>This is the timeline page.</p>
      {/* <NavigationBar/> */}
      <button onClick={handleLogout}>
        ログアウト
      </button>
    </div>
  )
}

export default TimeLine