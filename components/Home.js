import React from 'react'
import { browserHistory } from 'react-router'

export default function Login() {
  return (
      <div>
        <div>HOME</div>
        <input type='button' onClick={() => browserHistory.push('/')} value='Sign out'/>
      </div>
  )
}
