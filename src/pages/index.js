import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class IndexPage extends React.Component {
  handleScriptLoad() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    let { allComplexesJson } = this.props.data;
    const complexes = allComplexesJson.edges.map(e => e.node);
    console.log(complexes);
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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
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
