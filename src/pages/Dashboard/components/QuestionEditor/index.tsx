import React, { useState, useEffect, useCallback } from 'react'
import { Form, Input, Button, Checkbox, notification, Radio } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useStoreon } from 'storeon/react'
import { StoreState, StoreEvents } from 'src/state/store'
import { useDebouncedCallback } from 'use-debounce'
import { QuestionItemResponse } from 'src/@types'

import { Content, Title, AddAnswerButtonWrapper } from './styles'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
}

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 0 },
  },
  wrapperCol: {
    xs: { span: 4 },
    sm: { span: 20 },
  },
}

const tailLayout = {
  wrapperCol: { offset: 0, span: 6 },
}

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 4 },
  },
}

const initialValues = {
  answer: '',
  difficulty: 'easy',
  answers: [''],
}

export const QuestionEditor = () => {
  const [correctAnswerIndex, changeCorrectAnswer] = useState(0)

  const [form] = Form.useForm()
  const [debouncedCallback] = useDebouncedCallback(
    (value: QuestionItemResponse) => {
      dispatch('question/set', value)
    },
    300
  )

  const { chosenQuestion, dispatch } = useStoreon<StoreState, StoreEvents>(
    'chosenQuestion'
  )

  const onFinish = () => {
    notification.success({
      message: 'Question successfully saved',
    })
    form.resetFields()
  }

  const onFinishFailed = () => {
    notification.error({
      message: 'Please, fill out required fields',
    })
  }

  useEffect(() => {
    if (chosenQuestion && chosenQuestion.id) {
      form.setFieldsValue({
        question: chosenQuestion.question,
        answers: [
          ...chosenQuestion.incorrect_answers,
          chosenQuestion.correct_answer,
        ],
      })
      changeCorrectAnswer(chosenQuestion.incorrect_answers.length)
    }
  }, [form, chosenQuestion, changeCorrectAnswer])

  const handleFieldsChange = useCallback(
    (correctIndex: number) => {
      const values = { ...form.getFieldsValue() }

      debouncedCallback({
        difficulty: values.difficulty,
        question: values.question,
        incorrect_answers: values.answers.filter(
          (_item: string, index: number) => index !== correctIndex
        ),
        correct_answer: values.answers.find(
          (_item: string, index: number) => index === correctIndex
        ),
      })
    },
    [debouncedCallback, form]
  )

  const handleChangeCorrectAnswerIndex = useCallback(
    (correctIndex: number) => {
      changeCorrectAnswer(correctIndex)
      handleFieldsChange(correctIndex)
    },
    [changeCorrectAnswer, handleFieldsChange]
  )

  return (
    <Content>
      <Title level={3}>Editor</Title>
      <Form
        {...layout}
        form={form}
        name="basic"
        onFinish={onFinish}
        initialValues={initialValues}
        onFinishFailed={onFinishFailed}
        onFieldsChange={() => handleFieldsChange(correctAnswerIndex)}
      >
        <Form.Item
          label="Question"
          name="question"
          rules={[
            {
              required: true,
              message: `The question can't be an empty string!`,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Difficulty" name="difficulty">
          <Radio.Group>
            <Radio.Button value="easy">Easy</Radio.Button>
            <Radio.Button value="medium">Medium</Radio.Button>
            <Radio.Button value="hard">Hard</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Form.List name="answers">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => {
                    return (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? 'Answers' : ''}
                        required
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Answers can't be an empty string",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="Type answer"
                            style={{ width: '60%' }}
                          />
                        </Form.Item>

                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                              remove(field.name)
                            }}
                          />
                        ) : null}

                        <Form.Item
                          {...tailLayout}
                          valuePropName="checked"
                          style={{ marginBottom: 0 }}
                        >
                          <Checkbox
                            checked={correctAnswerIndex === field.fieldKey}
                            onChange={() =>
                              handleChangeCorrectAnswerIndex(field.fieldKey)
                            }
                          >
                            Is correct
                          </Checkbox>
                        </Form.Item>
                      </Form.Item>
                    )
                  })}

                  <Form.Item>
                    <AddAnswerButtonWrapper>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add()
                        }}
                        block
                      >
                        <PlusOutlined /> Add answers
                      </Button>
                    </AddAnswerButtonWrapper>
                  </Form.Item>
                </div>
              )
            }}
          </Form.List>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  )
}
