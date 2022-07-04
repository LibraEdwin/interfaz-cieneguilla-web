import React, { useState } from 'react'
import ArrowBottomIcon from '@/components/icons/arrow-bottom-icon.svg'

const Accordion = ({ data }) => {
  const [active, setActive] = useState(null)
  const [paragraphHeight, setParagraphHeight] = useState(0)

  const toggle = (index) => {
    if (active === index) {
      setActive(null)
    }

    setActive(index)
  }

  const handleClick = (event) => {
    const index = event.target.dataset.elemIndex
    const height = event.target.parentElement.nextElementSibling.querySelector('p').scrollHeight

    toggle(Number(index))
    setParagraphHeight(height + 32)
  }

  return (
    <>
      <div className="accordion">
        {
          data.map((item, index) => (
            <div className="accordion-item" key={index}>
              <div className="accordion-item__header">
                <div
                  className="accordion-item__over"
                  data-elem-index={index}
                  onClick={handleClick} />
                <span className="accordion-item__title">
                  {item.label}
                </span>
                <span
                  className="accordion-item__icon"
                  style={{
                    transform: active === index ? 'rotate(180deg)' : null
                  }}
                >
                  <ArrowBottomIcon fill="var(--fourth-color)" height={12} />
                </span>
              </div>
              <div
                className="accordion-item__answer"
                style={{
                  height: active === index ? `${paragraphHeight}px` : null,
                  borderTop: active === index ? '1px solid #c4c4c4' : null
                }}
              >
                <p dangerouslySetInnerHTML={{ __html: item.answer }} />
              </div>
            </div>
          ))
        }
      </div>

      <style jsx>{`
        .accordion {
          border: 1px solid #c4c4c4;
          border-top: none;
          border-radius: 8px;
          overflow: hidden;
        }

        .accordion-item__header {
          border-top: 1px solid #c4c4c4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
          cursor: pointer;
          height: 42px;
          column-gap: 1rem;
          position: relative;
        }

        .accordion-item__icon {
          transition: transform .2s ease;
        }

        .accordion-item__title {
          font-size: 14px;
          color: var(--fourth-color);
          font-weight: 700;
        }
        
        .accordion-item__over {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: transparent;
          z-index: 2;
        }

        .accordion-item__answer {
          height: 0;
          overflow: hidden;
          transition: height .2s ease;
        }

        .accordion-item__answer p {
          padding: 0 1rem;
          color: var(--fourth-color);
          font-size: 14px;
        }

        @media screen and (min-width: 768px) {
          .accordion-item__header {
            height: 64px;
          }

          .accordion-item__title {
            font-size: 18px;
          }

          .accordion-item__answer p {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  )
}

export default Accordion
