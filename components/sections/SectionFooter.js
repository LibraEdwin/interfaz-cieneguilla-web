import React from 'react'
import PropTypes from 'prop-types'

const SectionFooter = props => {
  const {
    title,
    bg = 'var(--second-color)',
    padding = {
      xs: 1,
      md: 3
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
          padding: ${padding.xs}rem 0;
        }

        .section__title {
          text-align: center;
          display: block;
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
        }

        .container {
          padding: 0;
        }

        @media screen and (min-width: 720px) {
          .section__title {
            text-align: start;
            font-size: 14px;
          }
        }

        @media screen and (min-width: 960px) {
          .section {
            padding: 0;
          }

          .section__title {
            text-align: start;
            font-size: 14px;
          }
        }

      `}</style>
    </>
  )
}

SectionFooter.propTypes = {
  title: PropTypes.string.isRequired,
  bg: PropTypes.string,
  padding: PropTypes.object,
  children: PropTypes.node
}

export default SectionFooter
