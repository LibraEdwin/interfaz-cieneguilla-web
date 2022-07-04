import PackCard from "@/components/PackCard/PackCard"
import { getData } from "@/lib/Api"

export const getServerSideProps = async ({ params }) => {
  const { slug } = params
  const id = slug.split('-')[0]

  const paquetes = await getData(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/campania/${id}`)

  const campaña = await getData(`${process.env.URI_API}/api-cieneguilla-service/campania/${id}`)

  return {
    props: {
      paquetes,
      campaña
    }
  }
}

const Campaña = ({ paquetes, campaña }) => {
  return (
    <>
      <div className="container">
        <h1 className="packs__title">{campaña.nombreCampaña}</h1>
        <div className="grid">
          {paquetes?.map(paquete => (
            <PackCard
              key={paquete._id}
              title={paquete.nombrePaquete}
              price={paquete.precio}
              fullHeight
              to={`/paquetes-y-full-days/${paquete.nombreURL}`}
              imgSrc={process.env.DOMAIN_IMAGES + paquete.fotoPrincipal}
              imgAlt={paquete.nombrePaquete}
              campañaColor={campaña.colorButton}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 50px auto;
        }
        .packs__title {
          color: var(--fourth-color);
          font-weight: 700;
          font-size: 18px;
          text-transform: uppercase;
        }
        .grid {
          display: grid;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        @media (min-width: 768px) {
          .grid {
            margin-top: 2rem;
            grid-template-columns: repeat(2, 1fr);
          }
          .packs__title {
            font-size: 24px;
          }
        }

        @media (min-width: 992px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 3rem;
          }
        }
      `}</style>
    </>
  )
}

export default Campaña