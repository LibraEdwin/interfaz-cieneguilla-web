import React, { useContext, useEffect, useState } from 'react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { formatDate, formatHour, isInvalidDate } from '@/lib/util'
import { DetalleCompraCtx } from '@/context/DetalleCompraCtx'
import { errorAlert } from '@/lib/alerts'
import NotFound from '@/components/icons/NotFoud'

const BusquedaFechaSalida = ({ closeModal }) => {
  const [resultadoBusqueda, setResultadoBusqueda] = useState([])
  const { setListaDetalle, setPaqueteTuristico, setFechas, setTotalPasajeros } = useContext(DetalleCompraCtx)
  const [fechaDesde, setFechaDesde] = useState(null)
  const [fechaHasta, setFechaHasta] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   setResultadoBusqueda(SALIDAS_PROGRAMADAS)
  // }, [])

  const getNotaVetaBySalida = (id) => {
    fetch(`${process.env.URI_API}/api-cieneguilla-service/notas-venta/salida-programada/${id}`)
      .then(res => res.json())
      .then(res => {
        const { details, paqueteTuristico, salidaProgramada, totalPasajeros } = res.body
        if (totalPasajeros === 0) {
          return errorAlert('No se han vendido pasajes para esta salida programada')
        }

        setListaDetalle(details)
        setPaqueteTuristico(paqueteTuristico)
        setFechas({
          salida: formatDate(salidaProgramada.fechaSalida),
          retorno: formatDate(salidaProgramada.fechaRetorno)
        })
        setTotalPasajeros(totalPasajeros)

        closeModal(false)
      })
      .catch(err => console.log(err))
  }

  const handlerSearch = async () => {
    setIsLoading(true)
    if (!fechaDesde || !fechaHasta) {
      return errorAlert('complete ambas fechas')
    }

    if (isInvalidDate(fechaDesde, fechaHasta)) {
      return errorAlert('la fecha hasta no puede ser menor que la fecha inicial')
    }

    const url = `${process.env.URI_API}/api-cieneguilla-service/salidas-programadas/search?fechaSalida=${fechaDesde},${fechaHasta}`
    const dataFetch = await (await fetch(url)).json()
    setResultadoBusqueda(dataFetch.body)
    setIsLoading(false)
  }

  const handlerDate = (e) => {
    const { value, name } = e.target
    if (name === 'salidaDesde') {
      setFechaDesde(value)
    } else {
      setFechaHasta(value)
    }
  }
  return (
    <>
      <div className="modal__busqueda modal__container">
        <span className="btn_close">
          <img
            src="/images/close.svg"
            width="19px"
            height="19px"
            alt="cerrar"
            onClick={() => closeModal(false)}
          />
        </span>
        <h1 className="busqueda__title">Búsqueda por fechas de salida</h1>
        <div className="buscador__">
          <div className="search__">
            <label className='label-date'>Salidas desde</label>
            <Input type="date" name="salidaDesde" onChange={handlerDate} />
          </div>
          <div className="search__">
            <label className='label-date'>Salidas hasta</label>
            <Input type="date" name="salidaHasta" onChange={handlerDate} />
          </div>
          <div className="search__">
            <Button
              variant="outline"
              label="Consultar"
              onClick={handlerSearch}
            />
          </div>
          <div className="search__">

          </div>
        </div>
        <div className="container_table__">
        {isLoading && (<span className="loading"></span>)}
        {resultadoBusqueda.length > 0
          ? (
            <table>
              <thead>
                  <tr>
                    <th className='text-center'>Fecha Salida</th>
                    <th className='text-center'>Hora Salida</th>
                    <th className='text-center'>Fecha Retorno</th>
                    <th className='text-center'>Hora Retorno</th>
                    <th className='text-center'>Nombre Paquete</th>
                    <th></th>
                  </tr>
              </thead>
              <tbody>
              {resultadoBusqueda.map(salida => (
                  <tr key={salida._id}>
                    <td className='text-center'>{formatDate(salida.fechaSalida)}</td>
                    <td className='text-center'>{formatHour(salida.detalle?.horaSalida)}</td>
                    <td className='text-center'>{formatDate(salida.fechaRetorno)}</td>
                    <td className='text-center'>{formatHour(salida.horaRetorno)}</td>
                    <td className='text-center'>{salida.paqueteTuristico.nombrePaquete}</td>
                    <td className='text-center'>
                      <button className='btn-view' onClick={() => getNotaVetaBySalida(salida._id)}>
                        <img src='/icons/vista.svg' />
                      </button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
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
        </div>
      </div>
      <div className="overlay" onClick={() => closeModal(false)}></div>

      <style jsx>{`
        .label-date {
          padding-bottom: 0.5rem;
          display: inline-block;
          font-weight: bold;
          font-size: 12px;
        }
d
        .btn-view {
          background: transparent;
          border-style: none;
          cursor: pointer;
        }
        .text-center {
          text-align: center;
        }
        .container_table__ {
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.3);
          padding: 1rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }

        tr {
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        }

        th {
          padding-bottom: 1rem;
          text-align: left;
        }

        td {
          padding: 1rem 0;
        }

        .busqueda__title {
          font-size: 18px;
          padding: 1rem 0;
          margin-bottom: 20px;
          text-align:center;
          font-weight: bold;
        }

        .modal__busqueda {
          width: 891px;
          height: 528px;
          margin: auto;
          border-radius: 8px;
          padding: 25px 40px;
          color: var(--fourth-color);
          background: #ffffff;
          box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.3);
          display:flex;
          flex-direction: column;
        }
        
        .btn_close {
          display:flex;
          justify-content: flex-end;
        }
        .btn_close img{
          cursor:pointer;
        }

        .overlay {
          top: 130px!important;
        }

        .modal__container{
          top: 54%!important;
        }

        .buscador__{
          display:flex;
          gap: 20px; 
          align-items: flex-end;
          margin-bottom: 25px;
        }
        button {
          width: auto !important;
        }
        .search__{
          flex: 1 1 0%;
        }
        .container_table__{
          height: 300px;
          overflow: auto;
        }

        .results {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .loading {
          display: block;
          width: 33%;
          height: 5px;
          position: absolute;
          border-radius: 10px;
          top: 0;
          left: 300px;
          background: linear-gradient(90deg, rgba(242,185,6,1) 0%, rgba(6,147,221,1) 35%, rgba(0,212,255,1) 100%);
          animation: animationSlide 2s linear infinite;
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
      `
      }</style>
    </>
  )
}

export default BusquedaFechaSalida
