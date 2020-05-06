const slugify = function (text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}
// slug => url friendly string 이다. ex)Web Design => web-design
module.exports = { slugify }

//module => node syntax 추후에 gatsby-node에서 사용할 것이기 떄문에 node syntax 사용. gatsby-node는 node에 의해서 run하지
//react ES6로는 작돋하지 않는다.
