const path = require('path');
const each = require('lodash/each');
const slug = require(`slug`);
const slash = require(`slash`);

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const mark = graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            excerpt(pruneLength: 400)
            html
            id
            frontmatter {
              templateKey
              path
              date
              title
              image
              heading
              description
              intro {
                blurbs {
                  image
                  text
                }
                heading
                description
              }
              main {
                heading
                description
                image1 {
                  alt
                  image
                }
                image2 {
                  alt
                  image
                }
                image3 {
                  alt
                  image
                }
              }
              testimonials {
                author
                quote
              }
              full_image
              pricing {
                heading
                description
                plans {
                  description
                  items
                  plan
                  price
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.js`),
        context: {} // additional data can be passed via context
      });
    });
  });

  const compl = graphql(
    `
      {
        allComplexesJson(limit: 1000) {
          edges {
            node {
              id
              houses {
                id
                flats {
                  id
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      reject(new Error(result.errors));
    }
    const residentialСomplexTemplate = path.resolve(`src/templates/ResidentialСomplex/index.jsx`);

    const houseTemplate = path.resolve(`src/templates/House/index.jsx`);

    const flatTemplate = path.resolve(`src/templates/Flat/index.jsx`);

    each(result.data.allComplexesJson.edges, (edge) => {
      if(edge.node.id) {
        createPage({
          path: `/residential-complex/${slug(edge.node.id)}`,
          component: slash(residentialСomplexTemplate),
          context: {
            id: edge.node.id,
          }
        });

        const houses = edge.node.houses;
        each(houses, house => {
          if(house.id) {
            createPage({
              path: `/residential-complex/${slug(edge.node.id)}/house/${house.id}`,
              component: slash(houseTemplate),
              context: {
                id: edge.node.id,
                houseId: house.id
              }
            });

            const flats = house.flats;

            console.log('flats', flats);

            each(flats, flat => {
              console.log('flat ', flat);
              if(flat.id) {
                createPage({
                  path: `/residential-complex/${slug(edge.node.id)}/house/${house.id}/flat/${flat.id}`,
                  component: slash(flatTemplate),
                  context: {
                    id: edge.node.id,
                    houseId: house.id,
                    flatId: flat.id
                  }
                });
              }
            })
          }
        });
      }          
    });
    return;
  });

  return Promise.all([mark, compl]);
};
