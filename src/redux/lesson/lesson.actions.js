import { UPDATE_LESSON, UPDATE_LESSON_FIELD } from './lesson.types';

export const updateLessonField = (field, value) => ({
  type: UPDATE_LESSON_FIELD,
  payload: { field, value }
})

export const updateLesson = (lesson) => ({
  type: UPDATE_LESSON,
  payload: lesson
})