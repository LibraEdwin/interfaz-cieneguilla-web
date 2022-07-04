import React from 'react'
import PropTypes from 'prop-types'
import IconArrowBottom from '@/components/icons/arrow-bottom-icon.svg'

const Input = React.forwardRef(function (props, ref) {
  const {
    icon,
    bg,
    font,
    colorPlace = 'var(--fourth-color)',
    colorInput = 'var(--fourth-color)',
    fontWeight = 'bold',
    width = '100%',
    height = 40,
    paddingBottom,
    iconMarginRight = 45,
    label,
    arrow = false,
    error,
    ...rest
  } = props

  return (
    <>
      {
        label
          ? <div className="field-label">
            <label htmlFor="">{label}</label>
            <div className="field">
              {icon && (<span className="field__icon">{icon}</span>)}
              <input className={`field__input ${error ? 'error' : null}`} ref={ref} {...rest} />
              {arrow && (
                <span className="field__icon-arrow"><IconArrowBottom fill="var(--fourth-color)" height={10} /></span>
              )}
            </div>
          </div>
          : <div className="field">
            {icon && (<span className="field__icon">{icon}</span>)}
            <input className={`field__input ${error ? 'error' : null}`} ref={ref} {...rest} />
            {arrow && (
              <span className="field__icon-arrow"><IconArrowBottom fill="var(--fourth-color)" height={10} /></span>
            )}
          </div>
      }
      <style jsx>{`
        .field-label label{
          font-weight:bold;
          color: var(--border-color);
        }
        .field-label .field{
          margin-top: 10px;
        }
        .field {
          position: relative;
          // width: 100%;
          width: ${width};
          height: ${typeof height === 'object' ? height.xs : height}px;
          display: flex;
          align-items: center; 
                 
        }

        .field__icon {
          position: absolute;
          left: 12px;
          font-size: 0;
        }

        .field__icon-arrow {
          position: absolute;
          font-size: 1;
          right: 12px;
          z-index: 1;
          // background: white;
          width: 20px
        }

        .field__input {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          border: 1px solid #C4C4C4;
          // color: var(--fourth-color);
          color: ${colorInput};
          font-size: ${font};  
          font-weight: ${fontWeight};
          background: ${bg};

          ${icon
          ? `
              padding: 0 12px 0 ${iconMarginRight}px;
              `
          : `
              padding: 0 12px;
              `
        }
        }

        .field__input.error {
          border-color: red;
        }

        .field__input::placeholder {
          // color: var(--fourth-color);
          color: ${colorPlace};
          font-weight: ${fontWeight};
          font-size: 14px;
        }

        @media screen and (min-width: 576px) {
          .field {
            height: ${typeof height === 'object' ? height.sm : height}px;
          }

          .field__input::placeholder {
            font-size: 18px;
          }
        }

        @media screen and (min-width: 768px) {
          .field {
            height: ${typeof height === 'object' ? height.md || height.sm : height}px;
          }
        }

        @media screen and (min-width: 992px) {
          .field {
            height: ${typeof height === 'object' ? height.lg || height.md || height.sm : height}px;
          }
        }
      `}</style>
    </>
  )
})

Input.propTypes = {
  font: PropTypes.string,
  bg: PropTypes.string,
  colorPlace: PropTypes.string,
  icon: PropTypes.node,
  width: PropTypes.any,
  height: PropTypes.any,
  iconMarginRight: PropTypes.number,
  paddingBottom: PropTypes.number
}

export default Input
