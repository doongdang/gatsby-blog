/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const { slugify } = require("./src/util/utilityFunctions")
const path = require("path")
const _ = require("lodash")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: "/" + slugFromTitle,
    })
  }
} // node.internal.type이 마크다운 형식일 경우 slugify 함수를 통해서 title을 url친화적으로 변경한후 새로은 필드를 만들어 집어넣는다

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const templates = {
    singlePost: path.resolve("src/templates/single-post.js"),
    tagsPage: path.resolve("src/templates/tags-page.js"),
  }

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }
    const posts = res.data.allMarkdownRemark.edges
    //Create Single  post pages
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          //slug값을 넘겨준다. post를 가져오기 위한 template
          slug: node.fields.slug,
        },
      })
    })

    //Get all tag 다시보기 아직 이해못함

    let tags = []
    _.each(posts, edges => {
      if (_.get(edges, "node.frontmatter.tags")) {
        //=> edges가 node.frontmatter.tags의 값을 가지고 있다면 실행
        tags = tags.concat(edges.node.frontmatter.tags) //
      }
    })

    let tagPostCounts = {}
    tags.forEach(tag => {
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
    })

    tags = _.uniq(tags)

    //tag페이지 만들기 요것도 이해못ㄱ함
    createPage({
      path: `/tags`,
      component: templates.tagsPage,
      context: {
        tags,
        tagPostCounts,
      },
    })
  })
}
