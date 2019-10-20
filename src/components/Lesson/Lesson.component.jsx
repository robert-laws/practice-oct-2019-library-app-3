import React, { useState, useEffect } from 'react';

import { Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import courses from '../../data/courses';

const Lesson = () => {
  const [state, setState] = useState({ term: '', courseNumber: '', courseTitle: '', faculty: '' })

  useEffect(() => {
    const updateCourseInfo = courseNumber => {
      const thisCourse = courses.find(course => course.courseNumber === courseNumber);

      if(thisCourse) {
        setState({
          ...state,
          courseTitle: thisCourse.courseTitle,
          faculty: thisCourse.faculty
        })
      }
    }

    updateCourseInfo(courseNumber) 
  }, [state.courseNumber])
  
  

  const handleChange = event => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value
    })
  }

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

  const { term, courseNumber, courseTitle, faculty } = state;

  return (
    <Row>
      <Col>
        <Form>
          <FormGroup>
            <Label for='term'>Term</Label>
            <Input type='select' name='term' id='term' value={term} onChange={handleChange}>
              <option value=''>Select a Term</option>
              <option value='Fall 2019'>Fall 2019</option>
              <option value='Spring 2020'>Spring 2020</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='courseNumber'>Course Number</Label>
            <Input type='select' name='courseNumber' id='courseNumber' value={courseNumber} onChange={handleChange} disabled={term === ''}>
              <option value=''>Select a Course Number</option>
              {getCourses(term)}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='courseTitle'>Course Title</Label>
            <Input type="text" name="courseTitle" id="courseTitle" placeholder="Course Title" value={courseTitle} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for='faculty'>Faculty</Label>
            <Input type="text" name="faculty" id="faculty" placeholder="Faculty Name" value={faculty} onChange={handleChange} />
          </FormGroup>
        </Form>
      </Col>
    </Row>
  )
}

export default Lesson;