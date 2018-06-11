import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

const Modal = (props) => {
	if (!props.show) {
		return null;
	}

	return (
		<div className="backdrop">
			<div className="modal">
				<div className="modal__content">
					<h1>SUCCESS!</h1>
					<span>Type your name:</span>
					<input />
				</div>
				<div className="modal__footer">
					<button onClick={props.onClose}>
						Close
					</button>
					<button onClick={props.onClose}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
};


export default Modal;
