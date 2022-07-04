import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Section from '@/components/Section/Section'
import PackCard from '@/components/PackCard/PackCard'
import Filters from '@/components/Filters'
import { getData } from '@/lib/Api'
import { removeDuplicates } from '@/lib/util'
import SkeletonListaPaquetes from '@/components/Loader/SkeletonListaPaquetes'
import { useRouter } from 'next/router'

const protocols = [
  {
    label: 'Dos Mascarillas o KN-95',
    icon: '/icons/Group36.png'
  },
  {
    label: 'Carnet de Vacunación',
    icon: '/icons/Group35.png'
  },
  {
    label: 'Protector facial (Opcional)',
    icon: '/icons/Group37.png'
  }
]

const Index = ({ dataPaquete, listaZonas, listaEstados }) => {
  const [listaPaquetes, setListaPaquetes] = useState(dataPaquete)
  const [isLoading, setIsLoading] = useState(false)
  const { isFallback } = useRouter()

  if (isFallback) {
    return <div> Página cargando .... </div>
  }

  return (
    <>
      <section className="packs">
        <div className="container">
          <h1 className="packs__title">Paquetes y Full days</h1>
          <div className="packs__filters">
            <Filters listaZonas={listaZonas} listaEstados={listaEstados} setListaPaquetes={setListaPaquetes} setIsLoading={setIsLoading} />
          </div>
          {isLoading && (
            <SkeletonListaPaquetes numItems={9} />
          )}

          {listaPaquetes.length > 0
            ? (
              <div className="packs__items">
                {listaPaquetes.map(paquete => (
                  <div key={paquete._id} className="packs__item">
                    <PackCard
                      title={paquete.nombrePaquete}
                      price={paquete.precio}
                      fullHeight
                      to={`/paquetes-y-full-days/${paquete.nombreURL}`}
                      imgSrc={process.env.DOMAIN_IMAGES + paquete.fotoPrincipal}
                      imgAlt={paquete.nombrePaquete}
                    />
                  </div>
                ))}
              </div>
            )
            : (
              <p className="packs__empty">No hay paquetes</p>
            )}

        </div>
      </section>

      <Section
        title="Protocolo Covid-19"
        bg="var(--third-color)"
        align={{
          xs: 'center'
        }}
        titleMarginBottom={{
          xs: 40,
          md: 75
        }}
        padding={{
          xs: '30px 0',
          md: '48px 0 62px 0'
        }}
      >
        <div className="protocol-items">
          {
            protocols.map((item, index) => (
              <div className="protocol-item" key={index}>
                <figure className="protocol-item__icon">
                  <img src={item.icon} alt="" />
                </figure>
                <span className="protocol-item__label">{item.label}</span>
              </div>
            ))
          }
        </div>
      </Section>

      <style jsx>{`
        .packs {
          margin-top: 20px;
          margin-bottom: 25px;
        }

        .packs__title {
          color: var(--fourth-color);
          font-weight: 700;
          font-size: 18px;
          text-transform: uppercase;
        }

        .packs__filters {
          margin: 26px 0;
        }

        .packs__items {
          display: grid;
          gap: 2.5rem 0;
        }

        .protocol-items {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .protocol-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          //max-width: 150px;
        }

        .protocol-item__icon {
          text-align: center;
          margin: 0;
          width: 50px;
        }

        .packs__empty {
          width: 100%;
          text-align: center;
        }

        .protocol-item__icon img {
          width: 100%;
        }

        .protocol-item__label {
          text-align: center;
          font-weight: 700;
          color: #fff;
        }

        @media screen and (min-width: 576px) {
          .packs__items {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem 3rem;
          }

          .packs {
            margin-top: 100px;
            margin-bottom: 168px;
          }

          .packs__filters {
            margin: 46px 0;
          }

          .protocol-item {
            gap: 2rem;
            width: calc(100% / 3);
          }

          .protocol-item__icon {
            width: 100px;
          }
        }

        @media screen and (min-width: 768px) {
          .packs__title {
            font-size: 24px;
          }
        }

        @media screen and (min-width: 960px) {
          .packs__items {
            grid-template-columns: repeat(3, 1fr);
          }

          .protocol-item__icon {
            width: 150px;
          }

          .protocol-item__label {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const dataZonas = await getData(`${process.env.URI_API}/api-cieneguilla-service/zonas-geograficas`)
  const listaZonas = dataZonas.map(zona => { return { id: zona._id, texto: zona.nombreZona } })
  const dataEstados = await getData(`${process.env.URI_API}/api-cieneguilla-service/estados-paquete`)
  let listaEstados = dataEstados.map(estado => { return { id: estado._id, texto: estado.estado } })
  listaEstados = listaEstados.filter(estado => estado.texto !== 'Nuevo')

  const dataPaquete = await getData(`${process.env.URI_API}/api-cieneguilla-service/salidas-programadas/search-paquete`)

  const filterPaquete = dataPaquete.map(salida => salida.paqueteTuristico)
  const filtroIdPaqueteUnico = removeDuplicates(filterPaquete, '_id').filter(paquete => paquete.esEliminado === false)

  return {
    props: {
      listaEstados,
      listaZonas,
      dataPaquete: filtroIdPaqueteUnico
    }
  }
}

Index.propTypes = {
  dataPaquete: PropTypes.array,
  listaEstados: PropTypes.array.isRequired,
  listaZonas: PropTypes.array.isRequired
}

export default Index
