import React from 'react';
import PropTypes from 'prop-types';

const Rate = (props) => (
  props.rating.map((obj) => (<i className="fa text-yellow fa-star"></i>))
);

Rate.propTypes = {
  rating: PropTypes.array.isRequired,
};

export default Rate;
