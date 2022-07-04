import React, { useState } from 'react'
import moment from 'moment'
import { questionAlert, successAlert } from '@/lib/alerts'
import NotFound from '../icons/NotFoud'
import Image from 'next/image'
import { formatDate } from '@/lib/util'

export default function Table({ headers, setSalidas, listaSalidas, isLoading, icon }) {

  const [salidasPaquete, setSalidasPaquete] = useState(listaSalidas)

  // ============= ELIMINAR SALIDA PROGRAMADA ===================

  function handleDeleteSalida(idSalida) {
    questionAlert('¿Estás seguro que deseas eliminar la salida?', 'Importante')
      .then(respuesta => {
        if (respuesta.isConfirmed) {
          fetch(`${process.env.URI_API}/api-cieneguilla-service/salidas-programadas/${idSalida}`, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(res => {
              // si todo salió bien,lquitamos la salida seleccionada del state global Paquete turístico
              const nuevaListaSalidas = listaSalidas?.filter(salida => {
                return salida._id !== idSalida
              })
              const arrNew = nuevaListaSalidas
              setSalidas(...salidasPaquete, arrNew)

              successAlert('Se eliminó correctamete la salida')
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
  }

  function handleVisibility(idSalida) {

    fetch(`${process.env.URI_API}/api-cieneguilla-service/salidas-programadas/${idSalida}/visibility`, {
      method: 'PATCH'
    }).then(res => res.json())
      .then(res => {
        if (res.code === 200) {
          const arrNew = listaSalidas?.map(salida => {
            if (salida._id === idSalida) {
              return { ...salida, visibility: !salida.visibility }
            }

            return salida
          })

          setSalidas(arrNew)
          console.log(res.body)
        }
      })

  }

  return (
    <>
      <div className="container_salidas">
        <table className="table">
          <thead>
            <tr>
              <th className='f-salida'>Fecha de Salida</th>
              <th className='f-retorno'>Fecha de Retorno</th>
              <th className='h-retorno'>Hora de retorno</th>
              <th className='emb'>Lugares de embarque</th>
              <th className="btnDelete"></th>
              <th className="btnDelete"></th>
            </tr>
          </thead>
          <tbody>
            {listaSalidas.length > 0
              ?
              listaSalidas.map(salida => (
                <tr key={salida._id}>
                  <td className='f-salida'>{formatDate(salida.fechaSalida) || salida.doc}</td>
                  <td className='f-retorno'>{formatDate(salida.fechaRetorno) || salida.boletos || salida.embarque}</td>
                  <td className='h-retorno'>{fromObjectToHour(salida.horaRetorno) || salida.monto || salida.hora}</td>
                  <td className='emb'>{salida.lugarEmbarque || salida.nombrePaquete || salida.fechaPago}</td>
                  {icon && (
                    <td className="btnDelete" style={{ cursor: 'pointer' }}>
                      <Image
                        width={24}
                        height={24}
                        src={salida?.visibility ? `/icons/vista.svg` : `/icons/invisible.svg`}
                        onClick={() => handleVisibility(salida._id)}
                      />
                    </td>
                  )}
                  {icon && (
                    <td className="btnDelete">
                      <img
                        src={`/icons/deleteRegistro.svg`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteSalida(salida._id)}
                      />
                    </td>
                  )}
                </tr>
              )
              )
              :
              (
                <div className="results">
                  <div className="not-found">
                    {!isLoading && (
                      <>
                        <NotFound size="72" />
                        <span>Nada para mostrar</span>
                      </>
                    )}
                  </div>
                </div>
              )
            }
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .btnDelete {
          padding: 0.5rem 1rem;
          width: 3rem;
        }
        .table {
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.3);
          color: var(--border-color);
          border-collapse: separate;
          border-spacing: 0;
          font-size: 14px;
          width: 100%;
          // height: 243px
        }
        .table td,
        th,
        tr {
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          padding: 13px 10px;
          text-align: center;
        }
        .table:last-child {
          // border-bottom: none;
        }               

        thead, tbody {
          display: block
        }

        tbody {
          height: 200px;     
          overflow-y: auto;   
          overflow-x: hidden; 
        }

        // tbody td, thead th {
        //   width: 10%;
        // }

        .f-salida,
        .f-retorno,
        .h-retorno {
          width: 10rem;
        }

        .emb {
          width: 19rem;
        }

        .retorno {
          width: 27%!important
        }

        .embarques {
          width: 30%!important
        }

        .hsalida {
          width: 21%!important
        }
        .fsalida {
          width: 19%!important
        }

        .results {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .not-found {
          position: absolute;
          // bottom: 30%;
          left: 0;
          right: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          color: rgba(3, 1, 1, 0.2);
        }

        .not-found > span {
          width: 100%;
          display: block;
          font-size: 1rem;
          font-weight: 500;
          margin-top: 1.6rem;
          text-align: center;
        }
      `}</style>
    </>
  )
}

// ------------------------- FORMATO FECHAS ----------------------
function parseDates(item) {
  const date = item
  const newFormat = moment(date).format('DD/MM/YYYY')
  return newFormat
}

// ------------------------- FORMATO HORAS ----------------------
function fromObjectToHour(obj) {
  return `${obj.hora}:${obj.minutos.toString().padStart(2, '0')} ${obj.meridiano
    }`
}

// ---------------------- FORMATO LUGARES DE EMBARQUE ----------------------

// function fromLugaresToString (lugares) {
//   const string = lugares
//     .map((item) => item.nombre)
//     .join(' / ')
//   return string
// }
