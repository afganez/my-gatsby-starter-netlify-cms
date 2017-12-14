import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class IndexPage extends React.Component {
  render() {
    let { allComplexesJson } = this.props.data;
    const complexes = allComplexesJson.edges.map(e => e.node);
    
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return <div>
      {
        complexes.map(complex => <div key={complex.id}>
          <div style={{
            height: '350px',
          }}>
            <Slider {...settings}>
              <div style={{height: '300px'}}><h3>Фото 1</h3></div>
              <div style={{height: '300px'}}><h3>Фото 2</h3></div>
              <div style={{height: '300px'}}><h3>Фото 3</h3></div>
              <div style={{height: '300px'}}><h3>Фото 4</h3></div>
              <div style={{height: '300px'}}><h3>Фото 5</h3></div>
              <div style={{height: '300px'}}><h3>Фото 6</h3></div>
            </Slider>
          </div>
          <div>
            <Link to={`/residential-complex/${complex.id}`}>{complex.name}</Link>
            <p>{complex.address}</p>
            <p>{complex.description}</p>
          </div>
        </div>)
      }
    </div>;
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allComplexesJson {
      edges {
        node {
          ...ComplexDetail_details
          ...HouseDetail_details
          ...FlatDetail_details
        }
      }
    }
  }
`;
