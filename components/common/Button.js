import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const Button = props => {
  const {
    loading,
    label,
    width,
    font,
    textTransform = 'uppercase',
    className,
    to = '',
    height = 40,
    variant = 'defualt',
    color = 'var(--main-color)',
    ...rest
  } = props

  const handleVariationButton = () => {
    switch (variant) {
      // case 'inputBtn':
      // return 'button--input'
      case 'outline':
        return 'button--outline'
      case 'default':
      default:
        return 'button'
    }
  }

  return (
    <>
      {
        to && to !== ''
          ? <Link href={to}>
            <a href=""
              className={`${className} ${handleVariationButton()}${loading ? ' loading' : ''}`}
              {...rest}
            >
              {label}
            </a>
          </Link>
          : <button
            className={`${className} ${handleVariationButton()}${loading ? ' loading' : ''}`}
            {...rest}
          >
            {label}
          </button>
      }

      <style jsx>{`
        .button,
        .button--outline {
          background-color: ${color};
          border: 1px solid ${color};
          color: #fff;
          // font-size: 15px;
          font-size: ${font};
          padding: 0 1rem;
          // text-transform: uppercase;
          text-transform: ${textTransform};
          border-radius: 8px;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          cursor: pointer;
          font-weight: bold;
          width: ${typeof width === 'object' ? `${width.xs}px` : width ? `${width}px` : '100%'};
          height: ${typeof height === 'object' ? height.xs : height}px;
          white-space: nowrap;
        }

        button:disabled {
          background: var(--gray-color);
          color: var(--fifth-color);
          border:0;
          cursor: no-drop;
        }

        .button--outline {
          background-color: #fff;
          color: ${color};
        }

        .button--outline:hover {
          background-color: ${color};
          color: #fff;
          transition: background-color .4s ease-in-out;
        }

        .button--input {
          background: var(--gray-color);

        }

        .loading {
          opacity: 0.5;
        }
        @keyframes spin {
          50% {
            transform: rotate(180deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }
        .loading::before {
          content: '';
          border-top: 4px solid white;
          border-right: 4px solid white;
          border-bottom: 4px solid white;
          border-left: 4px solid rgba(255,255,255,0.5);
          display: block;
          border-radius: 50%;
          padding: 0.4rem;
          margin-right: 0.5rem;
          animation: spin 0.75s infinite linear;
        }

        @media screen and (min-width: 576px) {
          .button,
          .button--outline {
            // font-size: 16px;
            height: ${typeof height === 'object' ? height.sm : height}px;
            width: ${typeof width === 'object' ? `${width.sm}px` : width ? `${width}px` : '100%'};
          }
        }

        @media screen and (min-width: 768px) {
          .button,
          .button--outline {
            height: ${typeof height === 'object' ? height.md || height.sm : height}px;
            width: ${typeof width === 'object' ? `${width.md}px` || `${width.sm}px` : width ? `${width}px` : '100%'};
          }
        }

        @media screen and (min-width: 992px) {
          .button,
          .button--outline {
            height: ${typeof height === 'object' ? height.lg || height.md || height.sm : height}px;
            width: ${typeof width === 'object' ? `${width.lg}px` || `${width.md}px` : width ? `${width}px` : '100%'};
          }
        }
      `}</style>
    </>
  )
}

Button.propTypes = {
  textTransform: PropTypes.string,
  font: PropTypes.string,
  // label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  to: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  color: PropTypes.any,
  loading: PropTypes.bool
}

export default Button
