import React from 'react'
import PropTypes from 'prop-types'
import { formatToCurrency, formatWithHour } from '../../lib/util'

export default function TableDetallePaquete ({
  headers,
  data,
  icon,
  theme,
  handleOnClick,
  borderBottom,
  id
}) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {headers?.map((header) => {
              return <th key={header}>{header}</th>
            })}
            {icon && <th className="not-print"></th>}
          </tr>
        </thead>
        <tbody>
          {data?.map(nota => (
            <tr key={nota._id}>
              <td>{nota._id}</td>
              <td>{nota.cliente._id}</td>
              <td>{nota.cliente.nombre}</td>
              <td>{nota.pasajeros.length}</td>
              <td>S/. {formatToCurrency(Number(nota.montoPago))}</td>
              <td>{formatWithHour(nota.fechaPago)}</td>
              <td>{nota.salidaProgramada.paqueteTuristico.nombrePaquete}</td>
              {icon && (
                <td className="not-print">
                  <img src={`/icons/${icon}`} onClick={handleOnClick} id={nota._id}/>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .table {
          border-radius: 4px;
          ${!theme && ' border: 1px solid rgba(0, 0, 0, 0.3);'}
          color: var(--border-color);
          /* border-collapse: separate; */
          border-spacing: 0;
          font-size: 14px;
          width: 100%;
          margin-bottom: 130px;
          page-break-inside:auto
        }

        .table tr {
          page-break-inside:avoid;
          page-break-after:auto
        }

        .table td,
        th,
        tr {
          ${!borderBottom && 'border-bottom: 1px solid rgba(0, 0, 0, 0.3);'}
          padding: 13px 10px;
          text-align: center;
        }

        th {
          height: 30px;
        }

        .table:last-child {
          border-bottom: none;
        }

        .icono {
          cursor: pointer;
        }
 
        @media print{
          .not-print{
            display: none
          }
          
          .table {
            border: none;
          }

          .table th {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  )
}

TableDetallePaquete.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array,
  icon: PropTypes.string,
  theme: PropTypes.any,
  handleOnClick: PropTypes.func,
  borderBottom: PropTypes.any,
  id: PropTypes.string
}
