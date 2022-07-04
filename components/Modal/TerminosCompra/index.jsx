import React, { useState } from 'react';
import Image from 'next/image'
import Button from '@/components/common/Button'

const ModalTerminosCompra = ({ closeModalTerminos, check }) => {

  const aceptTerms = () => {
    closeModalTerminos(false)
    check(true)
  }

  const closeTerms = () => {
    closeModalTerminos(false)
    check(false)
  }

  return (
    <>
      <div className='terminos__compra modal__container'>
        <div className="terminos__compra--close">
          <Image
            src="/images/close.svg"
            width={19}
            height={19}
            alt="cerrar"
            onClick={() => closeTerms()}
          />
        </div>
        <h2 className="terminos__compra--title">Terminos y condiciones de compra</h2>
        <div className='terminos__compra--content'>
          <p>
            Cieneguilla Travel Tours E.I.R.L. es una agencia de viajes que ofrece tour fullday y paquetes de viajes de 2 a 3 dias partiendo desde Lima.
            <br /><br />
            <b>POLITICA DE DEVOLUCIÓN</b>
            <br /><br />
            - No hay motivo ni justificación si el participante no asiste al viaje, automaticamente no hay lugar a reclamo o solicitud de devolución ni reprogramación y se pierde el 100% de lo abonado.
            <br /><br />
            - No realizamos devoluciones, cancelaciones o postergaciones por ningún motivo sin lugar a reclamo.
            <br /><br />
            - Pagos con tarjetas de crédito o débito, no cobramos comisiones, pero no acceden a promociones ni descuentos, se paga la tarifa general que indica el paquete.
            <br /><br />
            - Cieneguilla Travel Tours no se responsabiliza si el participante no lee los términos y condiciones que figura en cada paquete antes de realizar la compra.
            <br /><br />
            <b>POLITICA DE PRIVACIDAD DE LA INFORMACION</b>
            <br /><br />
            - La protección de datos de carácter personal obliga a Cieneguilla Travel Tours E.I.R.L. a respetar el derecho a la intimidad y la privacidad de los titulares de los datos personales que almacenados a causa de la prestación de sus servicios.
            <br /><br />
            - Cieneguilla Travel Tours E.I.R.L. cumple las obligaciones formales y sustantivas que la normativa peruana vigente en materia de protección de datos impone a quienes tratan datos de carácter personal.
            <br /><br />
            <b>Para mayor información contactarse a los siguientes números:</b>
            <br /><br />
            Teléfono fijo: (01) 479 8797<br />Celular: 951 568 920
          </p>
        </div>
        <div className="terminos__compra---btn-acept">
          <Button
            label="Acepto"
            onClick={() => aceptTerms()}
          />

          {/* Modal de pago VisaNET */}

          {/* {openModalPagoVisa && (
            <ModalPagoVisaNet monto={montoPagar} />
          )
          } */}
        </div>
      </div>
      <div className="overlay"></div>
      <style jsx>{/*css*/`
        .terminos__compra {
          padding: 1.5rem 2rem!important;
          width: 90%!important;
        }

        .terminos__compra--close {
          display: flex;
          justify-content: flex-end;
          cursor: pointer;
        }

        .terminos__compra--title {
          font-weight: 700;
          font-size: 18px;
          line-height: 22px;
          color: #4C2913;
          text-transform: uppercase;
          text-align: center;
        }

        .terminos__compra--content {
          background: #EFEFEF;
          border: 1px solid #B6B6B6;
          height: 343px;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          padding: 1.2rem 2rem;
          overflow-y: auto;
        }

        .terminos__compra--content p {
          text-align: justify;
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          color: #4C2913;
        }

        .terminos__compra---btn-acept {
          margin: auto;
          width: 193px;
        }

        .overlay {
          top: 100px;
        }

        @media screen and (min-width: 768px) {
          .terminos__compra {
            padding: 1.5rem 2rem!important;
            width: 680px!important;
          }

          .overlay {
            top: 130px;
          }
        }
      
      `}</style>
    </>
  )
}

export default ModalTerminosCompra