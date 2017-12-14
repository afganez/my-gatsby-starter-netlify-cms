import React, { Component } from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import HouseDetail from '../../components/HouseDetail';

class HouseTemplate extends Component {
  static propTypes = {
    data: PropTypes.shape({
      complexesJson: PropTypes.object.isRequired,
    }),
  }
  
  render() {
    return <HouseDetail complex={this.props.data.complexesJson} houseId={this.props.pathContext.houseId} />
  }
}

export default HouseTemplate;

export const pageQuery = graphql`
  query HouseTemplate($id: String!) {
    complexesJson(id: { eq: $id }) {
      ...HouseDetail_details
    }
  }
`;