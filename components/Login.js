import React from 'react'
import { browserHistory } from 'react-router'

export default function Login() {
  return (
      <div>
        <div>LOGIN</div>
        <input type='button' onClick={() => browserHistory.push('/home')} value='Login'/>
      </div>
  )
}
