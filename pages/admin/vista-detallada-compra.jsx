import React, { useEffect, useState, useContext } from 'react'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import BusquedaFechaSalida from '@/components/Modal/BusquedaFechaSalida/BusquedaFechaSalida'
import { DetalleCompraCtx, DetalleCompraProvider } from '@/context/DetalleCompraCtx'
import { useRouter } from 'next/router'
import { CSVLink } from 'react-csv'
import ReporteDetalle from '@/components/Report/ReporteDetalle'
import { formatDate, formatHour } from '@/lib/util'

const VistaDetalladaCompra = () => {
  return (
    <DetalleCompraProvider>

      <HeaderAdmin title="Vista detallada de paquete comprado" />
      <VistaContent />
    </DetalleCompraProvider>
  )
}

const VistaContent = () => {
  const [openModalBusquedaFechaSalida, setOpenModalBusquedaFechaSalida] = useState(false)
  const {
    listaDetalle, paqueteTuristico,
    fechas,
    totalPasajeros
  } = useContext(DetalleCompraCtx)
  const router = useRouter()

  function handlePrint() {
    window.print()
  }

  const [dataExport, setDataExport] = useState([])

  useEffect(() => {
    if (listaDetalle.length > 0) {
      const val = []
      listaDetalle.forEach((detalle) => {
        detalle.pasajeros.forEach((pasajero, index) => {
          val.push({
            nBoleto: detalle._id,
            nOrden: index + 1,
            pasajero: pasajero.nombre,
            documento: pasajero._id,
            celular: index === 0 ? pasajero.celular : '-',
            horario: formatHour(pasajero.detalleSalida.horaSalida),
            lugar: pasajero.detalleSalida.lugarEmbarque.nombre
          })
        })
      })
      setDataExport(val)
    }
  }, [listaDetalle])

  const wscols = [
    // { wch: Math.max(...dataExport.map(data => data.nBoleto.length)) },
    // { wch: Math.max(...dataExport.map(data => data.nOrden.length)) },
    // { wch: Math.max(...dataExport.map(data => data.pasajero.length)) },
    // { wch: Math.max(...dataExport.map(data => data.documento.length)) },
    // { wch: Math.max(...dataExport.map(data => data.celular.length)) },
    // { wch: Math.max(...dataExport.map(data => data.horario.length)) },
    // { wch: Math.max(...dataExport.map(data => data.lugar.length)) }
  ]

  return (
    <>
      <div className="container">
        <div className="buscador__">
          <div className="search__">
            <Input
              type="text"
              fontWeight="normal"
              label="Paquete Consultado"
              readOnly
              defaultValue={paqueteTuristico ? `${paqueteTuristico}   ${fechas.salida} - ${fechas.retorno}` : null}
            />
          </div>
          <div>
            <Button
              variant="outline"
              label="Buscar paquete"
              onClick={() => setOpenModalBusquedaFechaSalida(true)}
            />
            {openModalBusquedaFechaSalida && <BusquedaFechaSalida closeModal={() => setOpenModalBusquedaFechaSalida(false)} />}
          </div>
        </div>
        <div className={`body__${listaDetalle.length > 0 ? '' : ' no-content'}`} id="contentPrint">
          {listaDetalle.length > 0
            ? (
              <>
                <div className="title_table__">
                  <div className="tab_table__">
                    <p>Nombre de paquete o tour:</p>
                    <p>{paqueteTuristico}</p>
                  </div>
                  <div className="tab_date__">
                    <div className="tab_table__">
                      <p>Fecha de salida:</p>
                      <p>{fechas.salida}</p>
                    </div>
                    <div className="tab_table__">
                      <p>Fecha de retorno:</p>
                      <p>{fechas.retorno}</p>
                    </div>
                  </div>
                </div>
                <div className="container_table__">
                  {listaDetalle.map((detalle) => (
                    <table className='table-orders' key={detalle._id} >
                      <thead className='table-orders__header'>
                        <tr>
                          <th>N° Boleto</th>
                          <th>N° Orden</th>
                          <th className='pasajero'>Nombre de pasajero</th>
                          <th>Documento</th>
                          <th>Celular</th>
                          <th>Horario de Recojo</th>
                          <th>Lugar de Embarque</th>
                        </tr>
                      </thead>
                      <tbody className='table-orders__body'>
                        {detalle.pasajeros.map((pasajero, index) => (

                          <tr key={pasajero.nombre}>
                            <th>{detalle._id}</th>
                            <td>{index + 1}</td>
                            <td className='pasajero'>{pasajero.nombre}</td>
                            <td>{pasajero._id}</td>
                            <td>{index <= 1 ? pasajero.celular : '-'}</td>
                            <td>{formatHour(pasajero.detalleSalida.horaSalida)}</td>
                            <td>{pasajero.detalleSalida.lugarEmbarque.nombre}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ))}
                </div>
                <div className="total_table">
                  <h3>Total de pasajeros: {totalPasajeros}</h3>
                </div>
              </>
            )
            : null}
        </div>
      </div>
      <footer className='footer-vista'>
        <div className="container">
          <div className="group-buttons">
            <button
              onClick={() => router.push('/admin/seguimiento-compra')}
              className='btn-default--stroke'>Ir atrás</button>
            <button
              disabled={!listaDetalle.length > 0}
              className='btn-default--stroke' onClick={handlePrint}>Imprimir</button>

            {dataExport.length > 0 && (
              <ReporteDetalle csvData={dataExport} fileName={`Reporte_Detalle-${new Date().toLocaleDateString()}`} wscols={wscols} />
            )}

          </div>
        </div>
      </footer>
      <style jsx>{`
        .footer-vista {
          border-top: 1px solid rgba(0,0,0,0.1);
          padding: 2rem 0;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: white;
          z-index: 10;
        }

        .group-buttons {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .btn-default {
          padding: 0.5rem 1rem;
          height:40px;
          border-radius: 8px;
          border-style: none;
          font-size: 18px;
          font-weight: 700;
          color: white;
          background: #08BC61;
          cursor: pointer;
        }

        .btn-default--stroke {
          padding: 0.5rem 1rem;
          height: 40px;
          border-radius: 8px;
          border-style: none;
          border: 1px solid #08BC61;
          font-size: 18px;
          font-weight: 700;
          color: #08BC61;
          background: transparent;
          cursor: pointer;
          transition: 0.4s ease;
        }

        .btn-default--stroke:disabled {
          opacity: 0.6;
          cursor: initial;
        }

        .btn-default--stroke:hover:disabled {
          background: transparent;
          color: #08BC61;
        }

        .btn-default--stroke:hover {
          background: #08BC61;
          color: white;
        }
        .total_table {
          margin-top: 4rem;
          margin-right: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        .total_table h3 {
          border-top: 1px solid rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          padding: 14px 0;
          text-align: center;
          min-width: 400px;
        }

        .table-orders {
          width: 100%;
          text-align: center;
          border-collapse: collapse;
        }

        .table-orders tr {
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        }

        .table-orders tr > td,
        .table-orders tr > th {
          padding-bottom: 1rem;
          padding-top: 1rem;
        }

        .table-orders tr > td {
          color: #585858;
        }

        .table-orders tr .pasajero {
          text-align: left;
        }

        .buscador__{
          display:flex;
          gap: 40px;
          align-items: flex-end;
        }
        .search__{
          width: 90%
        }
        .body__{
          margin-top: 30px;
          margin-bottom: 50px;
          border: 8px solid rgba(0, 0, 0, 0.3);
          padding-bottom: 3rem;
        }

        .body__.no-content {
          height:1000px;
        }
        .title_table__{
          display:flex;
          padding: 40px 25px;
          justify-content: space-between;
        }
        .tab_table__{

        }
        .tab_table__ p{
          margin:0;
          font-weight:bold;
          color: var(--border-color);
        }
        .tab_date__{
          display:flex;
          gap:20px;
        }
        .container_table__{
          padding: 0 10px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        
        @media print {
          @page {
            /* size: A4 portrait; */
            margin: 5mm;
            size: landscape;
          }

          .footer-vista {
            display: none;
          }

          .buscador__ {
            display: none;
          }
          
          .body__ {
            page-break-before:always;
            border: none;
            margin: 0;
            padding: 0;
          }

          .table-orders__header th {
            font-size: 12px;
          }

          .table-orders__body td, th {
            font-size: 12px;
          }
        }
    `}</style>
    </>
  )
}

VistaDetalladaCompra.layout = 'Admin'

export default VistaDetalladaCompra
