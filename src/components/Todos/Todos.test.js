import React from 'react';
import ReactDOM from 'react-dom';
import Todos from './Todositems';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Todos />, div);
  ReactDOM.unmountComponentAtNode(div);
});