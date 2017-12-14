import React, { Component } from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import FlatDetail from './FlatDetail';

class FlatTemplate extends Component {
  static propTypes = {
    data: PropTypes.shape({
      complexesJson: PropTypes.object.isRequired,
    }),
  }
  
  render() {
    return (
      <FlatDetail
        complex={this.props.data.complexesJson}
        houseId={this.props.pathContext.houseId}
        flatId={this.props.pathContext.flatId} />
    );
  }
}

export default FlatTemplate;

export const pageQuery = graphql`
  query FlatTemplate($id: String!) {
    complexesJson(id: { eq: $id }) {
      ...FlatDetail_details
    }
  }
`;