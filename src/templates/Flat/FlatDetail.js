import React, { Component } from 'react';
import Link from 'gatsby-link';
import find from 'lodash/find';

class FlatDetail extends Component {
  render() {
    debugger;
    const { id:complexId, houses } = this.props.complex;
    const house = find(houses, {id: this.props.houseId});

    if(!house) {
      return null;
    }

    const { flats } = house;

    const flat = find(flats, {id: this.props.flatId});

    if(!flat) {
      return null;
    }
    
    const { floor, isStudio, countRooms, quadrature, price, description } = flat;

    return (
      <div>
        <p>Этаж {flat.floor}</p>
        <p>{flat.isStudio ? 'Студия' : `${flat.countRooms}-комнатная`}</p>
        <p>{flat.quadrature} кв. м.</p>
        <p>{flat.price} рублей</p>
        <p>{flat.description}</p>
      </div>
    );
  }
}

export default FlatDetail;

export const flatDetailFragment = graphql`
fragment FlatDetail_details on ComplexesJson {
  id
  houses {
    id
    flats {
      id
      isStudio
      quadrature
      price
      floor
      countRooms
      description
    }
  }  
}
`