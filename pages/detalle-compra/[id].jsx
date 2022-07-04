import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getData } from '@/lib/Api'
import Button from '@/components/common/Button'
import moment from 'moment'
import { formatDate, formatHour, formatWithHour } from '@/lib/util'
import { useRouter } from 'next/router'
// import sgMail from "@sendgrid/mail";



const DetalleCompra = ({ dataNota }) => {
  const { montoPago, cliente, paqueteTuristico, salidaProgramada, pasajeros } = dataNota
  const [fechaSalida, setFechaSalida] = useState(undefined)
  const [dataMap, setDataMap] = useState({})
  const { isFallback } = useRouter()

  if (isFallback) {
    return <div> Página cargando .... </div>
  }

  const handleShare = async (numeroComprobante) => {

    try {
      await navigator.share({ title: "Comprobante de compra - CTT", url: `${process.env.URI_WEB}/detalle-compra/${numeroComprobante}` });
      console.log("Data was shared successfully");
      // alert("Dirección fué compartida");
    } catch (err) {
      console.error("Share failed:", err.message);
      // alert("Share failed:", err.message);
    }
  }

  // const handleSendMail = () =>{


  // sgMail.setApiKey('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')
  // const msg = {
  //   to: 'jorge.winder@imterfaz.app', // Change to your recipient
  //   from: 'jorge.winder@gmail.com', // Change to your verified sender
  //   subject: 'Nota de venta - Cieneguilla Travel Tours',
  //   text: 'Mira el detalle de compra de tu tour',
  //   html: '<strong>Hola, Jorge.</strong><br/><br/>Gracias por tu compra<br/><br/>Mira tu detalle de compra, aquí:',
  // }
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log('Email sent')
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })

  // }

  useEffect(() => {
    setFechaSalida(formatDate(salidaProgramada.fechaSalida))
    // const formatDateSalida = new Date(salidaProgramada.fechaSalida).toLocaleDateString()
    // setFechaSalida(formatDateSalida)
    setDataMap(JSON.parse(localStorage.getItem('dataMap')))

    // handleSendMail()
  }, [salidaProgramada])

  return (
    <>

      {/* <div id="page">
        <h3>PDF for Test</h3>
        <p>Here is some content for testing!!</p>
      </div> */}



      <section className="details">
        <div className="details__group">
          <div className='details__action'>
            <div><button className="btn" onClick={() => window.print()}>IMPRIMIR</button></div>
            <div><button className="btn" onClick={() => handleShare(dataNota._id)}>COMPARTIR EN ...</button></div>
            {/* <div><button className="btn" onClick={() => handlePrint()}>DESCARGAR</button></div> */}
            {/* <button id="btn">Generate</button> */}
          </div>
          <h3 className="details__title">Detalle de su compra</h3>
          <ul className="details__list">
            <li className="nota-code">
              <strong>N° Nota venta:</strong>
              <span>{dataNota._id}</span>
            </li>
            <li>
              <strong>Titular:</strong>
              <span>{cliente.nombre}</span>
            </li>
            {dataMap && (
              <>
                <li>
                  <strong>Número de tarjeta:</strong>
                  <span>{dataMap.CARD}</span>
                </li>
                <li>
                  <strong>Marca de la tarjeta:</strong>
                  <span>{dataMap.BRAND}</span>
                </li>
                <li>
                  <strong>N° de pedido:</strong>
                  <span>{dataMap.ORDER}</span>
                </li>
              </>
            )}
            <li>
              <strong>Fecha y hora del pedido:</strong>
              <span>{formatWithHour(dataNota.fechaPago)}</span>
            </li>
            <li>
              <strong>Tipo de moneda:</strong>
              <span>Soles</span>
            </li>
            <li>
              <strong>Documento:</strong>
              <span>{cliente._id}</span>
            </li>
            <li>
              <strong>Paquete o Full Day:</strong>
              <span>{salidaProgramada.paqueteTuristico.nombrePaquete}</span>
            </li>
            <li>
              <strong>Fecha de salida:</strong>
              <span>{fechaSalida}</span>
            </li>
            <li>
              <strong>Cantidad de pasajeros:</strong>
              <span>{pasajeros.length}</span>
            </li>

          </ul>
        </div>
        <div className="details__group">
          <h3 className="details__title">Detalle de los pasajeros</h3>
          {pasajeros?.map((pasajero, index) => {
            const { _id, nombre, detalleSalida: { lugarEmbarque, horaSalida } } = pasajero
            return (
              <ul key={pasajero._id} className="details__list">
                <li>
                  <strong>Pasajero {index + 1}:</strong>
                  <span>{nombre}</span>
                </li>
                <li>
                  <strong>Documento:</strong>
                  <span>{_id}</span>
                </li>
                <li>
                  <strong>Punto de embarque:</strong>
                  <span>{lugarEmbarque.nombre}</span>
                </li>
                <li>
                  <strong>Hora de salida:</strong>
                  <span>{formatHour(horaSalida)}</span>
                </li>
                <li>
                  <strong>Referencia embarque:</strong>
                  <span>{lugarEmbarque.referencia}</span>
                </li>
              </ul>
            )
          })}
          <strong className="details__amount">Monto cancelado: <span>S/ {montoPago}</span></strong>
          <strong className="details__paragraph title">¡GRACIAS POR TU COMPRA!</strong>
          <p className="text-center"><strong>Te llegará un correo con el detalle de tu compra</strong> </p>
          <p className="details__paragraph bg-gray p-3">
            <strong>IMPORTANTE:</strong>
            Un día antes de tu viaje su guía se comunicará con ud. (9 pm), de no ser así, llamar a
            la agencia. Es obligatorio documento de identificación, doble mascarilla o KN-95, carnet de
            vacunación (3 dosis) y boleto de compra. Los asientos son por orden de llegada. En caso uno de
            sus integrantes falte, no se hacen devoluciones. Cambios de fecha con 96 hrs de anticipación
            (Consultar penalidad). Leer los términos y condiciones.
          </p>
          {/* <strong className="details__paragraph">¡TE HEMOS ENVIADO UN CORREO!</strong>
          <p className="details__paragraph">
            Revisa tu correo electrónico. Un día antes de ti viaje, tu guía se
            comunicará contigo. Además tendrás adjunto tu <strong> boleto digital, declaración jurada y Protoclos Covid-19. </strong>
          </p> */}
        </div>
      </section>
      <style jsx>{`
        .text-center  {
          text-align: center;
        }
        .bg-gray {
          background: rgba(0,0,0,0.05);
          border-radius: 1rem;
          font-weight: 500;
        } 
        .p-3 {
          padding: 1.5rem;
        }
        .nota-code {
          display: flex;
          align-items: flex-end;
        }
        .nota-code span{
          font-weight: 500;
          font-size: 30px;
        }
        .details {
          max-width: 550px;
          margin: 4rem auto 8rem auto;
          padding: 0 1rem;
        }

        .details__action{
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        
        .details__action button{
          margin: 5px;
        }

        .details__title {
          text-align: center;
          color: var(--fourth-color);
          text-transform: uppercase;
          border-bottom: 1px solid var(--fourth-color);
          width: 100%;
          padding-bottom: 1rem;
          margin-top: 2rem;
        }

        .details__group {
          margin-bottom: 3rem;
        }

        .details__list {
          max-width: 450px;
          margin: 30px auto 0 auto;
        }

        .details__list li {
          color: var(--fourth-color);
          display: flex;
          flex-wrap: wrap;
          font-size: 18px;
          margin-bottom: .5rem;
        }

        .details__list li strong {
          margin-right: .5rem;
        }

        .details__amount {
          margin: 1.5rem 0 2.5rem 0;
          text-align: center;
          display: block;
          color: var(--fourth-color);
          font-size: 18px;
        }

        .details__amount span {
          font-size: 24px;
          margin-left: 1rem;
        }

        .details__paragraph {
          display: block;
          color: var(--fourth-color);
          text-align: center;
          font-size: 18px;
          line-height: 1.4rem;
          text-align: justify;
        }
        
        .title {
          margin-bottom: 2rem;
          text-align: center;
          text-decoration-line: none;
        }

        .btn {
          background: var(--main-color);
          border-style: none;
          border-radius: 0.5rem;
          color: white;
          padding: 0.5rem 1rem;
          cursor: pointer;
          margin: 0 auto;
          display: block;
        }

        @media print {
          .btn,
          .details__paragraph {
            display: none;
          }
        }
      `}</style>
    </>
  )
}


export async function getServerSideProps({ params }) {
  const { id } = params
  const notaVenta = await getData(`${process.env.URI_API}/api-cieneguilla-service/notas-venta/${id}`)
  return {
    props: {
      dataNota: notaVenta
    }
  }
}

export default DetalleCompra
