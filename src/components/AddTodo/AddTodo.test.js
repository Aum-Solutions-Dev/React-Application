import React from 'react';
import ReactDOM from 'react-dom';
import AddTodo from './AddTodo';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddTodo />, div);
  ReactDOM.unmountComponentAtNode(div);
});