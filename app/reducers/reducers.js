import { combineReducers } from 'redux';
import { RECEIVE_CARDS, RECEIVE_DECK, REQUEST_CARDS, REQUEST_DECK, FLIP } from '../actions/actions';

function deck(
	state = {
		isLoadingDeck: true,
	},
	action,
) {
	switch (action.type) {
		case REQUEST_DECK:
			return Object.assign({}, state, {
				isLoadingDeck: true,
			});
		case RECEIVE_DECK:
			return Object.assign({}, state, {
				isLoadingDeck: false,
				deck: action.deck,
			});
		default:
			return state;
	}
}

function cards(
	state = {
		isLoading: true,
		cards: [],
	},
	action,
) {
	switch (action.type) {
		case REQUEST_CARDS:
			return Object.assign({}, state, {
				isLoading: true,
			});
		case RECEIVE_CARDS:
			return Object.assign({}, state, {
				isLoading: false,
				cards: action.cards,
			});
		default:
			return state;
	}
}

function flip(
	state = {
		flipped: false,
	},
	action,
) {
	switch (action.type) {
		case FLIP:
			return Object.assign({}, state, {
				flipped: true,
			});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	deck,
	cards,
	flip,
});

export default rootReducer;
