import React, { useEffect, useState } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import FancyBox from '../FancyBox'

const Galeria = ({ imgPrincipal, imgAnexas }) => {
  const [imgErrorPrincipal, setImgErrorPrincipal] = useState(false)
  const [imgErrorAnexa1, setImgErrorAnexa1] = useState(false)
  const [imgErrorAnexa2, setImgErrorAnexa2] = useState(false)
  const [imgErrorAnexa3, setImgErrorAnexa3] = useState(false)
  const [imgErrorAnexa4, setImgErrorAnexa4] = useState(false)

  const arrImagenesAnexas = []

  if (imgAnexas.anexa1 != null) {
    arrImagenesAnexas.push(imgAnexas.anexa1)
  }
  if (imgAnexas.anexa2 != null) {
    arrImagenesAnexas.push(imgAnexas.anexa2)
  }
  if (imgAnexas.anexa3 != null) {
    arrImagenesAnexas.push(imgAnexas.anexa3)
  }
  if (imgAnexas.anexa4 != null) {
    arrImagenesAnexas.push(imgAnexas.anexa4)
  }

  return (
    <>
    <FancyBox options={{ infinite: false }}>
      <div className="galeria">
        <a
          data-fancybox="gallery"
          href={imgErrorPrincipal ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + imgPrincipal}
        >
          <figure className="img__main">
              <img src={imgErrorPrincipal ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + imgPrincipal} alt="principal" />
          </figure>
        </a>
        {
          imgAnexas.anexa1
            ? <figure className="img__anx--1">
              <a
                data-fancybox="gallery"
                href={imgErrorAnexa1 ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + imgAnexas.anexa1}
              >
                <img src={imgErrorAnexa1 ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + imgAnexas.anexa1} alt="anexa 1" />
              </a>
            </figure>
            : <div></div>
        }
        {
          imgAnexas.anexa2
            ? <figure className="img__sec--2">
              <a
                data-fancybox="gallery"
                href={imgErrorAnexa2 ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + imgAnexas.anexa2}
              >
                <img src={imgErrorAnexa2 ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + imgAnexas.anexa2} alt="anexa 2" />
              </a>
            </figure>
            : <div></div>
        }
        {
          imgAnexas.anexa3
            ? <figure className="img__sec--3">
          <a
            data-fancybox="gallery"
            href={imgErrorAnexa3 ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + imgAnexas.anexa3}
          >
            <img src={imgErrorAnexa3 ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + imgAnexas.anexa3} alt="anexa 3" />
          </a>
        </figure>
            : <div></div>
        }
        {
          imgAnexas.anexa4
            ? <figure className="img__sec--4">
              <a
                data-fancybox="gallery"
                href={imgErrorAnexa4 ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + imgAnexas.anexa4}
              >
                <img src={imgErrorAnexa4 ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + imgAnexas.anexa4} alt="anexa 4" />
              </a>
            </figure>
            : <div></div>
        }

      </div>
    </FancyBox>

      <style jsx>{
        /* css */ `
          .galeria {
            display: grid;
            grid-template-columns: 7rem 7rem 7rem;
            grid-template-rows: 7rem 7rem 7rem;
            justify-content: center;
            grid-gap: 5px;
            padding: 0rem 1rem;
            margin: 1rem 0rem;
            display: none
          }

          .img__main {
            grid-row: 1/3;
            grid-column: 1/3;
          }

          .img__main img {
            width: 14.3rem;
            height: 14.3rem;
            grid-row: 1/3;
            grid-column: 1/3;
            overflow: hidden;
            object-fit: cover;
          }

          img {
            height: 100%;
            width: 100%;
          }

          .img__anx--1 {
            grid-column: 3/4;
            grid-row: 1/2;
            overflow: hidden;
            object-fit: cover;
          }

          .img__sec--2 {
            grid-column: 3/4;
            grid-row: 2/3;
            overflow: hidden;
            object-fit: cover;
          }

          .img__sec--2 img {
            height: 100%;
            width: 100%;
          }

          .img__sec--4 {
            grid-column: 2/3;
            grid-row: 3/4;
            overflow: hidden;
          }

          .img__sec--3 {
            grid-column: 3/4;
            grid-row: 3/4;
            overflow: hidden;
          }

          @media screen and (min-width: 768px) {
            .galeria {
              display: grid;
              grid-template-columns: 17rem 12rem 12rem;
              grid-template-rows: 10rem 10rem;
              margin: 2rem 2rem;
            }

            .img__main {
              grid-column: 1/2;
              grid-row: 1/3;
              object-fit: cover;
              overflow: hidden;
            }

            .img__main img {
              width: 350px;
              height: 22rem;
              object-fit: cover;
            }

            .img__anx--1 {
              grid-column: 2/3;
              grid-row: 1/2;
            }
            .img__anx--1 img {
              width: 12rem;
              height: 10rem;
              object-fit: cover;
            }

            .img__sec--2 {
              grid-column: 2/3;
              grid-row: 2/3;
            }

            .img__sec--2 img {
              width: 12rem;
              height: 10rem;
              object-fit: cover;
            }

            .img__sec--4 {
              grid-column: 3/4;
              grid-row: 2/3;
            }

            .img__sec--4 img {
              width: 12rem;
              height: 10rem;
              overflow: hidden;
              object-fit: cover;
            }

            .img__sec--3 {
              grid-column: 3/4;
              grid-row: 1/2;
            }

            .img__sec--3 img {
              width: 12rem;
              height: 10rem;
              overflow: hidden;
              object-fit: cover;
            }
          }

          @media screen and (min-width: 1200px) {
            .galeria {
              display: grid!important;
              grid-template-columns: 27rem 19rem 19rem;
              grid-template-rows: 14rem 14rem;
              margin: 2rem 2rem;
              grid-gap: 0.5rem;
              display: flex;
            }

            .img__main img {
              width: 30rem;
              height: 27.5rem;
            }

            .img__anx--1 img {
              width: 19rem;
              height: 8rem;
              height: 100%;
            }

            .img__sec--2 img {
              width: 19rem;
              height: 13rem;
              object-fit: cover;
            }

            .img__sec--3 img {
              width: 19rem;
              height: 15rem;
            }

            .img__sec--4 img {
              width: 19rem;
              height: 13rem;
              object-fit: cover;
            }
          }

          @media screen and (min-width: 1400px) {
            .galeria {
              display: grid;
              grid-template-columns: 575px 307px 307px;
              grid-template-rows: 276px 276px;
              grid-gap:15px;              
            }

            .img__main img {
              width: 575px;
              height: 100%;
            }

            .img__anx--1 img {
              width: 307px;
              height: 276px;
            }

            .img__sec--2 img {
              width: 307px;
              height: 276px;
            }

            .img__sec--4 img {
              width: 307px;
              height: 276px;
            }

            .img__sec--3 img {
              width: 307px;
              height: 276px;
            }
          }
        `
      }</style>
    </>
  )
}

export default Galeria
