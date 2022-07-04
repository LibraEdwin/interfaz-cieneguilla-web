import React from 'react'
import PropTypes from 'prop-types'

const SkeletonListaPaquetes = ({ numItems = 3 }) => {
  const renderItems = () => {
    const list = []
    for (let index = 0; index < numItems; index++) {
      list.push(
        <div key={index} className="skeleton__item">
          <div className="skeleton__photo"></div>
          <div className="sekeleton__details">
            <div className="skeleton__name">
              <div className="skeleton__p"></div>
              <div className="skeleton__p"></div>
            </div>
            <div className="skeleton__price">
              S/ 00.00
            </div>
            <div className="skeleton__btn1"></div>
            <div className="skeleton__btn2"></div>
          </div>
          <style jsx>{`
            .skeleton__item {
              width: 100%;
              border: 1px solid #e7e7e7;
              border-radius: 8px;
              overflow: hidden;
            }

            .skeleton__photo {
              width: 100%;
              height: 330px;
              background: linear-gradient(-45deg, #fcfcfc, #f0ecec, #e2e2e2, #eeeded);
              background-size: 400% 400%;
              animation: gradient 2s ease infinite;
            }

            .sekeleton__details {
              padding: 1rem;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
            }

            .skeleton__name {
              width: 60%;
            }
            
            .skeleton__p {
              width: 100%;
              height: 16px;
              border-radius: 0.5rem;
              background: linear-gradient(-45deg, #fcfcfc, #f0ecec, #e2e2e2, #eeeded);
              animation: gradient 2s ease infinite;
            }

            .skeleton__p:last-child {
              width: 70%;
              margin-top: 0.5rem;
            }

            .skeleton__price {
              width: 30%;
              height: 30px;
              display: flex;
              justify-content: right;
              align-items: center;
              font-size: 1.3rem;
              font-weight: 700;
              color: #dadada;
            }

            .skeleton__amount {
              width: 40px;
              height: 100%;
              background: red;
              margin-left: 1rem;
            }

            .skeleton__btn1,
            .skeleton__btn2 {
              width: 47%;
              height: 35px;
              margin-top: 1rem;
              background: linear-gradient(-45deg, #fcfcfc, #f0ecec, #e2e2e2, #eeeded);
              background-size: 400% 400%;
              animation: gradient 2s ease infinite;
              border-radius: 0.5rem;
            }

            @media (min-width: 576px) {
              .skeleton__items {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }

            @media (min-width: 992px) {
              .skeleton__items {
                gap: 2rem;
                grid-template-columns: repeat(3, minmax(0, 1fr));
              }
            }

            @keyframes gradient {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
          `}</style>
        </div>
      )
    }

    return list
  }
  return (
    <>
      <div className="skeleton__items">
        {renderItems()}
      </div>
      <style jsx>{`
        .skeleton__items {
          display: grid;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .skeleton__item {
          width: 100%;
          border: 1px solid #e7e7e7;
          border-radius: 8px;
          overflow: hidden;
        }

        .skeleton__photo {
          width: 100%;
          height: 330px;
          background: linear-gradient(-45deg, #ffffff, #f7f7f7, #f7f7f7, #f1f1f1);
          background-size: 400% 400%;
          animation: gradient 2s ease infinite;
        }

        .sekeleton__details {
          padding: 1rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .skeleton__name {
          width: 60%;
        }
        
        .skeleton__p {
          width: 100%;
          height: 16px;
          border-radius: 0.5rem;
          background: linear-gradient(-45deg, #ffffff, #f7f7f7, #f7f7f7, #f1f1f1);
          animation: gradient 2s ease infinite;
        }

        .skeleton__p:last-child {
          width: 70%;
          margin-top: 0.5rem;
        }

        .skeleton__price {
          width: 30%;
          height: 30px;
          display: flex;
          justify-content: right;
          align-items: center;
          font-size: 1.3rem;
          font-weight: 700;
          color: #dadada;
        }

        .skeleton__amount {
          width: 40px;
          height: 100%;
          background: red;
          margin-left: 1rem;
        }

        .skeleton__btn1,
        .skeleton__btn2 {
          width: 47%;
          height: 35px;
          margin-top: 1rem;
          background: linear-gradient(-45deg, #ffffff, #f7f7f7, #f7f7f7, #f1f1f1);
          background-size: 400% 400%;
          animation: gradient 2s ease infinite;
          border-radius: 0.5rem;
        }

        @media (min-width: 576px) {
          .skeleton__items {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 992px) {
          .skeleton__items {
            gap: 2rem;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  )
}

SkeletonListaPaquetes.propTypes = {
  numItems: PropTypes.number
}

export default SkeletonListaPaquetes
