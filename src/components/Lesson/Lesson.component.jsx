import React, { useState, useEffect } from 'react';

import { Row, Col } from 'reactstrap';
import { Form, FormGroup, FormFeedback, Label, Input, Button, Alert } from 'reactstrap';

import courses from '../../data/courses';
import librarians from '../../data/librarians';

import { timeIntervals, setIntervals, validatePresence, validateSelection } from '../../utilities/utilities';

const Lesson = () => {
  const [validForm, setValidForm] = useState(true);
  const [errorList, setErrorList] = useState({});
  const [term, setTerm] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [faculty, setFaculty] = useState('');
  const [librarian, setLibrarian] = useState('');
  const [coInstructor, setCoInstructor] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [studentCount, setStudentCount] = useState('');

  useEffect(() => {
    const updateCourseInfo = courseNumber => {
      const thisCourse = courses.find(course => course.courseNumber === courseNumber);

      if(thisCourse) {
        setCourseTitle(thisCourse.courseTitle)
        setFaculty(thisCourse.faculty)
      }
    }
    updateCourseInfo(courseNumber) 
  }, [courseNumber]);

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



  const saveProgress = () => {
    // term, courseNumber, courseTitle, faculty, librarian, date, startTime, duration, studentCount
    const result = validateSelection(term);

    if(result === false) {
      setErrorList({
        ...errorList,
        termError: 'You must select a term'
      })
    } else {
      const newErrorList = Object.keys(errorList).reduce((object, key) => {
        if(key !== 'termError') {
          object[key] = errorList[key]
        }
        return object
      }, {})

      setErrorList({...newErrorList})
    }

    // if(Object.keys(errorList).length > 0) {
    //   console.log(Object.keys(errorList).length)
    //   setValidForm(false)
    // } else {
    //   setValidForm(true)
    // }
  }

  return (
    <Row>
      <Col>
        {validForm ? '' : <Alert color="danger">Please Fix the Errors in the Form</Alert>}        
        <Form>
          <FormGroup>
            <Label for='term'>Term</Label>
            <Input type='select' name='term' id='term' value={term} onChange={e => setTerm(e.target.value)} invalid={errorList['termError'] ? true : false}>
              <option value=''>Select a Term</option>
              <option value='Fall 2019'>Fall 2019</option>
              <option value='Spring 2020'>Spring 2020</option>
            </Input>
            <FormFeedback>{errorList['termError']}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for='courseNumber'>Course Number</Label>
            <Input type='select' name='courseNumber' id='courseNumber' value={courseNumber} onChange={e => setCourseNumber(e.target.value)} disabled={term === ''}>
              <option value=''>Select a Course Number</option>
              {getCourses(term)}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='courseTitle'>Course Title</Label>
            <Input type="text" name="courseTitle" id="courseTitle" placeholder="Course Title" value={courseTitle} onChange={e => setCourseTitle(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for='faculty'>Faculty</Label>
            <Input type="text" name="faculty" id="faculty" placeholder="Faculty Name" value={faculty} onChange={e => setFaculty(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for='librarian'>Librarian</Label>
            <Input type='select' name='librarian' id='librarian' placeholder='Librarian' value={librarian} onChange={e => setLibrarian(e.target.value)}>
              <option value=''>Select a Librarian</option>
              {librarians.map(librarian => {
                return <option key={librarian.id} value={librarian.name}>{librarian.name}</option>
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='coInstructor'>Co-Instructor</Label>
            <Input type="text" name="coInstructor" id="coInstructor" placeholder="Co-Instructor" value={coInstructor} onChange={e => setCoInstructor(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for='date'>Date</Label>
            <Input type="date" name="date" id="date" placeholder="mm/dd/yy" value={date} onChange={e => setDate(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for='startTime'>Start Time</Label>
            <Input type="select" name="startTime" id="startTime" value={startTime} onChange={e => setStartTime(e.target.value)}>
              <option value=''>Make a Selection</option>
              {timeIntervals(8, 20).map(interval => {
                return <option key={interval} value={interval}>{interval}</option>
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='duration'>Duration</Label>
            <Input type="select" name="duration" id="duration" value={duration} onChange={e => setDuration(e.target.value)}>
              <option value=''>Make a Selection</option>
              {setIntervals(5, 75, 5).map(interval => {
                return <option key={interval} value={interval}>{interval}</option>
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="studentCount">Number of Students</Label>
            <Input type="select" name="studentCount" id="studentCount" value={studentCount} onChange={e => setStudentCount(e.target.value)}>
              <option value="0">Make a Selection</option>
              {setIntervals(1, 35, 1).map(interval => {
                return <option key={interval} value={interval}>{interval}</option>
              })}
            </Input>
          </FormGroup>
          <Row form>
            <Col md={12} className='text-right'>
              <Button color="primary" onClick={saveProgress}>Next Step</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default Lesson;