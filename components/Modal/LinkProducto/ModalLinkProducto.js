import React, { useRef } from 'react'
import Input from '@/components/common/Input'
import ModalBtn from '@/components/common/ModalBtn'

export default function ModalLinkProducto ({ closeModal, url }) {
  const refNombreURL = useRef(null)

  const handleOnClickCopy = () => {
    const input = document.createElement('input')
    input.value = refNombreURL.current.value
    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy')
    input.remove()
  }

  return (
    <>
      <div className="modal__link modal__container">
        <div className="btn-close">
          <img
            src="/images/close.svg"
            width="19px"
            height="19px"
            alt="cerrar"
            onClick={closeModal}
          />
        </div>
        <span>Link Producto</span>
        <div className="modal__link--input">
          <Input
            id="idURL"
            placeholder={`${process.env.URI_WEB}/paquetes-y-full-days/${url}`}
            colorInput="#202E00"
            fontWeight="normal"
            defaultValue={`${process.env.URI_WEB}/paquetes-y-full-days/${url}`}
            ref={refNombreURL}
          />
        </div>
        <div className="modal__link--btn">
          <ModalBtn
            label="Copiar"
            icon="copy.svg"
            onClick={() => handleOnClickCopy()}
          />
        </div>
      </div>
      <div className="overlay-admin" onClick={closeModal}></div>
      <style jsx>{`
        .modal__link {
          width: 763px;
        }

        .modal__link span {
          font-size: 18px;
          color: var(--fourth-color);
          font-weight: bold;
        }

        .modal__link--input {
          padding-top: 20px;
        }

        .modal__link--btn {
          padding: 20px 20px 0 0;
        }

        .btn-close {
          display: flex;
          justify-content: flex-end;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
