import React, { Component } from 'react';
import Link from 'gatsby-link';
import find from 'lodash/find';

class HouseDetail extends Component {
  render() {
    
    const { id:complexId, houses } = this.props.complex;
    const house = find(houses, {id: this.props.houseId});
    if(!house) {
      return null;
    }
    const { id, name, address, flats } = house;
    return (
      <div>
        <h1>{name}</h1>
        <p>{address}</p>
        {
          flats && flats.map(flat => <div key={flat.id}>
            <Link to={`/residential-complex/${complexId}/house/${id}/flat/${flat.id}`}>Перейти</Link>
            <p>Этаж {flat.floor}</p>
            <p>{flat.isStudio ? 'Студия' : `${flat.countRooms}-комнатная`}</p>
            <p>{flat.quadrature} кв. м.</p>
            <p>от {flat.price} рублей</p>
          </div>)
        }
      </div>
    );
  }
}

export default HouseDetail;

export const houseDetailFragment = graphql`
fragment HouseDetail_details on ComplexesJson {
  id
  houses {
    id
    name
    address
    flats {
      id
      isStudio
      quadrature
      price
      floor
      countRooms
    }
  }  
}
`