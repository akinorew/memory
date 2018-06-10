import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import rootReducer from './reducers/reducers';

const store = createStore(
	rootReducer,
	applyMiddleware(
		thunk,
		logger,
	),
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.body.appendChild(document.createElement('div')),
);
