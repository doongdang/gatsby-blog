import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Post from "../components/Post"
import TagPaginationLinks from "../components/TagPaginationLinks"
import SEO from "../components/seo"

const tagPosts = ({ data, pageContext }) => {
  const { tag } = pageContext
  let numberOfPages
  const postsPerPage = 3
  const { totalCount } = data.allMarkdownRemark
  const pageHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  numberOfPages = Math.ceil(data.allMarkdownRemark.totalCount / postsPerPage)
  return (
    <Layout pageTitle={pageHeader}>
      <SEO title={`${tag} Tag`} keywords={[`gatsby`, `application`, `react`]} />
      {data.allMarkdownRemark.edges.map(({ node }) => (
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
        currentPage={1}
        numberOfPages={numberOfPages}
        tag={tag}
      />
    </Layout>
  )
}

export const tagQuery = graphql`
  query tagPostsQuery($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
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
export default tagPosts
