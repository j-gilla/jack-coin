import React from 'react';
import ReactDOM from 'react-dom';
import Blockchain from './Blockchain';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Blockchain />, document.getElementById('root'));
registerServiceWorker();
