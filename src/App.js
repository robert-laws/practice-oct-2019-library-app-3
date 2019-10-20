import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Lesson from './components/Lesson/Lesson.component';

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
      </Switch>

    </Container>
  );
}

export default App;
