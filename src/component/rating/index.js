import React from 'react';
import PropTypes from 'prop-types';

const Rate = (props) => (
  props.rating.map((obj) => (<i className="fa text-yellow fa-star"></i>))
);

Rate.propTypes = {
  rating: PropTypes.array.isRequired,
};

export default Rate;

export class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating,
    };
  }

  rearrange = (index) => {
    if (this.props.owner) { return; }
    const rating = [];
    for (let c = 0; c < 5; c += 1) {
      rating.push({ className: `fa fa-star ${(c <= index) ? 'text-yellow' : ''} ` });
    }
    this.setState({ rating });
    this.props.rateUser({ rate: (++index), id: this.props.id });  // eslint-disable-line
  };

  render() {
    return (
      <div>
        { this.state.rating.map((obj, index) =>
          (<i role={index.toString()} key={index.toString()} onClick={() => this.rearrange(index)} className={obj.className}></i>))}
      </div>
    );
  }
}

Rating.propTypes = {
  id: PropTypes.string,
  rating: PropTypes.array.isRequired,
  rateUser: PropTypes.func.isRequired,
  owner: PropTypes.bool,
};

Rating.defaultProps = {
  id: '',
  owner: false,
};

