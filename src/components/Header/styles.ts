import { Layout, Typography } from 'antd'
import styled from 'styled-components/macro'

export const StyledHeader = styled(Layout.Header)`
  display: flex;
  background: #00bcd4;
  align-items: center;
`

export const Title = styled(Typography.Text)`
  font-size: 30px;
  color: #fff;
  margin-left: 10px;
  font-family: 'Work Sans', Arial, Helvetica, sans-serif;
`
