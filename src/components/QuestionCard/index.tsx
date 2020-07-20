import React, { FunctionComponent, useMemo } from 'react'
import { List, Typography, Button } from 'antd'
import { QuestionItemResponse } from 'src/@types'

import { Container, QuestionInfo, Actions } from './styles'

interface Props {
  preview?: boolean
  onDelete?: () => void
  item: QuestionItemResponse | null
  onEdit?: (item: QuestionItemResponse) => void
}

export const QuestionCard: FunctionComponent<Props> = ({
  item,
  preview = false,
  onDelete = () => {},
  onEdit = () => {},
}) => {
  const data = useMemo(() => {
    const data = [
      {
        key: 'Question:',
        value: item?.question,
      },
      {
        key: 'Category:',
        value: item?.category,
      },
      {
        key: 'Difficulty:',
        value: item?.difficulty,
      },
    ]

    if (preview) {
      return [
        ...data,
        {
          key: 'Correct Answer:',
          value: item?.correct_answer,
        },
        {
          key: 'Incorrect Answer:',
          value: item?.incorrect_answers.join(', '),
        },
      ]
    }

    return data
  }, [item, preview])

  return (
    <>
      {item && (
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

          {!preview && (
            <Actions>
              <Button block onClick={() => onEdit(item)}>
                Edit
              </Button>
              <Button block danger onClick={onDelete}>
                Delete
              </Button>
            </Actions>
          )}
        </Container>
      )}
    </>
  )
}
