import React from "react"
import Layout from "../components/layout"
import Post from "../components/Post"
import { graphql } from "gatsby"
import TagPaginationLinks from "../components/TagPaginationLinks"

const tagPostList = props => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage, numberOfPages, tag } = props.pageContext
  const { totalCount } = props.data.allMarkdownRemark
  const pageHeader = `${totalCount} Post${
    totalCount === 1 ? "" : "s"
  } Tagged With "${tag}"`

  return (
    <Layout pageTitle={pageHeader}>
      {posts.map(({ node }) => (
        <Post
          key={node.id}
          slug={node.fields.slug}
          title={node.frontmatter.title}
          author={node.frontmatter.author}
          date={node.frontmatter.date}
          body={node.excerpt}
          tags={node.frontmatter.tags}
          fluid={node.frontmatter.image.childImageSharp.fluid}
        />
      ))}
      <TagPaginationLinks
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        tag={tag}
      />
    </Layout>
  )
}

export const tagPostListQuery = graphql`
  query tagPostListQuery($skip: Int!, $limit: Int!, $tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 650, maxHeight: 371) {
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
`

export default tagPostList
