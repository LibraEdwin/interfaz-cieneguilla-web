import React, { useEffect, useState } from 'react'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import FooterAdmin from '@/components/Admin/FooterAdmin'
import Input from '@/components/common/Input'
import OtrosDatosForm from '@/components/OtrosDatosForm/OtrosDatosForm'
import Image from 'next/dist/client/image'
import Router from 'next/router'

const buttonsFooter = [
  {
    label: 'Ir atrás',
    variant: 'outline',
    width: '139px',
    handleOnClick: () => irAtras()
  },
  {
    label: 'Guardar',
    width: '139px'
  }
]

const irAtras = () => {
  Router.push('/admin/registrar-paquete')
}

const RegistroOtrosDatos = ({ tiposDatos, idPaqueteTuris }) => {
  return (
    <>
      <HeaderAdmin title="Registro de otros datos" />
      <div className="container">
        <div className="body__">
          {
            tiposDatos.map(tipoDato => {
              return (
                <OtrosDatosForm key={tipoDato._id} titulo={tipoDato.nombreTipoDato} idPaqueteTuris={getIdPaquete} idTipoDato={tipoDato._id}/>
              )
            })
          }
          {/* <OtrosDatosForm  titulo="el programa incluye" />
          <OtrosDatosForm  titulo="no incluye" />
          <OtrosDatosForm  titulo="¿qué llevar?"/>
          <OtrosDatosForm  titulo="costos que no incluye"/> */}
        </div>
      </div>

      <FooterAdmin buttons={buttonsFooter} />
      <style jsx>{`
            .body__{
              border: 1px solid rgba(0, 0, 0, 0.3);
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
              border-radius: 8px;
              padding: 50px 35px;
              margin: 50px 120px 174px;
            }
            
      `}
      </style>
    </>
  )
}

export default RegistroOtrosDatos

export async function getServerSideProps () {
  const urlTiposDatos = `${process.env.URI_API}/api-cieneguilla-service/tipos-dato/`
  const resTiposDatos = await fetch(urlTiposDatos)
  const dataTiposDatos = await resTiposDatos.json()
  return {
    props: {
      tiposDatos: dataTiposDatos.body
    }
  }
}

RegistroOtrosDatos.layout = 'Admin'
