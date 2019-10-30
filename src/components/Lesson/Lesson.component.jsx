import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateLesson } from '../../redux/lesson/lesson.actions';

import { Row, Col } from 'reactstrap';
import { Form, FormGroup, FormFeedback, Label, Input, Alert } from 'reactstrap';

import courses from '../../data/courses';
import librarians from '../../data/librarians';

import { timeIntervals, setIntervals } from '../../utilities/utilities';

const Lesson = (props) => {
  const { onUpdateLesson } = props;

  const [validForm, setValidForm] = useState(true);
  const [state, setState] = useState({
    term: '',
    courseNumber: '',
    courseTitle: '',
    faculty: '',
    librarian: '',
    coInstructor: '',
    date: '',
    startTime: '',
    duration: '',
    studentCount: ''
  });

  useEffect(() => {
    const updateCourseInfo = (courseNumber) => {
      const thisCourse = courses.find(course => course.courseNumber === courseNumber);

      if(thisCourse) {
        setState(state => state = {...state, [`courseTitle`]: thisCourse['courseTitle'], [`faculty`]: thisCourse['faculty'] })
        document.getElementById('courseTitle').className = 'check-valid form-control is-valid';
        document.getElementById('faculty').className = 'check-valid form-control is-valid';
      }
    }
    updateCourseInfo(state.courseNumber) 
  }, [state.courseNumber]);

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

  const handleChange = event => {
    const { name, value } = event.target

    setState({
      ...state,
      [name]: value
    })

    if(value === '') {
      if(name === 'coInstructor') {
        event.target.className = 'form-control';
      } else {
        event.target.className = 'check-valid form-control is-invalid';
      }
    } else {
      event.target.className = 'check-valid form-control is-valid';
    }
  }

  const handleSubmit = event => {
    event.preventDefault();

    let errors = 0;
    let invalidInputs = document.getElementById('form-step-one').getElementsByClassName('check-valid');
    
    for (let input of invalidInputs) {
      if(input.value === '') {
        input.className='check-valid form-control is-invalid'
        errors = errors + 1
      } else {
        input.className='check-valid form-control is-valid'
      }
    }

    console.log(errors);

    if(errors > 0) {
      setValidForm(false)
      // errors need to be fixed
    } else {
      setValidForm(true)
      // no errors - write data to redux, redirect user
      onUpdateLesson(state);
    }
  }

  return (
    <Row>
      <Col>
        {validForm ? '' : <Alert color="danger">Please Fix the Errors in the Form</Alert>}        
        <Form onSubmit={handleSubmit} id='form-step-one'>
          <FormGroup>
            <Label for='term'>Term</Label>
            <Input className='check-valid' type='select' name='term' id='Term' value={state['term']} onChange={handleChange}>
              <option value=''>Select a Term</option>
              <option value='Fall 2019'>Fall 2019</option>
              <option value='Spring 2020'>Spring 2020</option>
            </Input>
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='courseNumber'>Course Number</Label>
            <Input className='check-valid' type='select' name='courseNumber' id='courseNumber' value={state['courseNumber']} onChange={handleChange} disabled={state['term'] === ''}>
              <option value=''>Select a Course Number</option>
              {getCourses(state['term'])}
            </Input>
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='courseTitle'>Course Title</Label>
            <Input className='check-valid' type="text" name="courseTitle" id="courseTitle" placeholder="Course Title" value={state['courseTitle']} onChange={handleChange} disabled={state['courseNumber'] === ''} />
            <FormFeedback>Please enter a course title</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='faculty'>Faculty</Label>
            <Input className='check-valid' type="text" name="faculty" id="faculty" placeholder="Faculty Name" value={state['faculty']} onChange={handleChange} disabled={state['courseNumber'] === ''} />
            <FormFeedback>Please enter a faculty name</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='librarian'>Librarian</Label>
            <Input className='check-valid' type='select' name='librarian' id='librarian' placeholder='Librarian' value={state['librarian']} onChange={handleChange}>
              <option value=''>Select a Librarian</option>
              {librarians.map(librarian => {
                return <option key={librarian.id} value={librarian.name}>{librarian.name}</option>
              })}
            </Input>
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>            
            <Label for='coInstructor'>Co-Instructor <small>(* optional)</small></Label>
            <Input type="text" name="coInstructor" id="coInstructor" placeholder="Co-Instructor" value={state['coInstructor']} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for='date'>Date</Label>
            <Input className='check-valid' type="date" name="date" id="date" placeholder="mm/dd/yy" value={state['date']} onChange={handleChange} />
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='startTime'>Start Time</Label>
            <Input className='check-valid' type="select" name="startTime" id="startTime" value={state['startTime']} onChange={handleChange}>
              <option value=''>Make a Selection</option>
              {timeIntervals(8, 20).map(interval => {
                return <option key={interval} value={interval}>{interval}</option>
              })}
            </Input>
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='duration'>Duration</Label>
            <Input className='check-valid' type="select" name="duration" id="duration" value={state['duration']} onChange={handleChange}>
              <option value=''>Make a Selection</option>
              {setIntervals(5, 75, 5).map(interval => {
                return <option key={interval} value={interval}>{interval}</option>
              })}
            </Input>
            <FormFeedback>Please make a selection</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="studentCount">Number of Students</Label>
            <Input className='check-valid' type="select" name="studentCount" id="studentCount" value={state['studentCount']} onChange={handleChange}>
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

const mapDispatchToProps = dispatch => {
  return {
    onUpdateLesson: lesson => dispatch(updateLesson(lesson))
  }
}

export default connect(null, mapDispatchToProps)(Lesson);