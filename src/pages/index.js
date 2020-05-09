import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"
import PaginationLinks from "../components/PaginationLinks"

const IndexPage = () => {
  const postsPerPage = 3

  let numberOfPages

  return (
    <Layout pageTitle={"Code Blog"}>
      <SEO title={"Home"} keywords={[`gatsby`, `application`, `react`]} />
      <StaticQuery
        query={indexQuery}
        render={data => {
          numberOfPages = Math.ceil(
            data.allMarkdownRemark.totalCount / postsPerPage
          )
          return (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <Post
                  key={node.id}
                  id={node.id}
                  title={node.frontmatter.title}
                  author={node.frontmatter.author}
                  slug={node.fields.slug}
                  date={node.frontmatter.date}
                  body={node.excerpt}
                  fluid={node.frontmatter.image.childImageSharp.fluid}
                  tags={node.frontmatter.tags}
                /> // query에서 받아온 data를 render의 인자로 주고 각 data속의 노드들을 Post에 넣어서 표현한다.
              ))}

              <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
            </div>
          )
        }}
      />
    </Layout>
  )
}
const indexQuery = graphql`
  query MyQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMM Do YYYY")
            author
            title
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
` // localhost:8000___graphql에서 불러옴. 그중에서도 frontmatter.date를 내림차순으로 정렬한다.

export default IndexPage
