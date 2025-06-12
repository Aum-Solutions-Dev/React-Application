import React from 'react';
import ReactDOM from 'react-dom';
import Joke from './Joke';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Joke />, div);
  ReactDOM.unmountComponentAtNode(div);
});