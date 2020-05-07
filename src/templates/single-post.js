import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { Card, CardBody, CardSubtitle, Badge } from "reactstrap"
import Img from "gatsby-image"
import { slugify } from "../util/utilityFunctions"
import { DiscussionEmbed } from "disqus-react"

const SinglePost = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter

  const baseUrl = "https://example.co.kr/"
  const disqusShortname = "code-blog-9"
  const disqusConfig = {
    identifier: data.markdownRemark.id,
    title: post.title,
    url: baseUrl + pageContext.slug,
  } // comment관련 설정

  return (
    <Layout pageTitle={post.title}>
      <SEO title={post.title} />
      <Card>
        <Img
          className={"card-image-top"}
          fluid={post.image.childImageSharp.fluid}
        />
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.date}</span> by{" "}
            <span className="text-info">{post.author}</span>
          </CardSubtitle>
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          <ul className="post-tags">
            {post.tags.map(tag => (
              <li key={tag}>
                <Link to={`/tag${slugify(tag)}`}>
                  <Badge color={"info"} className={"text-uppercase"}>
                    {tag}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      {/*comment 추가 */}
    </Layout>
  )
}

export const postQuery = graphql`
  query blogPost($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        date(formatString: "MMM Do YYY")
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default SinglePost
