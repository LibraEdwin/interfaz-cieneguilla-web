import React from 'react'
import PropTypes from 'prop-types'
import IconArrowBottom from '@/components/icons/arrow-bottom-icon.svg'

const Select = props => {
  const {
    icon,
    bg = 'transparent',
    children,
    iconMarginRight = 45,
    fontSize,
    fontWeight = 'bold',
    height = 40,
    arrow = true,
    label,
    ...rest
  } = props

  return (
    <>
      {label ? (
        <div className="field-label">
          <label htmlFor="">{label}</label>
          <div className="field">
            {icon && (<span className="field__icon">{icon}</span>)}
            <select className="field__select" {...rest}>{children}</select>
            {arrow && (
              <span className="field__icon-arrow"><IconArrowBottom fill="var(--fourth-color)" height={10} /></span>
            )}
          </div>
        </div>
      ) : (
        <div className="field">
          {icon && (<span className="field__icon">{icon}</span>)}
          <select className="field__select" {...rest}>{children}</select>
          {arrow && (
            <span className="field__icon-arrow"><IconArrowBottom fill="var(--fourth-color)" height={10} /></span>
          )}
        </div>
      )}

      <style jsx>{`
        .field-label{

        }
        .field-label label{
          font-weight:bold;
          color: var(--border-color);
        }
        .field-label .field{
          margin-top: 10px;
        }
        .field {
          position: relative;
          width: 100%;
          height: ${typeof height === 'object' ? height.xs : height}px;
          display: flex;
          align-items: center;
        }

        .field__icon,
        .field__icon-arrow {
          position: absolute;
          pointer-events: none;
          background: white;
        }

        .field__icon {
          left: 12px;
        }

        .field__icon-arrow {
          right: 12px;
          z-index: 1;
        }

        .field__select {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          border: 1px solid #C4C4C4;
          color: var(--fourth-color);
          font-weight: ${fontWeight};
          appearance: none;
          position: relative;
          z-index: 1;
          background: ${bg};
          font-size: 14px;
          font-size: ${fontSize}px;
          cursor: pointer;

          ${icon ? `padding: 0 12px 0 ${iconMarginRight}px;`
          : `padding: 0 12px;`
        }
        }

        @media screen and (min-width: 576px) {
          .field {
            height: ${typeof height === 'object' ? height.sm : height}px;
          }

          .field__select {
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

          .field__icon-arrow {
            // position: absolute;
            // font-size: 18!important;
          }
        }
      `}</style>
    </>
  )
}

Select.propTypes = {
  fontSize: PropTypes.string,
  bg: PropTypes.string,
  icon: PropTypes.node,
  height: PropTypes.any,
  iconMarginRight: PropTypes.number,
  arrow: PropTypes.bool
}

export default Select
