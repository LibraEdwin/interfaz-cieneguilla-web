import React from 'react'
import Image from 'next/image'

const ModalPagoSatisfactorio = ({ closeModalPagoDone }) => {
  return (
    <>
      <div className="modal__pago modal__container">
        <h1 className="pago__title">Pago satisfactorio</h1>
        <figure>
          <Image src="/images/pago_check.svg" width={119} height={119} />
        </figure>
      </div>
      <div className="overlay" onClick={() => closeModalPagoDone(false)}></div>

      <style jsx>{
        /* css */ `
          .modal__pago {
            margin: auto;
            width: 339px;
            height: 493px;
            display: flex;
            border-radius: 8px;
            text-align: center;
            background: #ffffff;
            align-content: center;
            flex-direction: column;
            color: var(--fourth-color);
            justify-content: flex-start;
            padding: 145px 20px 81px 20px;
            box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
          }

          .pago__title {
            font-size: 18px;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 48px;
          }

          @media screen and (min-width: 992px) {
            .modal__pago {
              margin: auto;
              width: 680px;
              height: 493px;
              display: flex;
              text-align: center;
              align-content: center;
              justify-content: flex-start;
              padding: 145px 20px 81px 20px;
              backdrop-filter: blur(8px);
            }

            .modal__container {
              top: 50% !important;
            }
          }
        `
      }</style>
    </>
  )
}

export default ModalPagoSatisfactorio
