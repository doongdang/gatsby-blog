import React from "react"
import { Card, CardTitle, CardBody } from "reactstrap"
import { graphql, StaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
const Sidebar = () => (
  <div>
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase mb-3">
          recent posts
        </CardTitle>
        <StaticQuery
          query={sidebarQuery}
          render={data => (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <Card key={node.id}>
                  <Link to={node.fields.slug}>
                    <Img
                      className={"card-image-top"}
                      fluid={node.frontmatter.image.childImageSharp.fluid}
                    />
                  </Link>
                  <CardBody>
                    <CardTitle>
                      <Link to={node.fields.slug}>
                        {node.frontmatter.title}
                      </Link>
                    </CardTitle>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        />
      </CardBody>
    </Card>
  </div>
)

const sidebarQuery = graphql`
  query sideQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Sidebar
