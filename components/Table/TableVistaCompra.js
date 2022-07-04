import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '@/lib/util'

export default function TableVistaCompra ({
  data,
  theme,
  headersCliente,
  headersPasajeros
}) {
  const { pasajeros, cliente, salidaProgramada, montoPago, fechaPago } = data

  return (
    <>
      <h1 className="modal-title">Vista de compra</h1>

      <table className="modal-cliente">
        <thead>
          <tr>
            <th>{cliente.tipoDocumento.nombreTipoDoc}</th>
            { headersCliente.map(header => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cliente._id}</td>
            <td>{cliente.nombre}</td>
            <td>{cliente.celular ?? '-'}</td>
            <td>{formatDate(fechaPago)}</td>
            <td>S/ {montoPago}</td>
          </tr>
        </tbody>
      </table>
      <table className="modal-pasajeros">
        <thead>
          <tr>
          { headersPasajeros.map((header, index) => <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
            {
              pasajeros.map(pasajero => {
                const { _id, nombre, detalleSalida } = pasajero
                const { hora, minutos, meridiano } = detalleSalida.horaSalida

                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{nombre}</td>
                    <td>{detalleSalida.lugarEmbarque.nombre}</td>
                    <td>{
                      `${hora}:${minutos} ${meridiano}`}
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      <style jsx>{`

        .modal-title{
          font-weight: bold;
          font-size: 18px;
          line-height: 22px;
          color: var(--fourth-color);
          text-align: center;
        }

        .modal-pasajeros{
          border-radius: 4px;
          ${!theme && ' border: 1px solid rgba(0, 0, 0, 0.3);'}
          color: var(--border-color);
          border-collapse: separate;
          border-spacing: 0;
          font-size: 14px;
          width: 100%;
        }

        .modal-pasajeros td,th{
          border-bottom:  1px solid rgba(0, 0, 0, 0.3);
          padding: 13px 0px;
          text-align: center;
        }

        .modal-pasajero td:last-child{
          border-bottom:  none;

        }

        .modal-cliente{
          margin: 20px 0;
          text-align: left;

        }

        .modal-cliente th{
          text-align: left;
          border-bottom: none;
        }
       
      `}</style>
    </>
  )
}

TableVistaCompra.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.any,
  headersCliente: PropTypes.any.isRequired,
  headersPasajeros: PropTypes.any
}
