import Link from 'next/link'
import { formatToCurrency } from '@/lib/util'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Button from '@/components/common/Button'
import ModalCalculadora from '../Modal/Calculadora/Calculadora'

const PackCard = ({ title, price, imgSrc, fotoPrincipal, fullHeight, noIncluyeModal, to = '', imgAlt = '', variant = 'defualt', campañaColor }) => {
  const [openModal, setOpenModal] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleVariant = () => {
    switch (variant) {
      case 'big':
        return 'card--size-big'
      case 'defualt':
      default:
        return 'card--size-default'
    }
  }

  return (
    <>
      <article className={`card ${handleVariant()}`}>
        <figure className="card__figure">
          <Link href={to}>
            <a href="" className='card__figure-img'>
              <img src={imageError ? '/images/empty.jpg' : imgSrc} alt={imgAlt} onError={(e) => setImageError(true)} />
            </a>
          </Link>
        </figure>
        <div className="card__footer">
          <div className="card__content">
            <h3 className="card__title">{title}</h3>
            <h4 className="card__price">{`S/ ${formatToCurrency(price)}`}</h4>
          </div>
          <div className="card__cta">
            <div className="card__cta-item">
              <Button
                to={to}
                label="Cotizar"
                variant="outline"
                height={{ xs: 32, md: 40 }}
                color={campañaColor}
                onClick={() => to ?? setOpenModal(true)}
              />
              {openModal && <ModalCalculadora closeModal={setOpenModal} price={price} fotoPrincipal={'/app.jpg'} title={title} />}
            </div>
            <div className="card__cta-item">
              <Button
                to={to}
                label="Comprar"
                color={campañaColor}
                height={{ xs: 32, md: 40 }}
              />
            </div>
          </div>
        </div>
      </article>

      <style jsx>{
        /* css */ `
          .card {
            display: flex;
            flex-direction: column;
            background: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            border-radius: 0 0 8px 8px;
            overflow: hidden;
            height: 100%;
            width: 100%;
          }

          .card__figure {
            width: 100%;
          }

          .card__figure a {
            width: 100%;
            height: 330px;
            display: block;
          }

          .card__figure img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }

          .card__footer {
            padding: 18px 1rem 24px 1rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            height: ${fullHeight ? '100%' : 'fit-content'};
          }

          .card__content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .card__title {
            font-size: 18px;
            font-weight: bold;
            color: var(--fourth-color);
            display: grid;
            align-content: center;
          }

          .card__price {
            font-size: 20px;
            color: var(--fourth-color);
            width: 40%;

            display: flex;
            justify-content: flex-end;
          }

          .card__cta {
            display: grid;
            grid-gap: 0 1rem;
            grid-template-columns: repeat(2, 1fr);
          }

          .card__cta-item {
          }

          .card--size-big {
          }

          @media screen and (min-width: 960px) {
            .card__title {
              font-size: 24px;
            }

            .card__price {
              font-size: 23px;
              width: 70%;
            }

            .card--size-big .card__figure {
              height: 437px;
            }

            .card--size-big .card__footer {
              flex-direction: row;
              gap: 2rem;
              align-items: center;
            }

            .card--size-big .card__content {
              margin-bottom: 0;
            }
          }
        `
      }</style>
    </>
  )
}

PackCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  to: PropTypes.string,
  imgAlt: PropTypes.string,
  variant: PropTypes.string,
  fullHeight: PropTypes.bool
}

export default PackCard
