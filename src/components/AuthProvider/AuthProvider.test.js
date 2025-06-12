import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './AuthProvider';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthProvider />, div);
  ReactDOM.unmountComponentAtNode(div);
});