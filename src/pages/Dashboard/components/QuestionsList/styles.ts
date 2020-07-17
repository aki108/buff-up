import styled from 'styled-components/macro'
import { Layout } from 'antd'

export const List = styled(Layout.Sider)`
  min-width: 400px !important;
  background: #fff !important;
  padding: 1rem 1.5rem;
  max-height: calc(100vh - (64px + 70px));
  overflow: auto;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
