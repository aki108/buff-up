import { createStoreon } from 'storeon'
import { storeonDevtools } from 'storeon/devtools'

import {
  QuestionsState,
  QuestionsEvents,
  questionsStateModule,
} from './ChangeQuestionState'

export type StoreState = QuestionsState
export type StoreEvents = QuestionsEvents

const store = createStoreon<StoreState, StoreEvents>([
  questionsStateModule,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
])

export default store
