import { UPDATE_LESSON, UPDATE_LESSON_FIELD, UPDATE_LESSON_FIELD_ARRAY } from './lesson.types';

const INITIAL_STATE = {
  term: '',
  courseNumber: '',
  courseTitle: '',
  faculty: '',
  librarian: '',
  coInstructor: '',
  date: '',
  duration: '',
  studentCount: '',
  classAssignment: '',
  learningOutcomes: []
}

const lessonReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_LESSON:
      return {
        ...state,
        ...action.payload
      }
    case UPDATE_LESSON_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value
      }
    case UPDATE_LESSON_FIELD_ARRAY:
      return {
        ...state,
        [action.payload.field]: [...state[action.payload.field], action.payload.value]
      }
    default:
      return state
  }
}

export default lessonReducer;