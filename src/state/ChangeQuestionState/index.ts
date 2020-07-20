import { StoreonModule } from 'storeon'
import { QuestionItemResponse } from 'src/@types'

export interface QuestionsState {
  chosenQuestion: QuestionItemResponse | null
}

export interface QuestionsEvents {
  'question/set': QuestionItemResponse
  'question/reset': undefined
}

export const questionsStateModule: StoreonModule<QuestionsState> = (store) => {
  store.on('@init', () => ({
    chosenQuestion: null,
  }))
  store.on('question/set', (state, chosenQuestion: QuestionItemResponse) => ({
    ...state,
    chosenQuestion,
  }))
  store.on('question/reset', (state) => ({
    ...state,
    chosenQuestion: null,
  }))
}
