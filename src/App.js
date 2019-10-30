import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Lesson from './components/Lesson/Lesson.component';
import LessonStepTwo from './components/Lesson.StepTwo/Lesson.StepTwo.component.jsx';

import { Container } from 'reactstrap';

import './App.scss';

function App() {
  return (
    <Container className='mt-3'>
      <h3>Library App 3</h3>
      <hr />
      <Link to='/lesson'>Create a Lesson</Link>
      <hr />
      
      <Switch>
        <Route path='/lesson' component={Lesson} />
        <Route path='/lesson-step-two' component={LessonStepTwo} />
      </Switch>

    </Container>
  );
}

export default App;
