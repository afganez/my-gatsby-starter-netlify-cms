import React, { Component } from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import ComplexDetail from './ComplexDetail.js';

class ComplexTemplate extends Component {
  static propTypes = {
    data: PropTypes.shape({
      complexesJson: PropTypes.object.isRequired,
    }),
  }
  static contextTypes = {
    setComplexes: PropTypes.func,
  }

  render() {
    return <ComplexDetail complex={this.props.data.complexesJson} />
  }
}

export default ComplexTemplate;

export const pageQuery = graphql`
  query ResidentialComplex($id: String!) {
    complexesJson(id: { eq: $id }) {
      ...ComplexDetail_details
      houses {
        id
        address
        name
      }
    }
  }
`;