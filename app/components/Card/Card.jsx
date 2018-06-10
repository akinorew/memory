import PropTypes from 'prop-types';
import React from 'react';
import './Card.scss';

class Card extends React.Component {
	static propTypes = {
		image: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);

		this.state = {
			flipped: false,
		};
	}

	onClick(event) {
		event.stopPropagation();
		this.setState({
			flipped: true,
		});
	}

	render() {
		return (
			<div role="button" onKeyPress={this.onClick} onClick={this.onClick} className={this.state.flipped ? 'card card--flipped' : 'card'} tabIndex={0} >
				<div className="card__flipper">
					<div className="front" />
					<div className="back">
						<img alt="" src={this.props.image} />
					</div>
				</div>
			</div>
		);
	}
}

export default Card;
