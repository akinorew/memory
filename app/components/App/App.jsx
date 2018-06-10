import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Card from './../Card/Card';
import {
	fetchDeck,
	flip,
} from '../../actions/actions';

require('./App.css');

class App extends React.Component {
	static propTypes = {
		cards: PropTypes.arrayOf().isRequired,
		fetchDeck: PropTypes.func.isRequired,
		flip: PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.fetchDeck();
	}

	render() {
		const { cards } = this.props;

		return (
			<div>
				{cards.isLoading && <h2>Loading...</h2>}
				{!cards.isLoading &&
				<div className="deck">
					{cards.cards.map((card, index) => (
						<Card id={index} {...card} onClick={() => this.props.flip(index)} />
					))}
				</div>}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		deck: state.deck,
		cards: state.cards,
	};
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		fetchDeck: () => dispatch(fetchDeck()),
		flip: id => dispatch(flip(id)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
