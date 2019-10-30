import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateLessonField, updateLessonFieldArray } from '../../redux/lesson/lesson.actions';

import { Row, Col } from 'reactstrap';
import { Form, FormGroup, FormFeedback, Label, Input, Button, Alert } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

const LessonStepTwo = props => {
  const [learningOutcome, setLearningOutcome] = useState('');
  const { onUpdateLessonField, onUpdateLessonFieldArray, classAssignment, learningOutcomes } = props;

  const handleAddLearningOutcome = event => {
    onUpdateLessonFieldArray('learningOutcomes', learningOutcome);
    setLearningOutcome('');
  }

  return (
    <Row>
      <Col>
        <Form id='form-step-two'>
          <FormGroup>
            <Label for='classAssignment'>Class Assignment</Label>
            <Input type='textarea' name='classAssignment' id='ClassAssignment' value={classAssignment} onChange={(event) => onUpdateLessonField(event.target.name, event.target.value)} />
            <FormFeedback>Please enter a class assignment</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Col md={10}>
              <Label for='learningOutcomes'>Learning Outcomes</Label>
              <Input type='text' name='learningOutcomes' value={learningOutcome} onChange={e => setLearningOutcome(e.target.value)} />
            </Col>
            <Col md={2}>
              <Button id='addLearningOutcome' onClick={handleAddLearningOutcome}>Add Outcome</Button>
            </Col>
            <Col md={12}>
              <ListGroup>
                {learningOutcomes.map((outcome, index) => {
                  return <ListGroupItem key={index}>{outcome}</ListGroupItem>
                })}
              </ListGroup>
            </Col>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  )
}

const mapStateToProps = state => {
  return {
    classAssignment: state.lesson.classAssignment,
    learningOutcomes: state.lesson.learningOutcomes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateLessonField: (name, value) => dispatch(updateLessonField(name, value)),
    onUpdateLessonFieldArray: (name, value) => dispatch(updateLessonFieldArray(name, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonStepTwo);