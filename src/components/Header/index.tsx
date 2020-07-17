import React, { FunctionComponent } from 'react'

import { Logo } from './../Logo'

import { StyledHeader, Title } from './styles'

export const Header: FunctionComponent = () => {
  return (
    <StyledHeader>
      <Logo />

      <Title>Buff Up</Title>
    </StyledHeader>
  )
}
