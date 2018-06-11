import { combineReducers } from 'redux';
import { RECEIVE_CARDS, RECEIVE_DECK, REQUEST_CARDS, REQUEST_DECK, FLIP, MATCH, RESET } from '../actions/actions';

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
		turns: 0,
		matched: false,
		pair: false,
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
		case FLIP:
			return Object.assign({}, state, {
				cards: state.cards.map((card, index) => {
					if (index === action.id) {
						return Object.assign({}, card, {
							flipped: !card.flipped,
						});
					}
					return card;
				}),
			});
		default:
			return state;
	}
}
function match(
	state = {
		cards: [],
		turns: 0,
		matched: false,
		pair: false,
		score: 0,
	},
	action,
) {
	switch (action.type) {
		case RECEIVE_CARDS:
			return Object.assign({}, state, {
				isLoading: false,
				cards: action.cards,
			});
		case MATCH: {
			let newState;
			if (state.pair) {
				if (state.cards[state.cardId].code === state.cards[action.id].code) {
					newState = Object.assign({}, state, {
						id: action.id,
						cardId: state.cardId,
						matched: 'matched',
						turns: state.turns + 1,
						pair: false,
						score: state.score + 1,
					});
				} else {
					newState = Object.assign({}, state, {
						id: action.id,
						cardId: state.cardId,
						matched: 'fail',
						turns: state.turns + 1,
						pair: false,
					});
				}
			} else {
				newState = Object.assign({}, state, {
					cardId: action.id,
					pair: true,
				});
			}
			return newState;
		}
		case RESET:
			return Object.assign({}, state, {
				cardId: null,
				cards: [],
				id: null,
				turns: 0,
				matched: false,
				pair: false,
				score: 0,
			});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	deck,
	cards,
	match,
});

export default rootReducer;
