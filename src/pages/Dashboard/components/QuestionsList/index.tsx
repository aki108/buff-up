import React, {
  FunctionComponent,
  useMemo,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { Typography, Button, Skeleton, Empty, Divider } from 'antd'
import useFetch from 'react-fetch-hook'

import { QuestionCard } from './../../../../components'
import { QuestionsListType, QuestionItemResponse } from 'src/@types'

import { List, Header } from './styles'

const { Title } = Typography

const AMOUNT_PAGINATION_SIZE: number = 10

export const QuestionsList: FunctionComponent = () => {
  const [amount, setAmount] = useState(10)
  const [list, setList] = useState<QuestionItemResponse[]>([])

  const { isLoading, data } = useFetch<QuestionsListType>(
    `https://opentdb.com/api.php?amount=${amount}&category=21&type=multiple`
  )

  useEffect(() => {
    setList(data?.results || [])
  }, [data])

  const removeQuestion = useCallback(
    (question: string) => {
      const updatedList = list.filter(
        (item: QuestionItemResponse) => item.question !== question
      )
      setList(updatedList)
    },
    [list, setList]
  )

  const renderedList = useMemo(() => {
    return (
      <>
        {list.length > 0 ? (
          <>
            <Header>
              <Title level={3}>Questions</Title>
              <Button
                type="primary"
                loading={isLoading}
                onClick={() => setAmount(amount + AMOUNT_PAGINATION_SIZE)}
              >
                Load more questions
              </Button>
            </Header>

            <Divider />

            {list.map((item: QuestionItemResponse) => {
              return (
                <QuestionCard
                  onEdit={() => {}}
                  onDelete={() => removeQuestion(item.question)}
                  key={item.question}
                  item={item}
                />
              )
            })}
          </>
        ) : (
          <Empty />
        )}
      </>
    )
  }, [list, removeQuestion, amount, isLoading])

  return <List>{isLoading && !list.length ? <Skeleton /> : renderedList}</List>
}
