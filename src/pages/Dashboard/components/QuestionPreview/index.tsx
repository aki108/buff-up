import React from 'react'
import { Typography } from 'antd'

import { QuestionCard } from './../../../../components'

import { Content } from './styles'

const { Title } = Typography

export const QuestionEditorPreview = () => {
  return (
    <Content>
      <Title level={3}>Question Preview</Title>
    </Content>
  )
}
