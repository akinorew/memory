import fetch from 'cross-fetch';

const _ = require('lodash');

export const REQUEST_DECK = 'REQUEST_DECK';
export const RECEIVE_DECK = 'RECEIVE_DECK';
export const REQUEST_CARDS = 'REQUEST_CARDS';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const FLIP = 'FLIP';
export const MATCH = 'MATCH';
export const RESET = 'RESET';

function requestDeck() {
	return {
		type: REQUEST_DECK,
	};
}

function receiveDeck(json) {
	return {
		type: RECEIVE_DECK,
		deck: json,
	};
}

function requestCards(id) {
	return {
		type: REQUEST_CARDS,
		id,
	};
}

function receiveCards(id, json) {
	return {
		type: RECEIVE_CARDS,
		id,
		cards: _.shuffle(json.cards.concat((json.cards))),
	};
}

function fetchCards(deckId) {
	return (dispatch) => {
		dispatch(requestCards(deckId));
		return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
			.then(response => response.json())
			.then(json => dispatch(receiveCards(deckId, json)))
			.then(error => console.log(error));
	};
}

const reset = () => ({
	type: RESET,
});

export function fetchDeck() {
	return (dispatch) => {
		dispatch(reset());
		dispatch(requestDeck());
		return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
			.then(response => response.json())
			.then((json) => {
				dispatch(receiveDeck(json));
				dispatch(fetchCards(json.deck_id));
			})
			.then(error => console.log(error));
	};
}

export const flip = id => ({
	type: FLIP,
	id,
});

export const match = (card, id) => ({
	type: MATCH,
	id,
	card,
});
