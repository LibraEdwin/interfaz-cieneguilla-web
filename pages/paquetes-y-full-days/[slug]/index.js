import React, { useState } from 'react'
import useSWR from 'swr'
import Galeria from '@/components/Galeria/Galeria'
import SliderGaleria from '@/components/Slider/Slider'
import BackButton from '@/components/common/BackBtn'
import Cotizador from '@/components/Cotizador/cotizador'

import CarouselPopulares from '@/components/Carousel/CarouselPopulares'
import Section from '@/components/Section/Section'
import Button from '@/components/common/Button'
import IconCheck from '@/components/icons/check-icon.svg'
import { useRouter } from 'next/router'
import { useGlobalContext } from '@/context/GlobalContext'
import { saveAs } from 'file-saver'

import ModalSelectFecha from '@/components/Modal/Fechas/SelecFecha'
import { InputsProvider } from '@/context/InputsContext'
import { NotaVentaProvider } from '@/context/NotaVentaCtx'

import LoaderDetallePaquete from '@/components/Loader/LoaderDetallePaquete'

const Paquete = (props) => {
  const router = useRouter()

  if (router.isFallback) {
    return <LoaderDetallePaquete/>
  }
  return (
    <NotaVentaProvider>
      <InputsProvider>
        <PaqueteContent foo={props} />
      </InputsProvider>
    </NotaVentaProvider>
  )
}

