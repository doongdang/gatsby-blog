/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "../styles/index.scss"
import { Row, Col } from "reactstrap"

import Header from "./header"
import Footer from "./Footer"
import Sidebar from "./Sidebar"

const Layout = ({ children, pageTitle }) => {
  useEffect(() => {
    const script = document.createElement("script")

    script.src = "https://kit.fontawesome.com/3054891da6.js"
    script.crossOrigin = "anonymous"
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, []) // react 내에서 script 태그 사용을 위함
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={"container"} id={"content"}>
        <h2>{pageTitle}</h2>
        <Row>
          <Col md="9">{children}</Col>
          <Col md="3">
            <Sidebar />
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
