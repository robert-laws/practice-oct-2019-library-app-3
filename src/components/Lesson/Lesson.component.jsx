import React, { useState, useEffect } from 'react';

import { Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import courses from '../../data/courses';

const Lesson = () => {
  const [term, setTerm] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [faculty, setFaculty] = useState('');

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

  return (
    <Row>
      <Col>
        <Form>
          <FormGroup>
            <Label for='term'>Term</Label>
            <Input type='select' name='term' id='term' value={term} onChange={(e) => setTerm(e.target.value)}>
              <option value=''>Select a Term</option>
              <option value='Fall 2019'>Fall 2019</option>
              <option value='Spring 2020'>Spring 2020</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='courseNumber'>Course Number</Label>
            <Input type='select' name='courseNumber' id='courseNumber' value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)} disabled={term === ''}>
              <option value=''>Select a Course Number</option>
              {getCourses(term)}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for='courseTitle'>Course Title</Label>
            <Input type="text" name="courseTitle" id="courseTitle" placeholder="Course Title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for='faculty'>Faculty</Label>
            <Input type="text" name="faculty" id="faculty" placeholder="Faculty Name" value={faculty} onChange={(e) => setFaculty(e.target.value)} />
          </FormGroup>
        </Form>
      </Col>
    </Row>
  )
}

export default Lesson;