const PaqueteContent = ({ foo }) => {
  const [openModalFechas, setOpenModalFechas] = useState(false)
  const { populares } = useGlobalContext()
  const nombreUrl = foo.slug

  // ===== SWR ===== //
  const { data: paquete, error: err } = useSWR(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/${foo.id}`, fetcher2, { initialData: foo })

  const { data, error } = useSWR(`${process.env.URI_API}/api-cieneguilla-service/otros-datos/${foo.id}`, fetcher, { initialData: foo })

  if (error) return <div>failed to load</div>
  if (!data) return <LoaderDetallePaquete />
  if (err) return <div>failed to load</div>
  if (!paquete) return <LoaderDetallePaquete />

  // Handle download file PDF

  const handleDownload = () => {

    // saveAs(
    //   // `${process.env.DOMAIN_IMAGES}` + paquete.archivoItinerario,
    //   'https://storage.googleapis.com/svr-cieneguilla.appspot.com/uploads/1.PARACAS.pdf',
    //   'itinerario.pdf'
    // )

    // fetch('https://storage.googleapis.com/svr-cieneguilla.appspot.com/uploads/1.PARACAS.pdf')
    // fetch('https://storage.googleapis.com/container-csi-public/uploads/paquetes-turisticos/412745246/archivoItinerario.pdf', 

    // alert(`${process.env.DOMAIN_IMAGES}${paquete.archivoItinerario}`)

    fetch(`${process.env.DOMAIN_IMAGES}${paquete.archivoItinerario}`)
    .then(response => response.blob())
    .then(blob => {

      const url = window.URL.createObjectURL(blob)
      let a = document.createElement('a')
      a.href = url
      a.download = "itinerario.pdf"
      document.body.appendChild(a)
      a.click()
      a.remove()
    })
    
  }

  const sendUrl = () => {
    localStorage.setItem('url', nombreUrl)
  }

  return (
    <>
      <section className="container">
        <BackButton
          title="Volver a paquetes y full days"
          to="/paquetes-y-full-days"
        />
        <Cotizador
          title={paquete.nombrePaquete}
          info="" //get descripción de paquete para el cotizador
          price={paquete.precio}
          fotoPrincipal={paquete.fotoPrincipal}
          linkTo={`/paquetes-y-full-days/${nombreUrl}/comprar`}
          noIncluyeModal={data.tiposDato.tipos[3]}
        />
        <Galeria classname="galeria" imgPrincipal={paquete.fotoPrincipal} imgAnexas={paquete.fotosAnexas} />
        <SliderGaleria className="slider" imgPrincipal={paquete.fotoPrincipal} imgAnexas={paquete.fotosAnexas} />
        <div className="info">
          <div className="info__cell">
            <Section
              title={data.tiposDato.tipos[0].nombreTipoDato}
              titleMarginBottom={{
                xs: 22,
                md: 30
              }}
              align={{ xs: 'left' }}
              padding={{
                xs: '39px 0 67px 0',
                md: '37px 0 0 0'
              }}
            >
              <ul className="list">
                {data.tiposDato.tipos[0].descriptions.map((item, index) => (
                  <li key={index}><span>{item}</span></li>
                ))}
              </ul>
            </Section>
          </div>
          <div className="info__cell">
            <Section
              title={data.tiposDato.tipos[1].nombreTipoDato}
              titleMarginBottom={{
                xs: 22,
                md: 30
              }}
              align={{ xs: 'left' }}
              padding={{
                xs: '0 0 42px 0',
                md: '37px 0 0 0'
              }}
            >
              <ul className="list">
                {data.tiposDato.tipos[1].descriptions.map((item, index) => (
                  <li key={index}><span>{item}</span></li>
                ))}
              </ul>
              <div className="buttons">
                {/* <a href={`${process.env.DOMAIN_IMAGES}${paquete.archivoItinerario}`} download="itinerario.pdf"> */}
                {/* <div class="send-btn-container">
                  <a
                    href="https://storage.googleapis.com/container-csi-public/uploads/paquetes-turisticos/412745246/archivoItinerario.pdf"
                    download
                    target="_blank"
                    type="application/octet-stream"
                  >Download file</a>
                </div> */}
                  <Button
                    label="Descargar itinerario"
                    color="var(--second-color)"
                    font="18px"
                    width={290}
                    onClick={() => handleDownload()}
                  />
                {/* </a> */}
                <Button
                  label="Ver fechas de salida"
                  color="var(--second-color)"
                  width={290}
                  onClick={() => setOpenModalFechas(true)}
                  font="18px"
                />
                {openModalFechas && <ModalSelectFecha idPaquete={paquete._id} closeModalFechas={setOpenModalFechas} page="paquete" slug={foo.slug} />}
                <Button
                  label="Ver terminos y condiciones"
                  color="var(--second-color)"
                  width={290}
                  font="16px"
                  to="/terminos-y-condiciones"
                  onClick={() => sendUrl()}
                />
              </div>
            </Section>
          </div>
        </div>
      </section>
      <Section
        title={data.tiposDato.tipos[2].nombreTipoDato}
        titleMarginBottom={{
          xs: 22,
          md: 42
        }}
        align={{ xs: 'left' }}
        padding={{
          xs: '30px 0 0 0',
          md: '67px 0 0 0'
        }}
      >
        <div className="what-to-bring">
          <div className="what-to-bring__wrap">
            <ul className="what-to-bring__list">
              {data.tiposDato.tipos[2].descriptions.map((item, index) => (
                <li className="what-to-bring__list-item" key={index}>
                  <span className="what-to-bring__list-item-icon">
                    <IconCheck />
                  </span>
                  <span className="what-to-bring__list-item-label">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </Section>
      <Section
        title="Los más populares"
        align={{ xs: 'left' }}
        titleMarginBottom={{
          xs: 22,
          md: 50
        }}
        padding={{
          xs: '46px 0 102px 0',
          md: '96px 0 121px 0'
        }}
      >
        <CarouselPopulares items={populares} delay={15000} />
      </Section>

      <style jsx>{/* css */`

        .info {
          display: grid;
        }

        .galeria {
          display: none!important
        }

        .list li {
          color: var(--fourth-color);
          font-weight: normal;
          font-size: 14px;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
        }

        .list li::before {
          content: "";
          display: block;
          width: 16px;
          height: 16px;
          background: #c4c4c4;
          border-radius: 50%;
          margin-right: 1rem;
        }

        .list li span {
          display: block;
          width: calc(100% - 16px);
        }

        .buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .what-to-bring {
          background-color: #efefef;
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .what-to-bring__wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 960px;
          margin: 0 auto;
        }

        .what-to-bring__list-item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 1.2rem;
          gap: 1rem;
        }

        .what-to-bring__list-item-label {
          color: var(--fourth-color);
          font-weight: normal;
          font-size: 14px;
        }

        @media screen and (min-width: 576px) {
          .what-to-bring {
            padding: 3.5rem 2.5rem;
          }

          .list li,
          .what-to-bring__list-item-label {
            font-size: 18px;
          }
        }

        @media screen and (min-width: 768px) {
          .slider {
            display: none!important
          }
          .info {
            grid-template-columns: repeat(3, 1fr);
          }

          .info__cell:first-child {
            grid-column-start: 1;
            grid-column-end: 3;
          }

          .info__cell:last-child {
            grid-column-start: 3;
          }

          .what-to-bring__wrap {
            width: 100%;
            flex-direction: row;
            justify-content: flex-start;
          }

          .what-to-bring__list {    
            display: flex;
            flex-direction: column;
            gap: 1.2rem;           
          }

          .what-to-bring__list:first-child {
            margin-right: 5rem;
          }

          .what-to-bring__list-item {
            margin-bottom: 0;
          }
        }

        @media screen and (min-width: 960px) {

          .what-to-bring__list {
            column-gap: 5rem;
            width: 100%;
          }

          .what-to-bring__list:first-child {
            margin-right: 8rem;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .what-to-bring__list:last-child {
            margin-right: 3rem;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }          
        }        
      `}</style>
    </>
  )
}

export async function getStaticPaths({ }) {
  return {
    paths: [],
    fallback: true
  }
}

const fetcher = (...args) => fetch(...args).then(async (res) => {
  const rs = await res.json()
  return { tiposDato: rs.body }
})

const fetcher2 = (...args) => fetch(...args).then(async (res) => {
  const rs = await res.json()
  const paquete = rs.body
  return paquete
})

export async function getStaticProps({ params }) {
  const { slug } = params
  const id = slug.split('-')[0]

  const resPaquetes = await fetch(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/${id}`)
  const paquetesJson = await resPaquetes.json()
  const paquete = paquetesJson.body

  const resDatos = await fetch(`${process.env.URI_API}/api-cieneguilla-service/otros-datos/${id}`)
  const datosJson = await resDatos.json()
  const tiposDato = datosJson.body

  return {
    props: {
      paquete,
      tiposDato,
      slug,
      id
    },
    revalidate: 10
  }
}

export default Paquete
