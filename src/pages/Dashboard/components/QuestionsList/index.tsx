import React, {
  FunctionComponent,
  useMemo,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { Typography, Button, Skeleton, Empty, Divider } from 'antd'
import useFetch from 'react-fetch-hook'
import { v4 as uuidv4 } from 'uuid'

import { QuestionCard } from './../../../../components'
import { QuestionsListType, QuestionItemResponse } from 'src/@types'
import { useStoreon } from 'storeon/react'
import { StoreState, StoreEvents } from 'src/state/store'

import { List, Header } from './styles'

const { Title } = Typography

const AMOUNT_PAGINATION_SIZE: number = 10

export const QuestionsList: FunctionComponent = () => {
  const [amount, setAmount] = useState(10)
  const [list, setList] = useState<QuestionItemResponse[]>([])

  const { dispatch } = useStoreon<StoreState, StoreEvents>('chosenQuestion')

  const { isLoading, data } = useFetch<QuestionsListType>(
    `https://opentdb.com/api.php?amount=${amount}&category=21&type=multiple`
  )

  useEffect(() => {
    setList(
      data?.results.map((item: QuestionItemResponse) => ({
        ...item,
        id: uuidv4(),
      })) || []
    )
  }, [data])

  const handleSetQuestion = useCallback(
    (value: QuestionItemResponse) => {
      dispatch('question/reset')
      dispatch('question/set', value)
    },
    [dispatch]
  )

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
                  onEdit={() => handleSetQuestion(item)}
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
  }, [list, removeQuestion, amount, isLoading, handleSetQuestion])

  return <List>{isLoading && !list.length ? <Skeleton /> : renderedList}</List>
}
