import React, { useState, useContext } from 'react'
import Input from '@/components/common/Input'
import Image from 'next/dist/client/image'
import Button from '@/components/common/Button'
import Select from '@/components/common/Select'
import IconPointer from '@/components/icons/pointer-icon.svg'
import { useCounter } from '@/hooks/useCounter'
import { useForm } from '@/hooks/useForm'
import { InputsCtx } from "@/context/InputsContext";
import { NotaVentaCtx } from '@/context/NotaVentaCtx'
import { useGlobalContext } from '@/context/GlobalContext'

export default function RegistroPasajero ({ closeModalRegistroPasajero, pasajeros, setUsuario, usuarios }) {
  const { counter, increment } = useCounter(1)

  const { inputs, setInputs } = useContext(InputsCtx);
  const { notaVenta, setNotaVenta } = useContext(NotaVentaCtx)
  const { isToken, loggedInClient } = useGlobalContext()

  const [user, setUser, handleInputChange] = useForm({
    nombre: notaVenta.pasajeros[0].nombre, 
    _id: notaVenta.pasajeros[0]._id,
    lugarEmbarque: notaVenta.pasajeros[0].lugarEmbarque
  })

  const [pasajero, setPasajero] = useForm([])

  const { nombre, _id, lugarEmbarque } = user

  const handleSiguientePasajero = () => {
    increment()
    setPasajero([...pasajero, { _id: counter, ...user }])
    setUser({
      nombre: '',
      _id: '',
      lugarEmbarque: '0'
    })
  }

  const handleSiguientePasajeroMod = () => {
    increment()
  }

  const handleGuardarPasajeros = () => {
    setUsuario([...pasajero, { _id: counter, ...user }])
    setNotaVenta({...notaVenta, pasajeros: usuarios})
    closeModalRegistroPasajero()
  }

  return (
    <>
      <div className="modal__registroPasajero modal__container">
        <div className="btn-close">
          <Image
            src="/images/close.svg"
            width={19}
            height={19}
            alt="cerrar"
            onClick={() => closeModalRegistroPasajero(false)}
          />
        </div>

        <h1 className="registroPasajero__title">Registro de Pasajeros</h1>
        <p className="registroPasajero__note">
          {`${counter}/${pasajeros}`}
        </p>
        <div className="registroPasajero__inputs">
          <Input
            type="text"
            placeholder="Nombres Completos"
            fontWeight="normal"
            name="nombre"
            value={usuarios.length > 0 ? usuarios[counter - 1].nombre : nombre}
            onChange={handleInputChange}
            disabled={counter == 1}
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
            value={usuarios.length > 0 ? usuarios[counter - 1]._id : _id}
            onChange={handleInputChange}
            disabled={counter == 1}
            height={{
              xs: 40,
              md: 48
            }}
          />
          <Select
            onChange={handleInputChange}
            name="lugarEmbarque"
            icon={<IconPointer fill="var(--fourth-color)" height={20} />}
            iconMarginRight={38}
            value={usuarios.length > 0 ? usuarios[counter - 1].lugarEmbarque : lugarEmbarque}
            disabled={counter == 1}
            height={{
              xs: 40,
              md: 48
            }}
          >
            {/* { usuarios.length > 0 ? 
              inputs.salidaProgramada?.lugarEmbarque.map((embarque) => {
                return (<option value={embarque}>{embarque.nombre}</option>)
              })
              :
              (<option value={ubicacion}>{inputs.salidaProgramada?.lugarEmbarque.filter((embarque) => (embarque._id === ubicacion))[0].nombre}</option>)
            } */}
          </Select>
          {usuarios.length === 0 &&
            <>
              <Button
                label="Continuar"
                onClick={handleSiguientePasajero}
                disabled={counter == pasajeros}
              />
              <Button
                label="Guardar"
                color="#F2B907"
                onClick={handleGuardarPasajeros}
                disabled={counter != pasajeros}

              />
            </>
          }
          {
            usuarios.length > 0 &&
            <>
              <Button
                label={counter == pasajeros ? 'Continuar Compra' : 'Siguiente Pasajero'}
                onClick={handleSiguientePasajeroMod}
              />
              <Button
                label="Modificar Pasajero"
                color="#F2B907"
                disabled={counter == 1}
              />
              <Button
                label="Eliminar Pasajero"
                color="#BC0808"
                disabled={counter == 1}
              />
            </>
          }
        </div>
      </div>
      <div className="overlay" onClick={() => closeModalRegistroPasajero(false)}></div>
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
            padding-top:30px;
          }

          .registroPasajero__note {
            font-size: 24px;
            font-weight: 700;
            text-align: center;
          }

          .registroPasajero__inputs{
            display: flex;
            flex-direction: column;
            gap: 20px
          }

          .password{
            display: flex;
            flex-direction: column;
          }

          a{
            text-decoration-line: underline;
            color: var(--fourth-color);
            font-size: 12px; 
            align-self: flex-end;
            padding-top: 5px
          }

          @media screen and (min-width:920px) {

            .modal__registroPasajero {
              width: 680px;
              // height: 475px;
              margin: auto;
              box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.3);
            }
  
            .registroPasajero__title {
              font-size: 18px;
              text-decoration-line: underline;
              padding-top:20px;
            }
  
            .registroPasajero__note {
             padding-bottom: 1.5rem;
             padding: 0px 120px;
            }

            .registroPasajero__inputs{
             padding: 10px 160px;
             gap: 16px
            }
          }
        `
      }</style>
    </>
  )
}
