import React, { FunctionComponent } from 'react'
import dayjs from 'dayjs'

import { StyledFooter } from './styles'

const currentYear: number = dayjs().year()

export const Footer: FunctionComponent = () => {
  return <StyledFooter>Buff Up App ©{currentYear}</StyledFooter>
}
