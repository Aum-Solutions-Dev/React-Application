import React from 'react';
import ReactDOM from 'react-dom';
import Developer from './Developer';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Developer />, div);
  ReactDOM.unmountComponentAtNode(div);
});