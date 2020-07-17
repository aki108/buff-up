import React, { FunctionComponent } from 'react'
import { Layout } from 'antd'

import { QuestionsList } from './components/QuestionsList'
import { QuestionEditor } from './components/QuestionEditor'
import { QuestionEditorPreview } from './components/QuestionPreview'

const { Content } = Layout

interface Props {}

const Dashboard: FunctionComponent<Props> = () => {
  return (
    <Layout>
      <Content>
        <QuestionEditor />
        <QuestionEditorPreview />
      </Content>
      <QuestionsList />
    </Layout>
  )
}

export default Dashboard
