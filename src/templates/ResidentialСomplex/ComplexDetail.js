import React, { Component } from 'react';
import Link from 'gatsby-link';

class ComplexDetail extends Component {
  render() {
    const { id, name, address, desciption, houses } = this.props.complex;
    console.log(this.props.complex);
    return (
      <div>
        <h1>{name}</h1>
        <p>{address}</p>
        <p>{desciption}</p>
        {
          houses && houses.map(house => <div key={house.id}>
            <Link to={`/residential-complex/${id}/house/${house.id}`}><p>{house.name}</p></Link>
            <p>{house.address}</p>
          </div>)
        }
      </div>
    );
  }
}

export default ComplexDetail;

export const complexDetailFragment = graphql`
fragment ComplexDetail_details on ComplexesJson {
  id
  name
  address
  desciption
  houses {
    id
    name
    address
  }
}
`