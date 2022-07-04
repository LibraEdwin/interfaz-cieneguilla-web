import React, { useState, useContext, useRef, useEffect } from 'react'
import Input from '@/components/common/Input'
import Image from 'next/dist/client/image'
import Button from '@/components/common/Button'
import Select from '@/components/common/Select'
import IconPointer from '@/components/icons/pointer-icon.svg'
import { useCounter } from '@/hooks/useCounter'
import { InputsCtx } from '@/context/InputsContext'
import { NotaVentaCtx } from '@/context/NotaVentaCtx'

export default function RegistroPasajero ({ closeModal, embs, expectedCounter, setNumeroPasajeros, calcularMontoTotal, precio }) {
  const inputFocus = useRef(null)

  const { counter, increment, decrement } = useCounter(0)

  const { inputs, setInputs } = useContext(InputsCtx)
  const { notaVenta, setNotaVenta } = useContext(NotaVentaCtx)
  
  const [detallesSalidas, setDetallesSalidas] = useState([]) 
  const [indexEmbarque, setIndexEmbarque] = useState(0)

  const { detalleSalida } = notaVenta.pasajeros[0]


  const handleInputSelect = ({
    target: {
      value, 
      name,
      selectedOptions: [{
        dataset: {set}
      }]
    }
  }) => { 
    setNotaVenta((prev) => {
      const newState = { ...prev }

      if (name === 'detalleSalida') {
        newState.pasajeros[counter][name] = parseInt(value)
        const horaSalidaDetalle = embs.find(emb => emb._id === parseInt(value))
        // console.log(horaSalidaDetalle.horaSalida, 'find change input')
        newState.pasajeros[counter].horaSalida = horaSalidaDetalle.horaSalida        
      } else {
        newState.pasajeros[counter][name] = value
      }
      return newState
    })
    setIndexEmbarque(set)
  }


  const handleInputChange = (e) => {
    
    const value = e.target.value

    setNotaVenta((prev) => {
      const newState = { ...prev }
      if (e.target.name === 'detalleSalida') {
        newState.pasajeros[counter][e.target.name] = parseInt(e.target.value)
        console.log(e.target.name, 'detl')
      } else {
        newState.pasajeros[counter][e.target.name] = e.target.value
      }
      return newState
    })
  }

  const handleGuardarPasajeros = () => {
    setInputs({ ...inputs, isPasajerosSaved: true })
    closeModal(false)
  }

  const handleDeletePasajero = () => {
    const items = [...notaVenta.pasajeros]

    items.splice(counter, 1)

    const numeroPasajeros = items.length
    setNotaVenta({ ...notaVenta, pasajeros: items })
    setNumeroPasajeros(numeroPasajeros)
    calcularMontoTotal(precio, numeroPasajeros)
    decrement()
  }

  const handleAddSiguientePasajero = () => {
    increment()
    setNotaVenta({
      ...notaVenta,
      pasajeros: [
        ...notaVenta.pasajeros,
        { _id: '', nombre: '', detalleSalida }
        // { _id: '', nombre: '', detalleSalida, horaSalida: notaVenta.pasajeros[0].horaSalida }
      ]
    })
    inputFocus.current.focus()
  }

  const handleShowSiguientePasajero = (isCompra) => {
    if (isCompra) {
      closeModal(false)
    } else {
      increment()
    }
  }

  const handleModal = () => {
    closeModal(false)
    if (inputs.isPasajerosSaved === false) {
      setNotaVenta({ ...notaVenta, pasajeros: [notaVenta.pasajeros[0]] })
    }
  }

  const handleContinuarOrSiguienteButton = () => {
    const expected = inputs.isPasajerosSaved
      ? notaVenta.pasajeros.length
      : expectedCounter
    return counter + 1 == expected
  }

  function parseHoras (obj) {
    return `${obj.hora.toString().padStart(2, '0')}:${obj.minutos
      .toString()
      .padStart(2, '0')} ${obj.meridiano.toUpperCase()}`
  }

  useEffect(() => {
    setInputs({ ...inputs, salidaProgramadaId: notaVenta.salidaProgramada })
    // obtener detalles
    // fetch(`${process.env.URI_API}/api-cieneguilla-service/detalles-salida/salida-programada/${notaVenta.salidaProgramada}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     const detalles = data.body
    //     setDetallesSalidas(detalles)
    //   })
    //   .catch(err => console.log(err))
  }, [notaVenta])

  return (
    <>
      <div className="modal__registroPasajero modal__container">
        <div className="btn-close">
          <Image
            src="/images/close.svg"
            width={19}
            height={19}
            alt="cerrar"
            onClick={() => handleModal()}
          />
        </div>

        <h1 className="registroPasajero__title">Registro de Pasajeros</h1>
        <p className="registroPasajero__note">
          {`${counter + 1}/${
            inputs.isPasajerosSaved
              ? notaVenta.pasajeros.length
              : expectedCounter
          }`}
        </p>
        <div className="registroPasajero__inputs">
          <Input
            type="text"
            autoFocus
            ref={inputFocus}
            placeholder="Nombres Completos"
            fontWeight="normal"
            name="nombre"
            value={notaVenta.pasajeros[counter].nombre}
            onChange={(e) => handleInputChange(e)}
            // disabled={counter == 0}
            height={{
              xs: 40,
              md: 48
            }}
          />
          <Input
            type="text"
            placeholder="DNI / PPT / C.E"
            fontWeight="normal"
            name="_id"
            value={notaVenta.pasajeros[counter]._id}
            onChange={(e) => handleInputChange(e)}
            // disabled={counter == 0}
            height={{
              xs: 40,
              md: 48
            }}
          />
          {counter <= 1 && (
            <Input
              type="text"
              placeholder="Teléfono Celular"
              fontWeight="normal"
              name="celular"
              value={notaVenta.pasajeros[counter].celular}
              onChange={(e) => handleInputChange(e)}
              // disabled={counter == 0}
              height={{
                xs: 40,
                md: 48
              }}
            />
          )}

          <Select
            onChange={(e) => handleInputSelect(e)}
            value={notaVenta.pasajeros[counter].detalleSalida}
            name="detalleSalida"
            icon={<IconPointer fill="var(--fourth-color)" height={20} />}
            iconMarginRight={38}
            disabled={counter === 0}
            height={{
              xs: 40,
              md: 48
            }}
          >
            {embs.length > 0 && embs.map((detalle, index) => (
              <option key={`pasajero-embarque-${detalle._id}`} data-set={index} value={detalle._id}>{detalle.lugarEmbarque.nombre}</option>
            ))}
          </Select>
          <div className='hour-selected'>
            <b>HORA DE SALIDA:</b>
            {
              counter === 0
              ?
              <span>{parseHoras(notaVenta.pasajeros[0].horaSalida)}</span>
              :
              <span>{parseHoras(embs[indexEmbarque].horaSalida)}</span>
            }

            {/* {expectedCounter > 0 && indexEmbarque === 0
              ? <span>{parseHoras(notaVenta.pasajeros[0].horaSalida)} </span>
              : <span>{parseHoras(embs[indexEmbarque].horaSalida)} </span>
            }                             */}
          </div>
          {!inputs.isPasajerosSaved
            ? (
            <>
              <Button
                label="Continuar"
                onClick={handleAddSiguientePasajero}
                disabled={counter + 1 == expectedCounter}
              />
              <Button
                label="Guardar y Comprar"
                color="#F2B907"
                onClick={handleGuardarPasajeros}
                disabled={counter + 1 != expectedCounter}
              />
            </>
              )
            : (
            <>
              <Button
                label={
                  counter + 1 == notaVenta.pasajeros.length
                    ? 'Continuar Compra'
                    : 'Siguiente Pasajero'
                }
                onClick={() =>
                  handleShowSiguientePasajero(
                    handleContinuarOrSiguienteButton()
                  )
                }
              />
              {/* <Button
                label="Modificar Pasajero"
                color="#F2B907"
                disabled={counter == 0}
                onClick={handleUpdatePasajero}
              /> */}
              <Button
                label="Eliminar Pasajero"
                color="#BC0808"
                disabled={counter == 0}
                onClick={handleDeletePasajero}
              />
            </>
              )}
        </div>
      </div>
      <div className="overlay" onClick={() => handleModal()}></div>
      <style jsx>{
        /* css */ `
          .modal__registroPasajero {
            width: 339px;
            // height: 493px;
            margin: auto;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            border-radius: 8px;
            color: var(--fourth-color);
            padding: 30px;
            box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
          }

          .btn-close {
            display: flex;
            justify-content: flex-end;
            cursor: pointer;
          }

          .registroPasajero__title {
            font-size: 18px;
            text-align: center;
            text-transform: uppercase;
            padding-top: 30px;
          }

          .registroPasajero__note {
            font-size: 24px;
            font-weight: 700;
            text-align: center;
          }

          .registroPasajero__inputs {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .password {
            display: flex;
            flex-direction: column;
          }

          a {
            text-decoration-line: underline;
            color: var(--fourth-color);
            font-size: 12px;
            align-self: flex-end;
            padding-top: 5px;
          }

          // input:focus {
          //   outline: none;
          //   border-color: #517201;                  
          // }

          .hour-selected {
            display: flex;
            justify-content: center;
            font-weight: 500;
            font-size: 12px;
            gap: 1rem;
          }

          @media screen and (min-width: 920px) {
            .modal__registroPasajero {
              width: 680px;
              // height: 475px;
              margin: auto;
              box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.3);
            }

            .registroPasajero__title {
              font-size: 18px;
              text-decoration-line: underline;
              padding-top: 20px;
            }

            .registroPasajero__note {
              padding-bottom: 1.5rem;
              padding: 0px 120px;
            }

            .registroPasajero__inputs {
              padding: 10px 160px;
              gap: 16px;
            }
            
            .enfoque {
              border-color: red;
            }
          }
        `
      }</style>
    </>
  )
}
