import Image from 'next/image'
import React, { useState, useContext } from 'react'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'
import IconEmbarque from '@/components/icons/bus.svg'
import IconFlecha from '@/components/icons/flecha.svg'
import ModalHorarios from './Horarios'
import { InputsCtx } from '@/context/InputsContext'
import { NotaVentaCtx } from '@/context/NotaVentaCtx'

const ModalEmbarques = ({ salida, page, slug, date }) => {

  const [idEmbarqueRef, setIdEmbarqueRef] = useState(0)  
  const [embarkSelected, setEmbarkSelected] = useState(null)

  const { inputs, setInputs } = useContext(InputsCtx)  
  const { notaVenta, setNotaVenta } = useContext(NotaVentaCtx)


  /* index embarque seleccionado mobile */
  const handleCurrentPlace = ({
    target: {
      value,
      selectedOptions: [{
        dataset: { id }
      }]
    }
  }) => {
    const index = value
    const idEmbarque = id
    
    setEmbarkSelected(index)
    setIdEmbarqueRef(idEmbarque)
  }

  /* Btn a horarios - seteando nota venta */
  const handleConfirmDeparture = (e, index) => {
    
    const embarque = salida.detalle[embarkSelected]
    const { _id, lugarEmbarque, horaSalida } = embarque
    
    const detalleSalidaPasajeroUno = notaVenta.pasajeros.map((pasajero, index) => index === 0 ? { ...pasajero, detalleSalida: _id, horaSalida: horaSalida } : pasajero)

    setInputs({ ...inputs, lugarEmbarque: lugarEmbarque.nombre, lugarEmbarqueId: _id, detalleSelected: _id, quitModalC: true })
    setNotaVenta({ ...notaVenta, pasajeros: detalleSalidaPasajeroUno })
  }

  /* Cerrando modal embarque mobile */
  const closeModal = (e, index) => {
    setInputs({ ...inputs, quitModalB: false })
    date(null)
  }

  return (
    <>
      <div className="modal__embarque modal__container">
        <div className="buttons">
          <Image
            src="/images/back.svg"
            width={12}
            height={20}
            onClick={(e) => closeModal(e)}
          />
          <Image
            src="/images/close.svg"
            width={19}
            height={19}
            onClick={(e) => closeModal(e)}
          />
        </div>
        <h1 className="title">Fechas de salida para el full day</h1>
        <div className="subtitle">
          <IconEmbarque fill="var(--fourth-color)" height={20} />
          <h3 className="subtitle__name">Puntos de embarque</h3>
        </div>
        <span className="subtitle__detail">
          Elige cuál será tu punto de embarque
        </span>
        <div className="container__info">
          <div className="select__embarque">
            <Select
              name="embarques"
              height={{ xs: 40 }}
              bg="white"
              onChange={(e) => handleCurrentPlace(e)}
            >
              <option> Seleccionar Embarque</option>
              {salida.detalle.map((embarque, ind) => {
                return <option key={ind} id={embarque._id} data-id={embarque?.lugarEmbarque._id} value={ind}>{embarque.lugarEmbarque.nombre}</option>
              })}
            </Select>
          </div>
          <div className="referencia">
            <IconFlecha fill="var(--fourth-color)" height={20} width={50} />
            <span >
              {
                embarkSelected === null ?
                `Referencia: ` :
                `Referencia: ${inputs.embarques[embarkSelected].referencia}.`
              }
            </span>
          </div>
        </div>
        <div className="btn__embarque">
          <Button
            type="submit"
            font="18px"
            label="Continuar"
            color="var(--main-color)"
            width={{ xs: 299 }}
            height={{ xs: 40 }}
            disabled={embarkSelected === null}
            onClick={(e) => handleConfirmDeparture(e)}
          />
          {inputs.quitModalC && (
            <ModalHorarios
              slug={slug}
              page={page}
              horarios={salida.detalle[embarkSelected].horaSalida}
            />
          )}
        </div>
      </div>
      <div className="overlay" onClick={(e) => closeModal(e)}></div>

      <style jsx>{
        /* css */ `
          .modal__embarque {
            width: 339px;
            height: 533px;
            margin: auto;
            border-radius: 8px;
            background: #ffffff;
            color: var(--fourth-color);
            padding: 24px 20px 60px 20px;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
          }

          .modal__container {
            top: 50% !important;
          }

          .buttons {
            display: flex;
            margin-bottom: 20px;
            justify-content: space-between;
          }

          span {
            display: flex;
            font-size: 14px;
            font-weight: 500;
            line-height: 17px;
            justify-content: center;
          }

          .container__info {
            margin-top: 54px;
            margin-bottom: 30px !important;
            padding: 17px 20px 16px 20px;
          }

          .select__embarque {
            width: 260px;
          }

          .referencia {
            width: 250px;
            display: flex;
            margin-top: 13px;
            text-align: center;
            align-items: center;
            // grid-template-columns: 20px 228px;
          }

          .referencia > span {
            margin-bottom: 0.5rem;
            margin-left: 0.7rem;
            text-align: initial;
          }

        `
      }</style>
    </>
  )
}

export default ModalEmbarques
