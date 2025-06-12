import React from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './TodoItem';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TodoItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});