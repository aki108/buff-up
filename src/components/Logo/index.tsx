import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import { LogoImg } from './styles'

export const Logo: FunctionComponent = () => {
  return (
    <Link to="/">
      <LogoImg src="./logo.png" />
    </Link>
  )
}
