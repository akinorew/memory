import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import './Card.scss';

class Card extends React.Component {
	static propTypes = {
		flipped: PropTypes.bool.isRequired,
		image: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	render() {
		return (
			<div role="button" onKeyPress={this.onClick} onClick={event => this.props.onClick(this.props, event)} className={this.props.flipped ? 'card card--flipped' : 'card'} tabIndex={0} >
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

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Card);
