import styled from 'styled-components/macro'

export const Container = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  padding: 10px;
  border-radius: 4px;
  overflow: hidden;
`

export const Actions = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
  align-items: center;

  & .ant-btn {
    margin-right: 10px;
  }
`

export const QuestionInfo = styled.li`
  text-align: left;
  padding: 3px 0.5rem;
`
