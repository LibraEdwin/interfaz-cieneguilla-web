import moment from 'moment'
import Image from 'next/image'
import ModalEmbarques from './Embarques'
import Button from '@/components/common/Button'
import Select from '@/components/common/Select'
import React, { useState, useEffect, useContext } from 'react'
import IconCalendar from '@/components/icons/calendar-icon.svg'
import IconFlecha from '@/components/icons/flecha.svg'
import IconHora from '@/components/icons/hora.svg'
import IconBus from '@/components/icons/bus.svg'
import { InputsCtx } from '@/context/InputsContext'
import { NotaVentaCtx } from '@/context/NotaVentaCtx'
import { formatDate } from '@/lib/util'
import { errorAlert } from '@/lib/alerts'

const ModalSelectFecha = ({ closeModalFechas, idPaquete, page, slug }) => {
  const { inputs, setInputs } = useContext(InputsCtx)
  const { notaVenta, setNotaVenta } = useContext(NotaVentaCtx)

  const [loading, setLoading] = useState(true)
  const [selectDate, setSelectDate] = useState()
  const [salidasState, setSalidasState] = useState([])
  const [embarkSelected, setEmbarkSelected] = useState(0)
  const [puntosEmbarque, setPuntosEmbarque] = useState([])
  const [selectCurrentDate, setSelectCurrentDate] = useState(null)
  const [salidasPorPaquete, setSalidasPorPaquete] = useState([])

  /* btn comprar fecha seleccionada desktop */
  const comprarPaquetePorFecha = (key, e) => {
    setSelectDate(key)
    const idSalida = salidasPorPaquete.filter(salida => salida.visibility === true)[key]._id
    const salidaProgramada = salidasPorPaquete[key]
    const detalleSalidaId = salidaProgramada.detalle[embarkSelected]._id

    window.location = `/paquetes-y-full-days/${slug}/comprar?detalle=${detalleSalidaId}&salida=${idSalida}`
  }

  /* btn seleccionar fecha - desktop */
  const handleSelectDate = async (key) => {
    // console.log(salidasPorPaquete)
    setSelectDate(key)
    const salidaProgramada = salidasPorPaquete.filter(salida => salida.visibility === true)[key]
    const fechaSalidaSeleccionada = salidaProgramada.fechaSalida
    const idSalida = salidaProgramada._id

    const detalleSalidaId = salidaProgramada.detalle[embarkSelected]._id
    const embarqueNombre = salidaProgramada.detalle[embarkSelected].lugarEmbarque.nombre
    const horaElegida = salidaProgramada.detalle[embarkSelected].horaSalida

    const agregarLugarEmbarquePasajeroUno = notaVenta.pasajeros.map((pasajero, index) => index === 0 ? { ...pasajero, detalleSalida: detalleSalidaId, horaSalida: horaElegida } : { ...pasajero, detalleSalida: detalleSalidaId, horaSalida: horaElegida })

    setInputs({ ...inputs, salidaProgramada: salidaProgramada, lugarEmbarqueId: detalleSalidaId, lugarEmbarque: embarqueNombre, fechaSalida: fechaSalidaSeleccionada, flag: true, quitModalA: false })
    setNotaVenta({ ...notaVenta, pasajeros: agregarLugarEmbarquePasajeroUno, salidaProgramada: idSalida })
  }

  /* Cerrando modal fechas mobile */
  const closeModal = (e, index) => {
    setInputs({ ...inputs, quitModalA: false })
    closeModalFechas(false)
  }

  /* index embarque seleccionado desktop */
  const handleCurrentEmbark = ({
    target: {
      value,
      selectedOptions: [{
        dataset: { set }
      }]
    }
  }) => {

    const filtrarDatos = salidasPorPaquete
      .filter(salida => salida.visibility === true)
      .map(salida => {
        const detallEcontrado = salida.detalle.find(detalle => detalle._id === Number(value))

        if (detallEcontrado) {
          return { ...salida, detalle: detallEcontrado }
        }
        return { ...salida, detalle: salida.detalle[0] }
      })

    setEmbarkSelected(set)
    setSalidasState(filtrarDatos)
  }

  /* =============== DATOS MOVILE ================= */

  /* index fecha seleccionada mobile */
  const handleCurrentDate = (key) => {
    setSelectCurrentDate(key)
  }

  /* pasar fecha seleccionada mobile */
  const handleNext = (e) => {
    const salidaSeleccionada = salidasPorPaquete[selectCurrentDate]
    const fechaSalidaSeleccionada = salidaSeleccionada.fechaSalida
    const idSalidaSeleccionada = salidaSeleccionada._id

    const detalleSalida = salidaSeleccionada.detalle.map(item => item)
    const embarquesBySalida = detalleSalida.map(embarque => embarque.lugarEmbarque)

    setNotaVenta({ ...notaVenta, salidaProgramada: idSalidaSeleccionada })
    setInputs({ ...inputs, embarques: embarquesBySalida, fechaSalida: fechaSalidaSeleccionada, salidaProgramada: salidaSeleccionada, quitModalB: true, flag: true })
  }

  /* ============= FORMATEANDO DATOS DE FECHAS Y HORAS ============= */
  function parseFechas(item) {
    const date = item.split('T')
    const parts = date[0].split('-')
    return parts[2] + '/' + parts[1]
  }

  function parseFechasDesktop(item) {
    const date = item
    const newFormat = moment(date).format('DD/MM/YYYY')
    return newFormat
  }

  function parseHoras(obj) {
    return `${obj.hora.toString().padStart(2, '0')}:${obj.minutos
      .toString()
      .padStart(2, '0')} ${obj.meridiano.toUpperCase()}`
  }

  /* Listar embarques */
  const lugaresEmbarque = async () => {
    const res = await fetch(
      `${process.env.URI_API}/api-cieneguilla-service/lugares-embarque`
    )
    const json = await res.json()
    const data = await json.body
    setPuntosEmbarque(data)
  }

  useEffect(async () => {
    /* Salidas programadas por Paquete */
    const resSalidasByPaquete = await fetch(`${process.env.URI_API}/api-cieneguilla-service/salidas-programadas/paquete-turistico/${idPaquete}`)
    const jsonSalidasByPaquete = await resSalidasByPaquete.json()
    const salidasByPaquete = jsonSalidasByPaquete.body

    const sorteo = salidasByPaquete.sort((a, b) => {
      if (a.fechaSalida < b.fechaSalida) {
        return -1
      }
    })

    setSalidasPorPaquete(sorteo)

    const salidasConPrimerLugarEmbarque = salidasByPaquete.filter(salida => salida.visibility === true).map(salida => { return { ...salida, detalle: salida.detalle[0] } })

    setSalidasState(salidasConPrimerLugarEmbarque)
    lugaresEmbarque()
    setLoading(false)

  }, [idPaquete])

  return (
    <>
      <div className="modal__fechas modal__container">
        <div className="close__button">
          <Image
            src="/images/close.svg"
            width={19}
            height={19}
            onClick={(e) => closeModal(e)}
          />
        </div>
        <h1 className="title">Fechas de salida para el full day</h1>
        <div className="subtitle">
          <IconCalendar fill="var(--fourth-color)" height={20} />
          <h3 className="subtitle__name">Fechas de salida</h3>
        </div>
        <span className="subtitle__detail">
          Estas son nuestras fechas disponibles. <br /> Elige en la que desees
          para viajar.
        </span>
        <div className="container__info">
          {loading && (<span className="loading"></span>)}
          {salidasPorPaquete.filter(salida => salida.visibility === true).map((item, key) => {
            return (
              <button
                className="date__selected"
                key={`btnmd-md-${key}`}
                onClick={() => handleCurrentDate(key)}
              // value={key}
              >
                {parseFechas(item.fechaSalida)}
              </button>
            )
          })}
        </div>
        {loading && (<span className="loading"></span>)}
        <table className="container__info--all">
          <thead>
            <tr className="header" valign="top">
              <th>
                <div className="header__table">
                  <IconCalendar fill="var(--fourth-color)" height={20} />
                  Fechas de salida
                </div>
              </th>
              <th>
                <div className="header__table">
                  <IconBus fill="var(--fourth-color)" height={20} />
                  Puntos de embarque
                </div>
              </th>
              <th>
                <div className="header__table">
                  <IconHora fill="var(--fourth-color)" height={20} />
                  Hora de salida
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {loading && (<span className="loading"></span>)} */}
            {salidasState.length > 0
              ? salidasState.map((salida, index) => {
                return (
                  <tr key={index}>
                    <td>{formatDate(salida.fechaSalida)}</td>

                    <td className="option__embarque">
                      <Select
                        name="embarques"
                        height={{ xs: 40 }}
                        width={{ md: 214 }}
                        bg="white"
                        fontSize="18"
                        onChange={(e) => handleCurrentEmbark(e)}
                        defaultValue={salidasPorPaquete[index].detalle[0]._id}
                      >
                        <option key="" disabled>Embarque</option>
                        {salidasState.length > 0
                          ? salidasPorPaquete[index].detalle.map((detalle, ind) => {
                            return (
                              <option key={detalle._id} data-set={ind} htmlFor={detalle._id} value={detalle._id}>{detalle.lugarEmbarque.nombre}</option>
                            )
                          })
                          : null}
                      </Select>
                    </td>
                    <td className="option__embarque">
                      {parseHoras(salida.detalle.horaSalida)}
                    </td>
                    <td>
                      {page === 'paquete'
                        ? (
                          <Button
                            type="submit"
                            font="18px"
                            label="Comprar"
                            color="var(--main-color)"
                            width={{ xs: 156 }}
                            height={{ xs: 40 }}
                            onClick={(e) => comprarPaquetePorFecha(index, e)}
                          />
                        )
                        : (

                          <Button
                            type="submit"
                            font="18px"
                            label="Seleccionar"
                            color="var(--main-color)"
                            width={{ xs: 156 }}
                            height={{ xs: 40 }}
                            onClick={(e) => handleSelectDate(index, e)}
                          />
                        )}
                    </td>
                  </tr>
                )
              })
              : (
                <div className='empty_embarque'>
                  <Image src='/images/bus.png' width={138} height={53} />
                  <p>No hay salidas programadas, por el momento, para este tour. Por favor, regresa en los próximos días.</p>
                </div>
              )
            }
          </tbody>
        </table>
        <section className="puntos__embarque">
          <span>Puntos de embarque:</span>
          <div className="data__embarque">
            <ul className="list__embarque">
              {puntosEmbarque.map((item, ind) => {
                return <li key={ind}>{item.nombre}</li>
              })}
            </ul>
            <ul className="referencias">
              {puntosEmbarque.map((item, index) => (
                <li key={index}>
                  <IconFlecha
                    fill="var(--fourth-color)"
                    height={8}
                    width={26}
                  />
                  {item.referencia}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div className="btn__embarque">
          <Button
            type="submit"
            font="18px"
            label="Continuar"
            color="var(--main-color)"
            width={{ xs: 299 }}
            height={{ xs: 40 }}
            disabled={selectCurrentDate === null}
            onClick={(e) => handleNext(e)}
          />
          {inputs.quitModalB && (
            <ModalEmbarques
              slug={slug}
              page={page}
              salida={salidasPorPaquete[selectCurrentDate]}
              referencias={puntosEmbarque}
              date={setSelectCurrentDate}
            />
          )}
        </div>
      </div>
      <div className="overlay" id="aki" onClick={(e) => closeModal(e)}></div>
      <div className="overlay" id="aka" onClick={() => closeModalFechas(false)}></div>

      <style jsx>{
        /* css */ `
          .modal__fechas {
            width: 339px;
            margin: auto;
            border-radius: 8px;
            background: #ffffff;
            color: var(--fourth-color);
            padding: 24px 20px 60px 20px;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
          }

          .close__button {
            display: flex;
            margin-bottom: 20px;
            justify-content: flex-end;
          }

          .container__info {
            display: grid;
            column-gap: 30px;
            justify-content: center;
            padding: 22px 15px 22px 15px;
            grid-template-columns: 67px 67px 67px;
            margin-bottom: 30px !important;
          }

          .date__selected {
            border: none;
            cursor: pointer;
            font-size: 18px;
            font-weight: 500;
            font-family: Quicksand;
            color: var(--fourth-color);
          }

          .date__selected:focus {
            background: rgba(5, 146, 221, 0.17);
            border: 1px solid #0592dd;
            box-sizing: border-box;
            border-radius: 8px;
            padding: 5px 10px;
            color: #0592dd;
          }

          .container__info--all,
          .puntos__embarque {
            display: none;
          }

          .subtitle__detail {
            text-align: center;
          }

          .loading {
            display: block;
            width: 100%;
            height: 5px;
            position: absolute;
            border-radius: 10px;
            top: 0;
            left: 0;
            background: linear-gradient(90deg, rgba(242,185,6,1) 0%, rgba(6,147,221,1) 35%, rgba(0,212,255,1) 100%);
            animation: animationSlide 2s linear infinite;
          }

          @media screen and (min-width: 992px) {
            .modal__fechas {
              margin: auto;
              width: 954px;
              padding: 24px 27px 30px 27px;
            }

            .title {
              margin: 0px;
            }

            .header {
              height: 40px;
            }

            th {
              width: 215px;
              font-size: 14px;
              text-transform: uppercase;
              text-decoration-line: underline;
            }

            td {
              width: 215px;
              font-size: 18px;
              font-weight: 500;
              line-height: 22px;
              border-spacing: 5px;
            }

            tr {
              height: 50px;
            }

            .header__table {
              display: flex;
              justify-content: center;
              column-gap: 0.7rem;
            }

            .btn__select {
              margin: auto;
            }

            .subtitle,
            .subtitle__detail,
            .container__info,
            .btn__embarque {
              display: none;
            }

            .container__info--all {
              margin: 0 auto;
              width: 863px;
              height: 300px;
              display: flex;
              margin-top: 48px;
              margin-bottom: 18px;
              text-align: center;
              border-radius: 8px;
              background: #ffffff;
              align-items: center;
              padding: 29px 0 26px;
              justify-items: center;
              box-sizing: border-box;
              flex-direction: column;
              border: 1px solid #c4c4c4;
            }

            tbody {
              height: 200px;
              overflow-y: auto;
              overflow-x: hidden;
            }

            .option__embarque {
              width: 215px;
            }

            .puntos__embarque {
              display: block;
              font-size: 14px;
              font-weight: 500;
              line-height: 17px;
            }

            .puntos__embarque span {
              display: flex;
              padding-left: 25px;
              justify-content: flex-start;
            }

            .data__embarque {
              display: flex;
              margin-top: 6px;
              justify-content: start;
              padding-left: 25px;
            }

            li {
              width: auto;
              display: flex;
              margin-bottom: 6px;
              align-items: center;
            }

            .list__embarque {
              margin-right: 12px;
            }

            .list__embarque li::before {
              content: "";
              width: 10px;
              height: 10px;
              display: block;
              margin-right: 8px;
              border-radius: 50%;
              background: #c4c4c4;
            }

            .overlay {
              top: 130px !important;
              backdrop-filter: none;
            }

            .modal__container {
              top: 52% !important;
            }
          }

          .empty_embarque {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
        `
      }</style>
    </>
  )
}

export default ModalSelectFecha
