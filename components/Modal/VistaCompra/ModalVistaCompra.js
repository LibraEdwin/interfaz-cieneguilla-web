import Table from '@/components/Table/Table'
import TableVistaCompra from '@/components/Table/TableVistaCompra'
import React from 'react'

const headersCliente = [
  'Nombre del comprador',
  'Número de contacto',
  'Fecha de pago',
  'Monto de pago'
]

const headersPasajeros = [
  'Nro. documento',
  'Acompañante',
  'Lugar de embarque',
  'Hora de embarque'
]

const ModalVistaCompra = ({ closeModalVistaCompra, data }) => {
  return (
    <>
      <div className="vista__compra modal__container">
        <div className="close__button">
          <span onClick={() => closeModalVistaCompra(false)}>X CERRAR</span>
        </div>
        <div className="modal__table">
          <TableVistaCompra headersPasajeros={headersPasajeros} data={data} headersCliente={headersCliente}/>
        </div>
      </div>
      <div
        className="overlay-admin"
        onClick={() => closeModalVistaCompra(false)}
      ></div>

      <style jsx>{
        /* css */ `
          .vista__compra {
            width: 783px;
            // height: 458px;
            padding: 21px 28px 43px;
          }

          .vista__compra--title {
            font-weight: bold;
            font-size: 18px;
            line-height: 22px;
            color: var(--fourth-color);
            text-align: center;
          }

          .close__button {
            display: flex;
            margin-bottom: 5px;
            justify-content: flex-end;
            font-weight: 700;
            font-size: 14px;
            color: #000000;
            cursor: pointer;
          }

          .datos__comprador {
            margin-top: 32px;
            margin-bottom: 37px;
            color: #585858;
            font-size: 14px;
            padding: 0 10px;
          }

          .datos__comprador td,
          th,
          thead,
          tbody,
          tr {
            text-align: start;
            padding: 3px 15px;
          }

          .modal__table {
            display: grid;
          }

          .modal__container {
            top: 50% !important;
            box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.2)!important;
          }
        `
      }</style>
    </>
  )
}

export default ModalVistaCompra
