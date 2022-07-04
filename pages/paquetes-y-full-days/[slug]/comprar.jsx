import React, { useState, useContext, useEffect, useRef } from 'react'
import BackButton from '@/components/common/BackBtn'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import IconCalendar from '@/components/icons/calendar-icon.svg'
import IconEmbarque from '@/components/icons/bus.svg'
import RegistroPasajeroNew from '@/components/Modal/RegistroPasajero/RegistroPasajeroNew'
import ModalPagoVisa from '@/components/Modal/PagoVisa/ModalPagoVisa'
import ModalSelectFecha from '@/components/Modal/Fechas/SelecFecha'
import ModalSignIn from '@/components/Modal/IniciarSecion/SignIn'
import { InputsCtx, InputsProvider } from '../../../context/InputsContext'
import { NotaVentaCtx, NotaVentaProvider } from '@/context/NotaVentaCtx'
import { useGlobalContext } from '@/context/GlobalContext'
import { formatDate, formatToCurrency } from '@/lib/util'
import { errorAlert } from '@/lib/alerts'
import moment from 'moment'
import { useRouter } from 'next/router'

// import Script from 'next/script' 

import { promisify } from "util"
import ModalPagoVisaNet from '@/components/Modal/PagoVisa/ModalPagoVisaNet'

import ModalTerminosCompra from '@/components/Modal/TerminosCompra'

const Comprar = (props) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <div> Página cargando .... </div>
  }

  return (
    <NotaVentaProvider>
      <InputsProvider>
        <ComprarContent {...props} />
      </InputsProvider>
    </NotaVentaProvider>
  )
}



