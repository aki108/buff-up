import React from 'react'
import { Form, Input, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

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

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 4 },
  },
}

export const QuestionEditor = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Content>
      <Title level={3}>Editor</Title>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
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
          <Form.List name="names">
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
