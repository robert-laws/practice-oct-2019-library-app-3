import { UPDATE_LESSON } from './lesson.types';

const INITIAL_STATE = {
  term: '',
  courseNumber: '',
  courseTitle: '',
  faculty: '',
  librarian: '',
  coInstructor: '',
  date: '',
  duration: '',
  studentCount: ''
}

const lessonReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case UPDATE_LESSON:
      return {
        ...state,
        [action.payload.field]: action.payload.value
      }
    default:
      return state
  }
}

export default lessonReducer;