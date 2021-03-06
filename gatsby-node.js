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
    tagPosts: path.resolve("src/templates/tags-posts.js"),
    postList: path.resolve("src/templates/post-list.js"),
    tagPostList: path.resolve("src/templates/tagPost-list.js"),
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

    // tasPost페이지 => 각 태그별 게시물 보여주는 페이지 만들기
    tags.forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: templates.tagPosts,
        context: {
          tag,
        },
      })
    })

    //홈에서  한페이지에 몇개의 게시글 보여줄지 정하는 부분

    const postsPerPage = 3
    const numberOfPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numberOfPages }).forEach((_, index) => {
      const isFirstPage = index === 0
      const currentPage = index + 1

      if (isFirstPage) return

      createPage({
        path: `/page/${currentPage}`,
        component: templates.postList,
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          currentPage,
          numberOfPages,
        },
      })
      tags.forEach(tag => {
        createPage({
          path: `/tag/${slugify(tag)}/page/${currentPage}`,
          component: templates.tagPostList,
          context: {
            limit: postsPerPage,
            skip: index * postsPerPage,
            currentPage,
            numberOfPages,
            tag,
          },
        })
      })
    })
  })
}
