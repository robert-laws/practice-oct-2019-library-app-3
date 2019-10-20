import { UPDATE_LESSON } from './lesson.types';

export const updateLesson = (field, value) => ({
  type: UPDATE_LESSON,
  payload: { field, value }
})