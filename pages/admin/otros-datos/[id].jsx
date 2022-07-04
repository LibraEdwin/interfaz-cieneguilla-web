import React, { useContext, useEffect, useRef, useState } from 'react'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import FooterAdmin from '@/components/Admin/FooterAdmin'
import OtrosDatosForm from '@/components/OtrosDatosForm/OtrosDatosForm'
import Router from 'next/router'
import OtrosDatosProvider, { OtrosDatosCtx } from './otrosDatosCtx'
import { getData, postData } from '@/lib/Api'
import Swal from 'sweetalert2'
import Button from '@/components/common/Button'
import LoaderOtrosDatos from '@/components/Loader/LoaderOtrosDatos'

export default function OtrosDatosContainer({ otrosDatos, id }) {
  return (
    <OtrosDatosProvider>
      <RegistroOtrosDatos params={otrosDatos} id={id} />
    </OtrosDatosProvider>
  )
}

const RegistroOtrosDatos = ({ params, id }) => {
  const { datos, setDatos } = useContext(OtrosDatosCtx)
  const [isLoading, setIsLoading] = useState(true)

  async function displayTiposDatos(idPaqueteTuristico) {
    let res = await fetch(`${process.env.URI_API}/api-cieneguilla-service/otros-datos/${idPaqueteTuristico}`)
    res = await res.json()

    setDatos((prev) => {
      const newState = {
        paqueteTuristico: prev.paqueteTuristico,
        tipos: res.body.tipos
      }
      return newState
    })
    setIsLoading(false)
  }

  const irAtras = (idPaqueteTuristico) => {
    Router.push(`/admin/paquete-turistico/${datos.paqueteTuristico}`)
  }

  // ================= REGISTRAR OTROS DATOS ==================
  const handleSubmit = async (e) => {
    const listaDatos = []
    datos.tipos.forEach((tipo) => {
      const itemsByTipo = tipo.descriptions.map((string) => {
        const item = {
          tipoDato: tipo._id,
          descripcionDato: string
        }
        return item
      })
      listaDatos.push(...itemsByTipo)
    })
    const data = {
      paqueteTuristico: datos.paqueteTuristico,
      listaDatos: listaDatos
    }

    const newDato = await postData(
      `${process.env.URI_API}/api-cieneguilla-service/otros-datos`,
      data
    )
    if (newDato.code === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Listo',
        text: 'Se han guardado los datos correctamente...!'
      })
    }
  }

  // ============ MOSTRAR DATOS DE PAQUETE ================

  const showDatosPaquete = () => {
    const paqueteSelect = datos.paqueteTuristico
  }

  useEffect(() => {
    // ----------- ID Paquete -------------
    const getIdPaquete = () => {
      const url = window.location.href
      const obj = new URL(url)
      const path = obj.pathname
      const idPaquete = path.split('/').pop()
      return idPaquete
    }
    setDatos({ ...datos, paqueteTuristico: getIdPaquete() })
    displayTiposDatos(getIdPaquete())
    showDatosPaquete()
  }, [])

  return (
    <>

      <HeaderAdmin title="Registro de otros datos" />
      <div className="container">
        {
          isLoading
            ? <LoaderOtrosDatos />

            : <div className="body__">
              {datos.tipos?.map((item, index) => {
                return (
                  <OtrosDatosForm
                    key={index}
                    tipo={item}
                    index={index}
                  />
                )
              })}
            </div>
        }
      </div>

      <footer className="foot">
        <Button
          label="Ir atrás"
          variant="outline"
          width={139}
          onClick={() => irAtras(id)}
        />
        <Button label="Guardar" width={139} onClick={() => handleSubmit()} />
      </footer>
      <style jsx>
        {`
          .body__ {
            border: 1px solid rgba(0, 0, 0, 0.3);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 8px;
            padding: 50px 35px;
            margin: 50px 120px 174px;
          }

          .foot {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            height: 100px;
            padding: 0px 12rem;
            justify-content: flex-end;

            position: fixed;
            width: 100%;
            bottom: 0;
          }
        `}
      </style>
    </>
  )
}

OtrosDatosContainer.layout = 'Admin'
