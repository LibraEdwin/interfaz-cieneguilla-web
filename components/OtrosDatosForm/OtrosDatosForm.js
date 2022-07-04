import React, { useContext, useEffect, useRef } from 'react'
import Input from '@/components/common/Input'
import Image from 'next/dist/client/image'
import { OtrosDatosCtx } from '@/pages/admin/otros-datos/otrosDatosCtx'

export default function OtrosDatosForm ({ tipo, index }) {
  const { datos, setDatos } = useContext(OtrosDatosCtx)
  const inputFocus = useRef(null)

  // ================= CAPTURA   ================= //

  const handleChangeInput = (i, event) => {
    setDatos((prev) => {
      const newState = { ...prev }
      newState.tipos[index].descriptions[i] = event.target.value
      return newState
    })
  }

  // ================= AGREGAR INPUT =================

  const handleAddInput = () => {
    setDatos({
      ...datos,
      descriptions: datos.tipos[index].descriptions.push('')
    })
  }

  // ============== ELIMINAR INPUT ==================

  const handleRemoveInput = (i) => {
    setDatos({
      ...datos,
      descriptions: datos.tipos[index].descriptions.splice(i, 1)
    })
  }

  useEffect(() => {
    inputFocus.current.focus()
  },[])

  return (
    <>
      <form className="card__">
        <h1>{tipo.nombreTipoDato}</h1>
        <div className="card_content__">
          <div className="card_input__">
          {datos.tipos[index].descriptions?.map((string, index) => (
              <div className="description" key={index}>
                <Input
                  ref={inputFocus}
                  autoFocus
                  type="text"
                  name="descripcionDato"
                  fontWeight="normal"
                  value={string}
                  onChange={event => handleChangeInput(index, event)}
                />
                <button className='otros-icons--delete'
                 type='button'
                 onClick={() => handleRemoveInput(index)}
                >
                  <Image
                      src="/icons/deleteRegistro.svg"
                      width={19}
                      height={20}
                    />
                </button>
              </div>
          ))}
          </div>
        </div>
        <div className="card-foot">
          <button
            className="btn-icon"
            type="button"
            onClick={() => handleAddInput()}
          >
            <Image
              src="/icons/add.svg"
              width={19}
              height={20}
            />
            Agregar
          </button>
        </div>
      </form>
      <style jsx>{`
        .card__ {
        }
        .card__ h1 {
          font-size: 24px;
          color: var(--border-color);
          text-transform: uppercase;
        }
        .card_content__ {
          margin-top: 10px;
        }
        .card_input__ {
          display: flex;
          flex-direction: column;
          padding: 10px 0;
        }
        .card_input__ form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 5%;
        }
        .card-foot {
          padding: 10px 0;
          display: flex;
          justify-content: flex-end;
          width: 95%;
        }

        .btn-icon {
          font-size: 18px;
          font-family: Quicksand;
          font-weight: bold;
          display: flex;
          align-items: center;
          cursor: pointer;
          gap:8px
        }

        .otros-icons--delete, .btn-icon{
          border-style: none;
          background: none;
          cursor:pointer;
        }

        .description {
          display: flex;
          margin-top: 12px;
          column-gap: 1rem;
        }
      `}</style>
    </>
  )
}
// orueb
