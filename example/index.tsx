import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Tree } from '../src';
import { MOCK_DATA } from '../mock';

const App = () => {
  return (
    <div>
      <Tree nodes={MOCK_DATA} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
