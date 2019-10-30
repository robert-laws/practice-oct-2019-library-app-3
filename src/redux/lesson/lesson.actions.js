import { UPDATE_LESSON } from './lesson.types';

export const updateLesson = (lesson) => ({
  type: UPDATE_LESSON,
  payload: lesson
})