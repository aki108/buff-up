import React from 'react'
import { Typography } from 'antd'

import { QuestionCard } from './../../../../components'

import { useStoreon } from 'storeon/react'
import { StoreState, StoreEvents } from 'src/state/store'

import { Content } from './styles'

const { Title } = Typography

export const QuestionEditorPreview = () => {
  const { chosenQuestion } = useStoreon<StoreState, StoreEvents>(
    'chosenQuestion'
  )

  return (
    <>
      {chosenQuestion && (
        <Content>
          <Title level={3}>Question Preview</Title>

          <QuestionCard preview item={chosenQuestion} />
        </Content>
      )}
    </>
  )
}
