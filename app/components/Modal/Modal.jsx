import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

class Modal extends React.Component {
	static propTypes = {
		onClose: PropTypes.func.isRequired,
		show: PropTypes.bool.isRequired,
		onSave: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
		};

		this.onSave = this.onSave.bind(this);
	}

	onSave() {
		this.props.onSave(this.state.inputValue);
	}

	updateInputValue(event) {
		this.setState({
			inputValue: event.target.value,
		});
	}

	render() {
		if (!this.props.show) {
			return null;
		}

		return (
			<div className="backdrop">
				<div className="modal">
					<div className="modal__content">
						<h1>SUCCESS!</h1>
						<span>Type your name:</span>
						<input value={this.state.inputValue} onChange={event => this.updateInputValue(event)} />
					</div>
					<div className="modal__footer">
						<button onClick={this.props.onClose}>
							Close
						</button>
						<button onClick={this.onSave}>
							Save
						</button>
					</div>
				</div>
			</div>
		);
	}
}


export default Modal;
