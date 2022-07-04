import React, { useContext } from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'
import IconHora from '@/components/icons/hora.svg'
import { InputsCtx } from '@/context/InputsContext'

const ModalHorarios = ({ horarios, page, slug }) => {
  const { inputs, setInputs } = useContext(InputsCtx)

  function parseHora(time) {
    const hora = time.hora.toString().padStart(2, '0')
    const min = time.minutos.toString().padStart(2, '0')
    const mer = time.meridiano.toUpperCase()
    const hour = `${hora}:${min} ${mer}`
    return hour
  }

  const handleSelectSalida = (key, e) => {
    setInputs({ ...inputs, quitModalA: false, quitModalB: false, quitModalC: false })
  }

  const closeModals = (e, index) => {
    setInputs({ ...inputs, quitModalC: false })
  }

  const redireccionComprar = () => {
    window.location = `/paquetes-y-full-days/${slug}/comprar?detalle=${inputs.detalleSelected}&salida=${inputs.salidaProgramada._id}`
  }

  return (
    <>
      <div className="modal__horario modal__container">
        <div className="buttons">
          <Image
            src="/images/back.svg"
            width={12}
            height={20}
            onClick={(e) => closeModals(e)}
          />
          <Image
            src="/images/close.svg"
            width={19}
            height={19}
            onClick={(e) => closeModals(e)}
          />
        </div>
        <h1 className="title">Fechas de salida para el full day</h1>
        <div className="subtitle">
          <IconHora fill="var(--fourth-color)" height={20} />
          <h3 className="subtitle__name">Hora de salida</h3>
        </div>
        <span className="subtitle__detail">
          Recuerda llegar puntual al punto de embarque. A esta hora partimos al
          destino.
        </span>
        <div className="container__info">
          <h3>{parseHora(horarios)}</h3>
        </div>
        <div className="btn__embarque">
          {page === 'paquete'
            ? (
              <Button
                type="submit"
                font="18px"
                label="Comprar"
                color="var(--main-color)"
                width={{ xs: 299 }}
                height={{ xs: 40 }}
                onClick={(e) => redireccionComprar(e)}
              />
            )
            : (
              <Button
                type="submit"
                font="18px"
                label="Confirmar"
                color="var(--main-color)"
                width={{ xs: 299 }}
                height={{ xs: 40 }}
                onClick={(e) => handleSelectSalida(e)}
              />
            )}
        </div>
      </div>
      <div className="overlay" onClick={(e) => closeModals(e)}></div>

      <style jsx>{
        /* css */ `
          .modal__horario {
            width: 339px;
            height: 533px;
            margin: auto;
            border-radius: 8px;
            background: #ffffff;
            color: var(--fourth-color);
            padding: 24px 20px 133px 20px;
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

          .container__info {
            margin-top: 15px;
            margin-bottom: 30px;
            padding: 1rem;
          }

          .container__info h3 {
            font-weight: 500;
            font-size: 24px;
            line-height: 30px;
            margin:0.4rem 0.24rem;
          }

          .subtitle__detail {
            text-align: center;
            width: 280px;
            margin: auto;
          }
        `
      }</style>
    </>
  )
}

export default ModalHorarios
