import { combineReducers } from 'redux';

import lessonReducer from './lesson/lesson.reducer';

export default combineReducers({
  lesson: lessonReducer
})