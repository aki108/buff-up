import { QuestionItemResponse } from './QuestionItemResponseType'

export interface QuestionsListType {
  response_code: number
  results: QuestionItemResponse[]
}
