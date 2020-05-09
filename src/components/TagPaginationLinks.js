import React from "react"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"

const TagPaginationLinks = ({ currentPage, numberOfPages, tag }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numberOfPages
  const previousPage =
    currentPage - 1 === 1
      ? `/tag/${tag}`
      : `/tag/${tag}/page/` + (currentPage - 1).toString()
  const nextPage = `/tag/${tag}/page/` + (currentPage + 1).toString()

  return (
    <Pagination aria-label="Page navigation example">
      {isFirst ? (
        <PaginationItem disabled>
          <PaginationLink previous href={"/"}></PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink previous href={previousPage}></PaginationLink>
        </PaginationItem>
      )}
      {Array.from({ length: numberOfPages }, (_, i) =>
        currentPage === i + 1 ? (
          <PaginationItem active key={`page-number${i + 1}`}>
            <PaginationLink
              href={`/tag/${tag}/${i === 0 ? "" : "page/" + (i + 1)}`}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={`page-number${i + 1}`}>
            <PaginationLink
              href={`/tag/${tag}/${i === 0 ? "" : "page/" + (i + 1)}`}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        )
      )}
      {isLast ? (
        <PaginationItem disabled>
          <PaginationLink next href={nextPage}></PaginationLink>
        </PaginationItem>
      ) : (
        <PaginationItem>
          <PaginationLink next href={nextPage}></PaginationLink>
        </PaginationItem>
      )}
    </Pagination>
  )
}

export default TagPaginationLinks
