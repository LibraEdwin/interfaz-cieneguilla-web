import React, { useContext, useEffect, useState } from 'react'
import Input from '@/components/common/Input'
import Table from '@/components/Table/Table'
import ModalBtn from '@/components/common/ModalBtn'
import Select from '@/components/common/Select'
import Image from 'next/image'
import moment from 'moment'
import { getData } from '@/lib/Api'
import { errorAlert, successAlert } from '@/lib/alerts'
import { PaqueteTuristicoCtx } from '@/context/paqueteTuristicoCtx'
import { SalidaProgramadaCtx, SalidaProgramadaProvider } from '@/context/SalidaProgramadaCtx'

// const headers = [
//   { _id: 'h1', name: 'Fecha de salida' },
//   { _id: 'h2', name: 'Fecha de retorno' },
//   { _id: 'h3', name: 'Hora de retorno' },
//   { _id: 'h4', name: 'Lugares de embarque' }
// ]

const ModalRegistroSalidas = ({ closeModal }) => {
  return (
    <SalidaProgramadaProvider>
      <RegistrarSalidas closeModal={closeModal} />
    </SalidaProgramadaProvider>
  )
}

const RegistrarSalidas = ({ closeModal }) => {
  const { paqueteTuristico } = useContext(PaqueteTuristicoCtx)
  const [lugaresEmbarque, setLugaresEmbarque] = useState([])
  const [salidasPaquete, setSalidasPaquete] = useState([])
  const { salidaProgramada, setSalidaProgramada } = useContext(SalidaProgramadaCtx)
  const [detalleSalida, setDetalleSalida] = useState({
    details: [{}],
    salidaProgramada: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    /* Embarques */
    const embarques = await getData(`${process.env.URI_API}/api-cieneguilla-service/lugares-embarque`)
    setLugaresEmbarque(embarques)

    /* ID Paquete */
    setSalidaProgramada({ ...salidaProgramada, paqueteTuristico: paqueteTuristico.id })

    /* Salidas programadas por Paquete */
    const urlSalidasByPaquete = `${process.env.URI_API}/api-cieneguilla-service/salidas-programadas/paquete-turistico/${paqueteTuristico.id}`
    const resSalidasByPaquete = await fetch(urlSalidasByPaquete)
    const jsonSalidasByPaquete = await resSalidasByPaquete.json()
    const dataSalidasByPaquete = jsonSalidasByPaquete.body

    setSalidasPaquete(dataSalidasByPaquete)
    setLoading(false)
  }, [])

  // --------------------- REGISTRAR SALIDAS PROGRAMADAS  ------------------------ //

  function validarSalidaProgramada (salidaProgramada) {
    let error = ''

    if (!salidaProgramada.fechaSalida) {
      error = 'Agregue una fecha de salida'
    }

    if (!salidaProgramada.fechaRetorno) {
      error = 'Agregue una fecha de retorno'
    }

    if (!salidaProgramada.horaRetorno.hora) {
      error = 'Agregue una hora de retorno'
    }

    if (moment(salidaProgramada.fechaSalida).isBefore(moment(new Date()))) {
      error = 'La fecha de salida debe ser mayor a la fecha actual'
    }

    if (moment(salidaProgramada.fechaRetorno).isBefore(salidaProgramada.fechaSalida)) {
      error = 'La fecha de retorno debe ser mayor o igual que la fecha de salida'
    }
    // if (!salidaProgramada.horaSalida) {
    //   error = 'Agregue una hora de salida'
    // }

    // if (salidaProgramada.lugarEmbarque < 1) {
    //   error = 'Debe agregar almenos un lugar de embarque'
    // }

    return error
  }

  async function handleRegistrarSalidaProgramada () {
    /* Datos para registrar salida */
    const bodySalidaProgramada = { ...salidaProgramada }
    const haveError = validarSalidaProgramada(bodySalidaProgramada)

    if (haveError === '') {
      /* Crear salida programada */
      const addSalida = await fetch(`${process.env.URI_API}/api-cieneguilla-service/salidas-programadas/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodySalidaProgramada)
      })

      const response = await addSalida.json()
      const salidaRegistrada = response.body

      if (response.code === 500) {
        errorAlert(salidaRegistrada.error, 'Importante')
      } else {
        /* Setear datos para detalle de salida */
        const obj = detalleSalida
        obj.salidaProgramada = salidaRegistrada._id
        setDetalleSalida({ ...detalleSalida, obj })

        /* Crear detalle de salida */
        const resDetalleSalida = await fetch(
          `${process.env.URI_API}/api-cieneguilla-service/detalles-salida/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(detalleSalida)
          }
        )

        const detalleJson = await resDetalleSalida.json()
        const detalleSalidaRegistrado = detalleJson.body

        successAlert('Se registró la salida correctamente')

        const urlSalidasByPaquete = `${process.env.URI_API}/api-cieneguilla-service/salidas-programadas/paquete-turistico/${paqueteTuristico.id}`
        const resSalidasByPaquete = await fetch(urlSalidasByPaquete)
        const jsonSalidasByPaquete = await resSalidasByPaquete.json()
        const dataSalidasByPaquete = jsonSalidasByPaquete.body        
        setSalidasPaquete(dataSalidasByPaquete)
        
        // setSalidaProgramada(detalleSalidaRegistrado)
      }
    } else {
      // pintar error
      errorAlert(haveError)
    }
  }

  /* -------------------- CAPTURAR VALORES A REGISTRAR ----------------------- */

  const handleDate = (e) => {
    const { value, name } = e.target
    setSalidaProgramada({
      ...salidaProgramada,
      [name]: moment(value).format('YYYY/MM/DD')
    })
  }

  const handleReturnTime = (e) => {
    let { value, name } = e.target
    value = value + ':00'
    const time = moment(value, 'HH:mm').format('hh:mm A')
    const hour = time.split(':')[0]
    const min = time.split(':')[1].slice(0, 2)
    const mer = time.split(' ')[1].toLowerCase()
    setSalidaProgramada({
      ...salidaProgramada,
      [name]: {
        hora: hour,
        minutos: min,
        meridiano: mer
      }
    })
  }

  const handleDepartureTime = (e) => {
    const index = e.target.id
    let { value, name } = e.target
    value = value + ':00'
    const time = moment(value, 'HH:mm').format('hh:mm A')
    const hour = time.split(':')[0]
    const min = time.split(':')[1].slice(0, 2)
    const mer = time.split(' ')[1].toLowerCase()

    const horaSalida = {
      hora: hour,
      minutos: min,
      meridiano: mer
    }

    const localDetails = [...detalleSalida.details]
    localDetails[index].horaSalida = horaSalida
    setDetalleSalida({ ...detalleSalida, details: localDetails })
  }

  const handleLugaresEmbarque = (e) => {
    const index = e.target.id
    const localDetails = [...detalleSalida.details]
    localDetails[index].lugarEmbarque = parseInt(e.target.value)
    setDetalleSalida({ ...detalleSalida, details: localDetails })
  }

  const handleAddEmbarque = () => {
    const detail = {}
    const localDetails = [...detalleSalida.details]
    if (localDetails.length < lugaresEmbarque.length) {
      localDetails.push(detail)

      const localDs = { ...detalleSalida }
      localDs.details = localDetails
      setDetalleSalida(localDs)
    }
  }

  return (
    <>
      <div className="modal__salidas modal__container" >
        <div className="btn-close">
          <img
            src="/images/close.svg"
            width="19px"
            height="19px"
            alt="cerrar"
            onClick={closeModal}
          />
        </div>
        <div className="modal__fechaSalida">
          <label>Fecha de salida</label>
          <Input type="date" name="fechaSalida" onChange={handleDate} />
        </div>
        <div className="modal__fechaRetorno">
          <label>Fecha de retorno</label>
          <Input type="date" name="fechaRetorno" onChange={handleDate} />
        </div>
        <div className="modal__horaRetorno">
          <label>Hora de retorno</label>
          <Input type="time" name="horaRetorno" onChange={handleReturnTime} />
        </div>

        <div className="modal__salidas--boarding">
          <div className="labels">
            <label className='label-emb'>Lugares de embarque</label>
            <label className="label-hora">Hora de Salida</label>
          </div>
          {detalleSalida.details.map((item, index) => {
            return (
              <div className="embarques-add" key={index}>
                <div className="number" htmlFor={index}>{index + 1}</div>
                <div className="places">
                  <Select id={index} onClick={(e) => handleLugaresEmbarque(e)}>
                    {lugaresEmbarque.map((embarque, i) => {
                      return (
                        <option key={i} value={embarque._id}>{embarque.nombre}</option>
                      )
                    })}
                  </Select>
                </div>
                <div className="hora-container">
                  <Input type="time" name="horaSalida" onChange={handleDepartureTime} id={index} />
                </div>
              </div>
            )
          })}
          <div className="container-btn">
            <button
              className="btn-add"
              type="submit"
              onClick={() => handleAddEmbarque()}
            >
              <Image src="/icons/add.svg" width={19} height={20} />
              Agregar
            </button>
          </div>
        </div>
        <div className="modal__table">
          {loading && (<span className="loading"></span>)}
          <Table
            // headers={headers}
            icon="deleteregistro.svg"
            listaSalidas={salidasPaquete}
            setSalidas={setSalidasPaquete}
            isLoading={loading}
          />
        </div>
        <div className="modal__save">
          <ModalBtn
            label="Registrar salida"
            icon="save.svg"
            onClick={handleRegistrarSalidaProgramada}
          />
        </div>
      </div>
      <div className="overlay-admin" onClick={closeModal}></div>
      <style jsx>{`       

        .modal__salidas {
          display: grid;
          grid-template-columns: 190px auto 190px;
          grid-gap: 15px;
          width: 938px;
          justify-content: center;
        }

        .btn-close {
          grid-column: 1/4;
          grid-row: 1/2;
          display: flex;
          justify-content: flex-end;
          cursor: pointer;
        }   
       
        .modal__fechaSalida {
          grid-column: 1/2;
          grid-row: 2/3;
        }

        .modal__salidas--boarding {
          grid-column: 2/3;
          grid-row: 2/4;
          column-gap: 1rem;
        }

        .labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 700;
          color: var(--border-color);
          // grid-column: 1/3;
        }

        .label-emb {
          margin-left: 1.8rem!important;
        }

        .label-hora {
          font-size: 12px;
          font-weight: 700;
          color: var(--border-color);
          display: inline-block;
          margin: 5px;
          margin-right: 5.6rem;
        }

        .embarques-add {
          display: grid;
          grid-template-columns: 10px 200px 180px;
          column-gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .number {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #585858;
          font-size: 14px;
        }

        .places {
          grid-gap: 30px;
          font-size: 18px;
          width: 100%;
        }       

        .container-btn {
          display: flex;
          justify-content: flex-start;
          margin-left: 1.6rem;
          margin-top: 1rem;
        }

        .btn-add {
          font-size: 18px;
          font-family: Quicksand;
          font-weight: bold;
          display: flex;
          align-items: center;
          cursor: pointer;
          gap: 8px;
          background: none;
          border: none;
        }

        .modal__fechaRetorno {
          grid-column: 3/4;
          grid-row: 2/3;
          max-width: 214px,
        }

        .modal__horaRetorno {
          grid-column: 3/4;
          grid-row: 3/4;
        }

        .places > div {
          display: flex;
          align-items: center;
          height: 40px;
        }

        .places > div label {
          padding-left: 10px;
        }

        .modal__table {
          padding-top: 10px;
          grid-column: 1/4;
          grid-row: 4/5;
        }

        .modal__save {
          grid-column: 1/4;
          padding: 10px 10px 0px 10px;
        }

        .modal__salidas div > label:first-child {
          font-size: 12px;
          font-weight: 700;
          color: var(--border-color);
          display: inline-block;
          margin: 5px;
        }

        .checkbox__group label:before {
          width: 5px;
          height: 5px;
        }

        .modal__container {
          box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.2) !important;
          height: 620px;     
          overflow-y: auto;   
          overflow-x: hidden; 
        }

        .loading {
          display: block;
          width: 33%;
          height: 5px;
          position: absolute;
          border-radius: 10px;
          top: 0;
          left: 300px;
          background: linear-gradient(90deg, rgba(242,185,6,1) 0%, rgba(6,147,221,1) 35%, rgba(0,212,255,1) 100%);
          animation: animationSlide 2s linear infinite;
        }

        .results {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .not-found {
          position: absolute;
          // bottom: 30%;
          left: 0;
          right: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          color: rgba(3, 1, 1, 0.2);
        }

        .not-found > span {
          width: 100%;
          display: block;
          font-size: 1rem;
          font-weight: 500;
          margin-top: 1.6rem;
          text-align: center;
        }
      `}</style>
    </>
  )
}

// export async function getServerSideProps ({ params }) {
//   const idPaquete = params.
//   const urlTiposDatos = `${process.env.URI_API}/api-cieneguilla-service/tipos-dato/`
//   const resTiposDatos = await fetch(urlTiposDatos)
//   const dataTiposDatos = await resTiposDatos.json()

//   const urlSalidasByPaquete = `${process.env.URI_API}/api-cieneguilla-service/salidas-programadas/paquete-turistico/${paqueteTuristico.id}`
//   const resSalidasByPaquete = await fetch(urlSalidasByPaquete)
//   const jsonSalidasByPaquete = await resSalidasByPaquete.json()
//   const dataSalidasByPaquete = jsonSalidasByPaquete.body

//   return {
//     props: {
//       tiposDatos: dataTiposDatos.body
//     }
//   }
// }

export default ModalRegistroSalidas
