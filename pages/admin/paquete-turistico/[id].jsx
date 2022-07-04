import { PaqueteTuristicoProvider } from '@/context/paqueteTuristicoCtx'
import { getData } from '@/lib/Api'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import ContentPaquete from '@/components/Admin/ContentPaquete'
import useValidationToken from '@/hooks/useValidationToken'
import Login from '@/pages/login'
import { useRouter } from 'next/router'

export default function DetailPaqueteTuristico({ initialData, listaEstados, listaZonas }) {
  const shouldLogin = useValidationToken()
  const {isFallback} = useRouter()

  if (isFallback) {
    return <div> Página cargando .... </div>
  }

  return (
    shouldLogin
      ? <Login />
      : <>
        <PaqueteTuristicoProvider>

          <HeaderAdmin title="Detalle del paquete turístico" />

          <ContentPaquete listaEstados={listaEstados} listaZonas={listaZonas} initialData={initialData} />

        </PaqueteTuristicoProvider>
      </>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const paqueteId = params.id
    const initialData = await getData(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/${paqueteId}`)

    const dataEstados = await getData(`${process.env.URI_API}/api-cieneguilla-service/estados-paquete`)
    const listaEstados = dataEstados.map(estado => { return { id: estado._id, texto: estado.estado } })
    const dataZonas = await getData(`${process.env.URI_API}/api-cieneguilla-service/zonas-geograficas`)
    const listaZonas = dataZonas.map(zona => { return { id: zona._id, texto: zona.nombreZona } })

    return {
      props: {
        initialData,
        listaEstados,
        listaZonas
      }
    }
  } catch (e) {
    console.log(e.message)
  }
}

DetailPaqueteTuristico.layout = 'Admin'
