import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Card from './../Card/Card';
import {
	fetchDeck,
	flip,
	match,
} from '../../actions/actions';

require('./App.css');

class App extends React.Component {
	static propTypes = {
		cardId: PropTypes.number.isRequired,
		cards: PropTypes.arrayOf().isRequired,
		fetchDeck: PropTypes.func.isRequired,
		flip: PropTypes.func.isRequired,
		id: PropTypes.number.isRequired,
		match: PropTypes.func.isRequired,
		turns: PropTypes.number.isRequired,
		matched: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this.props.fetchDeck();
	}

	componentWillReceiveProps(nextProps) {
		if (this.state && this.state.checking) {
			if (nextProps.matched === 'matched') {
				console.log('success');
			} else if (nextProps.matched === 'fail') {
				setTimeout(() => {
					this.setState({
						checking: false,
					});
					this.props.flip(this.props.id);
					this.props.flip(this.props.cardId);
				}, 1000);
			}
		}
	}

	onClick(id, card) {
		this.props.flip(id);
		this.props.match(card, id);

		this.setState({
			checking: true,
		});
	}

	render() {
		const { cards, turns, matched } = this.props;

		return (
			<div>
				<div>Matched {matched}</div>
				{cards.isLoading && <h2>Loading...</h2>}
				{!cards.isLoading &&
				<div>
					<button>Play / Shuffle</button>
					<span>Turns so far: {turns}</span>
					<div className="deck">
						{cards.cards.map((card, index) => (
							<Card
								id={index}
								{...card}
								image={card.image}
								flipped={card.flipped}
								onClick={() => this.onClick(index, card)}
							/>
						))}
					</div>
				</div>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		deck: state.deck,
		cards: state.cards,
		turns: state.match.turns,
		matched: state.match.matched,
		id: state.match.id,
		cardId: state.match.cardId,
		pair: state.match.pair,
	};
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		fetchDeck: () => dispatch(fetchDeck()),
		flip: id => dispatch(flip(id)),
		match: (card, id) => dispatch(match(card, id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