const ComprarContent = ({ paquete, embarque, salida, detalle }) => {
  const { isToken, loggedInClient } = useGlobalContext()
  const { inputs, setInputs } = useContext(InputsCtx)
  const { notaVenta, setNotaVenta, TIPO_COBRO } = useContext(NotaVentaCtx)

  const [numeroPasajeros, setNumeroPasajeros] = useState(1)
  const [montoTotal, setMontoTotal] = useState(paquete.precio)
  const [openModalFechas, setOpenModalFechas] = useState(false)
  const [openModalSignIn, setOpenModalSignIn] = useState(false)
  const [openModalPagoVisa, setOpenModalPagoVisa] = useState(false)
  const [imgPrincipalError, setImgPrincipalError] = useState(false)
  const [openModalRegistroPasajero, setModalRegistroPasajero] = useState(false)
  const [embarques, setEmbarques] = useState([])
  const [aceptTerms, setAceptTerms] = useState(false)

  const [openModalterminos, setOpenModalTerminos] = useState(false)

  function formatoFecha(item) {
    if (item === undefined) {
      return null
    } else {
      const date = item
      const newFormat = moment(date).format('DD/MM/YYYY')
      return newFormat
    }
  }

  const validarDatos = () => {

    const pasajeros = notaVenta.pasajeros
    /*el primer pasajero es el cliente y debe tener un lugar de embarque seleccionado */
    if (!pasajeros[0].detalleSalida) {
      errorAlert('Usted no seleccionado un lugar de embarque')
      return false
    }

    /* salida Programada */
    if (!notaVenta.salidaProgramada) {
      errorAlert('Usted no seleccionado una fecha de viaje')
      return false
    }

    /* el número de pasajeros seleccionados en el inputNumber debe ser igual al numero de pasajeros registrados en el contexto notaventa */
    if (numeroPasajeros !== pasajeros.length) {
      errorAlert(`A seleccionado ${numeroPasajeros} pasajeros, por favor ingrese sus datos`)
      return false
    }

    // -- verificar que los pasajeros tengan todos los datos correctos
    const hayPasajerosSinDatos = pasajeros.find(pasajero => !pasajero._id || !pasajero.detalleSalida || !pasajero.nombre) ?? null

    if (hayPasajerosSinDatos) {
      errorAlert('Por favor verifique que todos los pasajeros tengan los datos correctamente')
      return false
    }

    return true
  }

  const obtenerFechaActual = () => {
    const today = new Date()
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  }

  function changeTimezone(date, ianatz) {

    // suppose the date is 12:00 UTC
    const invdate = new Date(date.toLocaleString('en-US', {
      timeZone: ianatz
    }));

    // then invdate will be 07:00 in Toronto
    // and the diff is 5 hours
    const diff = date.getTime() - invdate.getTime();

    // so 12:00 in Toronto is 17:00 UTC
    return new Date(date.getTime() - diff); // needs to substract
  }

  useEffect(() => {
    const clientId = loggedInClient.id
    const nombreCliente = loggedInClient.nombre
    const celularCliente = loggedInClient.celular
    const paqueteId = `${paquete._id}`
    const fechaActual = obtenerFechaActual()

    const timeLimaPeru = changeTimezone(new Date(), "America/Lima");

    const setData = {
      ...notaVenta,
      tipoCobro: TIPO_COBRO.tarjeta,
      fechaPago: timeLimaPeru,
      fechaRegistro: fechaActual,
      cliente: clientId,
      paqueteTuristico: paqueteId,
      pasajeros: [{ _id: `${clientId}`, nombre: nombreCliente, detalleSalida: detalle || null, celular: celularCliente }],
      salidaProgramada: salida || null
    }

    setNotaVenta(setData)

    if (salida && detalle) {
      fetch(`${process.env.URI_API}/api-cieneguilla-service/salidas-programadas/${salida}`)
        .then(res => res.json())
        .then(data => {
          const { fechaSalida } = data.body
          fetch(`${process.env.URI_API}/api-cieneguilla-service/detalles-salida/${detalle}`)
            .then(res => res.json())
            .then(data2 => {
              const { lugarEmbarque } = data2.body
              setInputs({
                ...inputs,
                flag: true,
                fechaSalida: fechaSalida,
                lugarEmbarqueId: lugarEmbarque._id,
                lugarEmbarque: lugarEmbarque.nombre
              })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }



  }, [loggedInClient])

  const getSalidaYEmbarque = (embarqueId, salidaId) => {
    const salidaSeleccionada = paquete.salidaProgramada.find(salida => salida._id === salidaId)
    const embarques = salidaSeleccionada.lugarEmbarque
    const embarqueSeleccionado = embarques.find(embarque => embarque._id === embarqueId)

    return { salidaSeleccionada, embarqueSeleccionado }
  }

  const handleChangeNumeroPasajeros = (e) => {
    const { value } = e.target
    calcularMontoTotal(paquete.precio, value)
    if (value > notaVenta.pasajeros.length && inputs.isPasajerosSaved) {
      const passengersToAdd = value - notaVenta.pasajeros.length
      const { lugarEmbarque } = notaVenta.pasajeros[0]
      for (let i = 0; i < passengersToAdd; i++) {
        setNotaVenta({ ...notaVenta, pasajeros: [...notaVenta.pasajeros, { _id: '', nombre: '' }] })
      }
    }
  }

  const calcularMontoTotal = (precio, pasajeros) => {
    const total = precio * pasajeros
    setMontoTotal(total)
    setNumeroPasajeros(Number(pasajeros))
  }

  const agregarInformarmacionAdicional = (e) => {
    const { id, checked } = e.target
    const codigo = Number(id.split('-')[1])

    const res = notaVenta.masInfo.map((item) => {
      return item.codigo === codigo ? { ...item, checked } : item
    })

    setNotaVenta({ ...notaVenta, masInfo: res })
  }

  const handleAceptTerms = () => {
    setAceptTerms(true)
    if (aceptTerms) {
      setAceptTerms(false)
    }
  }

  const foo = () => {
    setInputs({ ...inputs, quitModalA: true })
    //   alert('click')
  }

  const handlePagoVisa = () => {
    // validar datos antes de enviar
    if (validarDatos()) {

      // validar información del formulario de pago Visa
      setOpenModalPagoVisa(true)
    }
  }

  return (
    <>
      {/* <Script
              src={`process.env.CONFIG_BTN`}
      /> */}
      <section className="buy-package">
        <div className="container">
          <BackButton
            title="Volver a paquetes y full days"
            to="/paquetes-y-full-days"
          />
          {!isToken && <ModalSignIn closeModalSignIn={setOpenModalSignIn} />}
          <div className="buy-package__form">
            <div className="buy-package__image">
              <img src={imgPrincipalError ? '/images/empty.jpg' : process.env.DOMAIN_IMAGES + paquete.fotoPrincipal} alt="" onError={(e) => setImgPrincipalError(true)} />
            </div>
            <div className="buy-package__content">
              <h1 className="buy-package__title">{paquete.nombrePaquete}</h1>
              <h3 className="buy-package__username">
                Hola, <strong>{loggedInClient.nombre}</strong>
              </h3>
              <div className="buy-package__settings">
                <div className="buy-package__dates">
                  <div className="buy-package__dates-label">
                    <span className="buy-package__text">
                      Elige la fecha de tu viaje:
                    </span>
                  </div>
                  <div className="buy-package__dates-content">
                    <Input
                      value={inputs.fechaSalida ? formatDate(inputs.fechaSalida) : 'Fechas'}
                      readOnly
                      icon={<IconCalendar height={20} />}
                      iconMarginRight={38}
                      // onClick={() => setInputs({ ...inputs, quitModalA: true })}
                      onClick={() => foo()}
                    />
                    {inputs.quitModalA && (
                      <ModalSelectFecha
                        closeModalFechas={setOpenModalFechas}
                        idPaquete={paquete._id}
                        details={setEmbarques}
                      />
                    )}
                  </div>
                </div>
                {inputs.flag
                  ? (
                    <div className="buy-package__dates ">
                      <div className="buy-package__dates-label">
                        <span className="buy-package__text">
                          Tu punto de embarque:
                        </span>
                      </div>
                      <div className="buy-package__dates-content">
                        <Input
                          value={inputs.lugarEmbarque ? inputs.lugarEmbarque : ''}
                          icon={<IconEmbarque height={20} />}
                          iconMarginRight={38}
                          readOnly
                        />
                      </div>
                    </div>

                  )
                  : (
                    <div></div>
                  )}
                <div className="buy-package__passengers">
                  <div className="buy-package__passengers-label">
                    <span className="buy-package__text">
                      Cantidad de pasajeros:
                    </span>
                  </div>
                  <div className="buy-package__passengers-content">
                    <div>
                      <Input type="number" name="pasajeros" min="1" value={numeroPasajeros} onChange={handleChangeNumeroPasajeros} width="60px" />
                    </div>
                    <Button
                      label={inputs.isPasajerosSaved ? 'Ver Pasajeros' : 'Registrar Pasajeros'}
                      color="var(--second-color)"
                      disabled={!(numeroPasajeros > 0 && notaVenta.salidaProgramada)}
                      onClick={() => setModalRegistroPasajero(true)}
                      style={{ "fontSize": "smaller" }}
                    />
                    {openModalRegistroPasajero && (
                      <RegistroPasajeroNew
                        closeModal={setModalRegistroPasajero}
                        expectedCounter={parseInt(numeroPasajeros)}
                        setNumeroPasajeros={setNumeroPasajeros}
                        calcularMontoTotal={calcularMontoTotal}
                        precio={paquete.precio}
                        embs={inputs.salidaProgramada.detalle}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="buy-package__additional">
                <span className="buy-package__text">
                  ¿Hay algo importante que debemos de tener en cuenta al momento
                  de tu viaje?
                </span>
                <ul>
                  {notaVenta.masInfo?.map(item => (
                    <li key={item.codigo} className="checkbox__group">
                      <input type="checkbox" id={`additional-${item.codigo}`} onChange={agregarInformarmacionAdicional} />
                      <label className="buy-package__text" htmlFor={`additional-${item.codigo}`}>
                        {item.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='buy-package__amount-container'>
                <h5 className="buy-package__text-amount">
                  Costo boleto(s):
                </h5>
                <strong>S/{formatToCurrency(montoTotal)}</strong>
              </div>
              <div className="terminos__container">
                {/* <div className="checkbox__group terms" >
                  <input type="checkbox" id="term" onChange={handleAceptTerms}/>
                  <label htmlFor="term">Acepto <a onClick={() => setOpenModalTerminos(true)}><b>Términos y Condiciones</b></a></label>
                </div> */}
              </div>
              <div className="buy-package__amount">
                <div className="checkbox__group terms" >
                  <input type="checkbox" id="term" onChange={handleAceptTerms} />
                  <label htmlFor="term">Acepto <a onClick={() => setOpenModalTerminos(true)}><b>Términos y Condiciones de Compra</b></a></label>
                </div>
                <div className='btn__container'>
                  <Button
                    label="Comprar Ahora"
                    disabled={!aceptTerms}
                    onClick={() => handlePagoVisa()}
                  />
                  {openModalterminos && (
                    <ModalTerminosCompra montoPagar={montoTotal} closeModalTerminos={setOpenModalTerminos} check={setAceptTerms} />
                  )}
                  {openModalPagoVisa && (
                    <ModalPagoVisaNet monto={montoTotal} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{
        /* css */ `
          .fooo {
            background-color: white!important;
            color: red!important;
          }

          .buy-package__image {
            display: none;
          }

          .buy-package__form {
            padding: 2.1rem 0 4rem 0;
          }

          .buy-package__title {
            color: var(--fourth-color);
            font-size: 24px;
            font-weight: bold;
            width: 100%;
            border-bottom: 1px solid var(--fourth-color);
            padding-bottom: 1.2rem;
            margin-bottom: 1rem;
            text-transform: uppercase;
          }

          .buy-package__username {
            width: fit-content;
            padding: 0.7rem 1rem;
            color: var(--fourth-color);
            margin: 1.5rem 0;
            font-size: 18px;
            font-weight: 500;
            background: #F2F2F2;
            border: 1px solid #E8E8E8;
            border-radius: 10px;
          }

          .buy-package__username strong {
            text-transform: uppercase;
          }

          .buy-package__text {
            color: var(--fourth-color);
            font-size: 18px;
            font-weight: 500;
          }

          .buy-package__dates,
          .buy-package__passengers {
            margin-bottom: 1rem;
          }

          .buy-package__dates-label,
          .buy-package__passengers-label {
            margin-bottom: 1.19rem;
          }

          .buy-package__dates-content,
          .buy-package__passengers-content {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .buy-package__additional {
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--fourth-color);
          }

          .buy-package__passengers-content div {
            width: 100px;
          }

          .buy-package__additional span {
            font-size: 14px !important;
            line-height: 22px;
          }

          .buy-package__additional label {
            font-size: 14px !important;
          }

          .buy-package__additional ul li {
            margin-top: 0.75rem;
            font-size: 14px !important;
          }

          .buy-package__additional ul li input {
            margin-right: 0.75rem;
          }

          .buy-package__amount-container {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            border-bottom: 1px solid var(--fourth-color);
          }

          .buy-package__text-amount {
            font-size: 18px;
            color: var(--fourth-color);
            margin: 1rem 0;
          }

          .buy-package__amount-container strong {
            font-size: 28px;
            color: var(--fourth-color);
            margin-left: 1rem;
          }

          .container {
            padding: 0 2.4rem;
          }

          .checkbox__group label:before {
            padding: 7px;
            border-radius: 2px;
            margin-right: 14px;
          }

          .checkbox__group input:checked + label:after {
            top: 3px;
            left: 6px;
            width: 3px;
            height: 10px;
          }

          .checkbox__group input:checked + a:after {
            top: 3px;
            left: 6px;
            width: 3px;
            height: 10px;
          }

          .terminos__container {
            margin-top: 1rem;
            font-size: 14px !important;
            font-weight: 500;
            color: var(--fourth-color);
            text-align: end;
          }

          .terms {
            margin-top: 1rem;
            margin-bottom: 1rem;
            font-size: 18px !important;
            font-weight: 500;
            color: var(--fourth-color);
            text-align: end;    
            width: 100%;     
          }

          .terms b {
            color: var(--main-color)
          }

          .buy-package__amount {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin: 0;
            align-items: flex-end;
            // margin-left: 5.3rem;
          }

          .btn__container {
            width: 100%
          }

          @media screen and (min-width: 768px) {
            .buy-package__form {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 3rem;
              width: 100%;
            }

            .buy-package__image {
              display: block;
            }

            .buy-package__image img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          @media screen and (min-width: 960px) {
            .buy-package__form {
              gap: 4rem;
            }

            .buy-package__dates,
            .buy-package__passengers {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }

            .buy-package__dates-content {
              width: 322px;
            }

            .buy-package__amount {
              display: flex;
              justify-content: flex-end;
            }

            .buy-package__amount {
              display: flex;
              flex-direction: column;
              width: 65%;
              margin: 0;
              align-items: flex-end;
              margin-left: 5.3rem;
              margin-left: auto;
            }

            .terminos__container {
              font-size: 18px!important;
            }
          }

          @media screen and (min-width: 1200px) {
            .buy-package__form {
              gap: 3rem !important;
            }

            .buy-package__form {
              padding: 1rem 2rem 4rem 2rem;
            }

            .buy-package__image img {
              height: 500px;
              width: 500px;
            }

            .buy-package__content {
              width: 500px;
            }

            .buy-package__dates,
            .buy-package__passengers {
              margin-bottom: 1.5rem;
            }

            .buy-package__dates-content {
              width: 270px;
            }

            .buy-package__passengers-content {
              width: 270px;
            }

            .buy-package__dates-label,
            .buy-package__passengers-label {
              margin-bottom: 0rem;
            }

            .buy-package__additional span {
              font-size: 18px !important;
            }

            .buy-package__additional label {
              font-size: 18px !important;
            }

            .buy-package__additional ul li {
              margin-top: 1rem;
            }

            .buy-package__text-amount {
              margin: 2rem 0;
            }

            .checkbox__group input:checked + label:after {
              top: 5px;
            }

            .terminos__container {
              font-size: 18px!important;
            }

            .buy-package__amount {
              width: 83%
            }
          }

          @media screen and (min-width: 1400px) {
            .buy-package__image img {
              height: 534px;
              width: 592px;
            }

            .buy-package__content {
              width: 490px;
            }
          }
        `
      }</style>
    </>
  )
}



export async function getServerSideProps(context) {
  const { query, req, res } = context
  const { embarque, salida, detalle, slug } = query
  const id = slug.split('-')[0]

  const selectEmbarque = Number(embarque) ?? false
  const selectSalida = salida ?? false
  const selectDetalle = Number(detalle) ?? false

  const resPaquetes = await fetch(`${process.env.URI_API}/api-cieneguilla-service/paquetes-turisticos/${id}`)
  const paquetesJson = await resPaquetes.json()
  const paquete = paquetesJson.body

  return {
    props: {
      paquete,
      embarque: selectEmbarque,
      salida: selectSalida,
      detalle: selectDetalle
    }
  }


}

export default Comprar
