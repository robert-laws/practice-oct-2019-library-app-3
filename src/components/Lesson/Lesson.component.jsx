import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateLesson, updateLessonField } from '../../redux/lesson/lesson.actions';

import { Row, Col } from 'reactstrap';
import { Form, FormGroup, FormFeedback, Label, Input, Alert } from 'reactstrap';

import courses from '../../data/courses';
import librarians from '../../data/librarians';

import { timeIntervals, setIntervals } from '../../utilities/utilities';

const Lesson = (props) => {
  const { onUpdateLessonField, term, courseNumber, courseTitle, faculty, librarian, coInstructor, date, startTime, duration, studentCount } = props;

  const [validForm, setValidForm] = useState(true);

  useEffect(() => {
    const updateCourseInfo = (courseNumber) => {
      const thisCourse = courses.find(course => course.courseNumber === courseNumber);

      if(thisCourse) {
        // courseTitle
        onUpdateLessonField('courseTitle', thisCourse['courseTitle'])
        // document.getElementById('courseTitle').className = 'check-valid form-control is-valid';
        // faculty
        onUpdateLessonField('faculty', thisCourse['faculty'])
        // document.getElementById('faculty').className = 'check-valid form-control is-valid';
      }
    }
    updateCourseInfo(courseNumber) 
  }, [courseNumber, onUpdateLessonField]);

  const getCourses = term => {
    const courseList = courses.map(course => {
      if(course.term === term) {
        return <option key={course.id} value={course.courseNumber}>{course.courseNumber}</option>
      } else {
        return null;
      }
    })
    return courseList;
  }

  const handleSubmit = event => {
    event.preventDefault();

    props.history.push('/lesson-step-two');
  }

  return (
    <Row>
      <Col>
        {validForm ? '' : <Alert color="danger">Please Fix the Errors in the Form</Alert>}        
        <Form onSubmit={handleSubmit} id='form-step-one'>
          <FormGroup>
            <Label for='term'>Term</Label>
            <Input className='check-valid' type='select' name='term' id='Term' value={term} onChange={(event) => onUpdateLessonField(event.target.name, event.target.value)}>
              <option value=''>Select a Term</option>
              <option value='Fall 2019'>Fall 2019</option>
              <option value='Spring 2020'>Spring 2020</option>
            </Input>
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='courseNumber'>Course Number</Label>
            <Input className='check-valid' type='select' name='courseNumber' id='courseNumber' value={courseNumber} onChange={(event) => onUpdateLessonField(event.target.name, event.target.value)} disabled={term === ''}>
              <option value=''>Select a Course Number</option>
              {getCourses(term)}
            </Input>
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='courseTitle'>Course Title</Label>
            <Input className='check-valid' type="text" name="courseTitle" id="courseTitle" placeholder="Course Title" value={courseTitle} onChange={(event) => onUpdateLessonField(event.target.name, event.target.value)} disabled={courseNumber === ''} />
            <FormFeedback>Please enter a course title</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='faculty'>Faculty</Label>
            <Input className='check-valid' type="text" name="faculty" id="faculty" placeholder="Faculty Name" value={faculty} onChange={(event) => onUpdateLessonField(event.target.name, event.target.value)} disabled={courseNumber === ''} />
            <FormFeedback>Please enter a faculty name</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='librarian'>Librarian</Label>
            <Input className='check-valid' type='select' name='librarian' id='librarian' placeholder='Librarian' value={librarian} onChange={(event) => onUpdateLessonField(event.target.name, event.target.value)}>
              <option value=''>Select a Librarian</option>
              {librarians.map(librarian => {
                return <option key={librarian.id} value={librarian.name}>{librarian.name}</option>
              })}
            </Input>
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>            
            <Label for='coInstructor'>Co-Instructor <small>(* optional)</small></Label>
            <Input type="text" name="coInstructor" id="coInstructor" placeholder="Co-Instructor" value={coInstructor} onChange={(event) => onUpdateLessonField(event.target.name, event.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for='date'>Date</Label>
            <Input className='check-valid' type="date" name="date" id="date" placeholder="mm/dd/yy" value={date} onChange={(event) => onUpdateLessonField(event.target.name, event.target.value)} />
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='startTime'>Start Time</Label>
            <Input className='check-valid' type="select" name="startTime" id="startTime" value={startTime} onChange={(event) => onUpdateLessonField(event.target.name, event.target.value)}>
              <option value=''>Make a Selection</option>
              {timeIntervals(8, 20).map(interval => {
                return <option key={interval} value={interval}>{interval}</option>
              })}
            </Input>
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='duration'>Duration</Label>
            <Input className='check-valid' type="select" name="duration" id="duration" value={duration} onChange={(event) => onUpdateLessonField(event.target.name, event.target.value)}>
              <option value=''>Make a Selection</option>
              {setIntervals(5, 75, 5).map(interval => {
                return <option key={interval} value={interval}>{interval}</option>
              })}
            </Input>
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="studentCount">Number of Students</Label>
            <Input className='check-valid' type="select" name="studentCount" id="studentCount" value={studentCount} onChange={(event) => onUpdateLessonField(event.target.name, event.target.value)}>
              <option value=''>Make a Selection</option>
              {setIntervals(1, 35, 1).map(interval => {
                return <option key={interval} value={interval}>{interval}</option>
              })}
            </Input>
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <Row form>
            <Col md={{size: 2, offset: 10}} className='text-right'>
              <Input type='submit' className='btn btn-primary' value='Next Step' />
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

const mapStateToProps = state => {
  return {
    term: state.lesson.term,
    courseNumber: state.lesson.courseNumber,
    courseTitle: state.lesson.courseTitle,
    faculty: state.lesson.faculty,
    librarian: state.lesson.librarian,
    coInstructor: state.lesson.coInstructor,
    date: state.lesson.date,
    startTime: state.lesson.startTime,
    duration: state.lesson.duration,
    studentCount: state.lesson.studentCount
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateLesson: lesson => dispatch(updateLesson(lesson)),
    onUpdateLessonField: (name, value) => dispatch(updateLessonField(name, value))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Lesson));