import React from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import PackCard from '@/components/PackCard/PackCard'

import 'swiper/swiper.min.css'

import SwiperCore, {
  Autoplay,
  Navigation
} from 'swiper'

SwiperCore.use([Autoplay, Navigation])

const Carousel = props => {
  const {
    items,
    delay = 5000
  } = props

  const breakpoints = {
    400: {
      slidesPerView: 1.2
    },
    540: {
      slidesPerView: 1.5
    },
    600: {
      slidesPerView: 1.8,
      spaceBetween: 5
    },
    720: {
      slidesPerView: 2.2,
      spaceBetween: 5
    },
    960: {
      slidesPerView: 3,
      spaceBetween: 5
    }
  }

  return (
    <>
      <section className="carousel-products">
        {
          items.length
            ? (
              <Swiper
                loop
                autoplay={{
                  delay: delay
                }}
                spaceBetween={0}
                slidesPerView={1.1}
                breakpoints={breakpoints}
              >
                {
                  items.map((item) => (
                    <SwiperSlide key={item._id}>
                      <div className="slide-item">
                        <PackCard
                          title={item.nombrePaquete}
                          price={item.precio}
                          to={`/paquetes-y-full-days/${item.nombreURL}`}
                          imgSrc={`${process.env.DOMAIN_IMAGES}${item.fotoPrincipal}`}
                          fotoPrincipal={item.fotoPrincipal}
                        />
                      </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            )
            : <></>
        }
      </section>

      <style jsx>{`
        .carousel-products {
          margin: -.5rem -.5rem 0 -.5rem;
        }

        .slide-item {
          padding: .5rem;
          display: flex;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}

Carousel.propTypes = {
  items: PropTypes.array,
  delay: PropTypes.number
}

export default Carousel
