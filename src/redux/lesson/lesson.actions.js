import { UPDATE_LESSON, UPDATE_LESSON_FIELD, UPDATE_LESSON_FIELD_ARRAY } from './lesson.types';

export const updateLessonFieldArray = (field, value) => ({
  type: UPDATE_LESSON_FIELD_ARRAY,
  payload: { field, value }
})

export const updateLessonField = (field, value) => ({
  type: UPDATE_LESSON_FIELD,
  payload: { field, value }
})

export const updateLesson = (lesson) => ({
  type: UPDATE_LESSON,
  payload: lesson
})