import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';
import Card from './../Card/Card';
import {
	fetchDeck,
	flip,
	match,
	save,
} from '../../actions/actions';
import Modal from '../Modal/Modal';

require('./App.scss');

class App extends React.Component {
	static propTypes = {
		cardId: PropTypes.number.isRequired,
		cards: PropTypes.arrayOf().isRequired,
		deck: PropTypes.objectOf().isRequired,
		fetchDeck: PropTypes.func.isRequired,
		flip: PropTypes.func.isRequired,
		id: PropTypes.number.isRequired,
		match: PropTypes.func.isRequired,
		turns: PropTypes.number.isRequired,
		matched: PropTypes.string.isRequired,
		save: PropTypes.func.isRequired,
		score: PropTypes.number.isRequired,
		success: PropTypes.bool.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			locked: false,
		};

		this.onClick = this.onClick.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.play = this.play.bind(this);
		this.save = this.save.bind(this);
	}

	componentDidMount() {
		this.props.fetchDeck();
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.deck.isLoadingDeck && !nextProps.deck.isLoadingDeck &&
			!this.props.cards.isLoading && !nextProps.cards.isLoading) {
			if (nextProps.score === this.props.cards.cards.length / 2) {
				this.setState({
					success: true,
				});
			}

			if (this.state && this.state.checking) {
				this.setState({
					locked: true,
				});
				if (nextProps.matched === 'matched') {
					this.setState({
						locked: false,
					});
				} else if (nextProps.matched === 'fail') {
					setTimeout(() => {
						this.setState({
							checking: false,
						});
						this.props.flip(this.props.id);
						this.props.flip(this.props.cardId);

						this.setState({
							locked: false,
						});
					}, 1000);
				}
			}
		}
	}

	onClick(id, card) {
		if (!this.state.locked) {
			this.props.flip(id);
			this.props.match(card, id);

			this.setState({
				checking: true,
			});
		}
	}

	closeModal() {
		this.setState({
			locked: true,
			success: false,
		});
	}

	play() {
		this.setState({
			checking: false,
			locked: false,
		});

		this.props.fetchDeck();
	}

	save(name) {
		this.props.save(name, this.props.turns);
	}

	render() {
		const { cards, turns } = this.props;

		return (
			<div>
				<div className="game">
					{cards.isLoading && <h2>Loading...</h2>}
					{!cards.isLoading &&
					<div>
						<div className="game__header">
							<button onClick={() => this.play()}>Play / Shuffle</button>
							<span className="game__turns">Turns so far: {turns}</span>
						</div>
						<div className="game__deck">
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
				<div className="outlet">
					<Modal show={this.state.success} onClose={this.closeModal} onSave={this.save} />
				</div>
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
		score: state.match.score,
	};
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		fetchDeck: () => dispatch(fetchDeck()),
		flip: id => dispatch(flip(id)),
		match: (card, id) => dispatch(match(card, id)),
		save: (name, score) => dispatch(save(name, score)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
