import React, { useState, useMemo, useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useStoreon } from 'storeon/react'
import { StoreState, StoreEvents } from 'src/state/store'

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

export const QuestionEditor = () => {
  const [correctAnswer, changeCorrectAnswer] = useState('')
  const [form] = Form.useForm()

  const { chosenQuestion } = useStoreon<StoreState, StoreEvents>(
    'chosenQuestion'
  )

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    form.setFieldsValue({
      question: chosenQuestion?.question,
      answers: chosenQuestion?.incorrect_answers,
    })
  }, [form, chosenQuestion])

  return (
    <Content>
      <Title level={3}>Editor</Title>
      <Form
        {...layout}
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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

        <Form.Item>
          <Form.List name="answers">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
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

                      <Form.Item {...tailLayout} valuePropName="checked">
                        <Checkbox
                          checked={!!correctAnswer}
                          onChange={() => changeCorrectAnswer('trtrt')}
                        >
                          Is correct
                        </Checkbox>
                      </Form.Item>
                    </Form.Item>
                  ))}

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
