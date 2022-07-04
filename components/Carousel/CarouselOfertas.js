import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import PackCard from '@/components/PackCard/PackCard'
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

import 'swiper/swiper.min.css'

import SwiperCore, {
  Autoplay,
  Navigation
} from 'swiper'

SwiperCore.use([Autoplay, Navigation])

const Carousel = props => {
  const swiperRef = useRef(null)
  console.log(swiperRef, 'ref')
  const handleClickSlideNext = () => swiperRef.current.swiper.slideNext()
  const handleClickSlidePrev = () => swiperRef.current.swiper.slidePrev()

  const {
    items,
    delay = 3000
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
              <>
              <Swiper
                ref={swiperRef}
                loop
                // autoplay={{
                //   delay: delay
                // }}
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
                          fullHeight
                        />
                      </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
              <button className="btn__prev" onClick={handleClickSlidePrev}>
                <IoIosArrowBack size='5em' fill='#0693dd'/>
              </button>
              <button className="btn__next" onClick={handleClickSlideNext}>
                <IoIosArrowForward size='5em' fill='#0693dd'/>
              </button>
              </>
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

        .btn__next,
        .btn__prev {
          display: none
        }

        @media screen and (min-width: 1200px) {
          .btn__next,
          .btn__prev {
            display: inline-block;
            position: absolute;
            z-index: 99;
            background: none;
            border: none;
            outline: none;
            cursor: pointer;
          }

          .btn__prev {
            left: -1.5rem;
            top: 70rem;
          }

          .btn__next {
            right: -1.5rem;
            top: 70rem;
          }
        }

        @media screen and (min-width: 1400px) {
          .btn__prev {
            left: 2.7rem;
          }

          .btn__next {
            right: 2.7rem;
          }
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
