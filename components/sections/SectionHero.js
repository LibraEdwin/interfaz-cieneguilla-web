import React from 'react'
import Button from '@/components/common/Button'
import router from 'next/router'

const SectionHero = () => {
  return (
    <>
      <section className="banner">
        <div className="banner__inner">
            <Button
              className="tour-btn"
              label="ver tours"
              variant="outline"
              width={{ xs: 160, md: 160 }}
              height={52}
              onClick = { ()=> {
                router.push('/paquetes-y-full-days')
              }}
            />
        </div>
        <div className="degradado"></div>
      </section>

      <style jsx>{/* css */`
        .banner {
          background-image: url('/images/banner_principal.webp');
          height: 590px;
          background-size: cover;
          background-repeat:no-repeat; 
          position: relative;
          display: flex;
          justify-content: center;
        }

        .degradado {
          background: linear-gradient(180deg, rgba(8, 188, 97, 0) 0%, #08BC61 40.83%);
          position: absolute;
          top: 430px;
          height: 161px;
          width: 100%;
          display: flex;
          z-index: 1
        }

        .banner__inner {    
          position: absolute;
          top: 500px;
          z-index: 2
        }

        @media screen and (min-width: 576px) {
          .degradado {
            display: none
          }

          .banner__inner {
            top: 400px;
            left: 80px;
          }
        }

        @media screen and (min-width: 768px) {
          .banner {
            background-image: url('/images/banner_principal.webp');
            height: 616px;
            background-repeat:no-repeat;
            background-size: cover;
          }
  
          .banner__inner {
            max-width: 165px;
            top: 430px;
            left: 95px;
          }
        }

        @media screen and (min-width: 992px) {  
          .banner__inner {
            top: 425px;
            left: 89px;
          }
        }

      `}</style>
    </>
  )
}

export default SectionHero
