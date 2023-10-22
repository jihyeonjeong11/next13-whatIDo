import React from 'react'
import {Rnd} from 'react-rnd'

const RndWindow = ({children}) => {
  return (
    <Rnd style={{width: 300, height: 150}}>{children}</Rnd>
  )
}

export default RndWindow