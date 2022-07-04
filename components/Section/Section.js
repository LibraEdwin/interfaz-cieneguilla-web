import React from 'react'
import PropTypes from 'prop-types'

const Section = props => {
  const {
    title,
    titleMarginBottom = {
      xs: 36
    },
    align = {
      xs: 'left',
      md: 'center'
    },
    bg = '#fff',
    padding = {
      xs: '0',
      md: '0'
    },
    children
  } = props

  return (
    <>
      <section className="section">
        <div className="container">
          <h2 className="section__title">{title}</h2>
          {children}
        </div>
      </section>

      <style jsx>{/* css */`
        .section {
          background-color: ${bg};
          padding: ${padding.xs};
        }

        .section__title {
          text-align: ${align.xs};
          display: block;
          margin-top: 0;
          margin-bottom: ${titleMarginBottom.xs}px;
          font-size: 24px;
          font-weight: 700;
          // text-decoration: underline;
          color: var(--fourth-color);
          text-transform: uppercase;
        }

        @media screen and (min-width: 567px) {
          .section {
            padding: ${padding.sm || padding.xs};
          }

          .section__title {
            text-align: ${align.sm || align.xs};
            margin-bottom: ${titleMarginBottom.sm || titleMarginBottom.xs}px;
          }
        }

        @media screen and (min-width: 760px) {
          .section {
            padding: ${padding.md || padding.sm || padding.xs};
          }

          .section__title {
            margin-bottom: ${titleMarginBottom.md || titleMarginBottom.sm || titleMarginBottom.xs}px;
          }
        }
      `}</style>
    </>
  )
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  titleMarginBottom: PropTypes.object,
  align: PropTypes.object,
  bg: PropTypes.string,
  padding: PropTypes.object,
  children: PropTypes.node
}

export default Section
