import React from 'react';
import ReactDOM from 'react-dom';
import TeamLeader from './TeamLeader';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TeamLeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});