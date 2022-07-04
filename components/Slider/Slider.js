import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Swipercore, { Navigation, Pagination } from 'swiper'

// import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.css'
import FancyBox from '../FancyBox'

Swipercore.use([Navigation])

const SliderGaleria = ({ imgPrincipal, imgAnexas }) => {
  const breakpoints = {
    400: {
      slidesPerView: 1,
      spaceBetween: 1
    },
    720: {
      slidesPerView: 2,
      spaceBetween: 4
      // navigation: false,
    }
  }

  const arrImagenes = []

  if (imgPrincipal != null) {
    arrImagenes.push(imgPrincipal)
  }
  if (imgAnexas.anexa1 != null) {
    arrImagenes.push(imgAnexas.anexa1)
  }
  if (imgAnexas.anexa2 != null) {
    arrImagenes.push(imgAnexas.anexa2)
  }
  if (imgAnexas.anexa3 != null) {
    arrImagenes.push(imgAnexas.anexa3)
  }
  if (imgAnexas.anexa4 != null) {
    arrImagenes.push(imgAnexas.anexa4)
  }

  return (
    <>
      <FancyBox options={{ infinite: false }}>
        <section className="section__container" id="eventos">
          <Swiper
            navigation
            spaceBetween={0}
            slidesPerView={1}
            breakpoints={breakpoints}
          >
            {
              arrImagenes.map((item, key) => (
                <SwiperSlide key={key}>
                  <section className="eventos__container" >
                    <div className="evento">
                      <a
                        data-fancybox="gallery"
                        href={process.env.DOMAIN_IMAGES + item}
                      >
                        <img src={process.env.DOMAIN_IMAGES + item} />
                      </a>
                    </div>
                  </section>
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      </FancyBox>

      <style jsx>{
        /* css */ `
          .eventos__container {
            width: 100%;
            padding-top: 30px;
          }

          .evento {
            width: 280px;
            height: 280px;
            margin: auto;
            background: #f1f1f1;
          }

          .evento img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .eventos__desktop {
            display: none;
          }

          .swiper-button-next {
              color: red!important;
          }
          
          @media screen and (min-width: 414px) {
            .eventos__container {
                width: 100%;
                padding-top: 30px;
            }

            .evento {
              width: auto;
              height: 340px;
              margin: auto;
              background: #f1f1f1;
            }
            .evento__btn {
              display: flex;
              justify-content: center;
              margin-top: 20px;
            }
            .eventos__desktop {
              display: none;
            }
            .title__desktop {
              display: none;
            }
          }
          
          @media screen and (min-width: 768px) {
                .section__container {
                display: none
                }
            }
            
          @media screen and (min-width: 960px) {
            .section__container {
                display: none
            }
          }
        `
      }</style>
    </>
  )
}

export default SliderGaleria
