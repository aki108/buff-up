import React, { FunctionComponent, useMemo } from 'react'
import { List, Typography, Button } from 'antd'
import { QuestionItemResponse } from 'src/@types'

import { Container, QuestionInfo, Actions } from './styles'

interface Props {
  onDelete: () => void
  item: QuestionItemResponse
  onEdit: (item: QuestionItemResponse) => void
}

export const QuestionCard: FunctionComponent<Props> = ({
  item,
  onDelete,
  onEdit,
}) => {
  const data = useMemo(() => {
    return [
      {
        key: 'Question:',
        value: item.question,
      },
      {
        key: 'Category:',
        value: item.category,
      },
      {
        key: 'Difficulty:',
        value: item.difficulty,
      },
    ]
  }, [item])

  return (
    <Container>
      <List
        dataSource={data}
        renderItem={(item) => (
          <QuestionInfo>
            <Typography.Text>
              <b>{item.key}</b>
              &nbsp;
              {item.value}
            </Typography.Text>
          </QuestionInfo>
        )}
      />

      <Actions>
        <Button block onClick={() => onEdit(item)}>
          Edit
        </Button>
        <Button block danger onClick={onDelete}>
          Delete
        </Button>
      </Actions>
    </Container>
  )
}
