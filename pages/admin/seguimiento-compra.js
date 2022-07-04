import React, { useEffect, useRef, useState } from 'react'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import FooterAdmin from '@/components/Admin/FooterAdmin'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Swal from 'sweetalert2'
import ModalVistaCompra from '@/components/Modal/VistaCompra/ModalVistaCompra'
import TableDetallePaquete from '@/components/Table/TableDetallePaquete'
import Image from 'next/image'
import { formatDate } from '@/lib/util'
import FooterSeguimiento from '@/components/Footer/components/FooterSeguimiento'

const headers = ['Nro. Boleto', 'DNI', 'Comprador', 'Boletos', 'Monto de pago', 'Fecha y hora de pago', 'Paquete comprado']

const ControlSeguimientoCompra = () => {
  const [openModalVistaCompra, setOpenModalVistaCompra] = useState(false)
  const [reporteNotaVentas, setReporteNotaVentas] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startDateFromBtn, setStartDateFromBtn] = useState('')
  const [endDateFromBtn, setEndDateFromBtn] = useState('')
  const [notaVenta, setNotaVenta] = useState('')
  const [excelData, setExcelDate] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)

  const url = `${process.env.URI_API}/api-cieneguilla-service/notas-venta/reporte?startDate=${startDateFromBtn}&endDate=${endDateFromBtn}`

  const handleDates = () => {
    setStartDateFromBtn(startDate)
    setEndDateFromBtn(endDate)
  }

  const handleShowNota = (e) => {
    const id = e.target.id
    setOpenModalVistaCompra(true)
    setNotaVenta(...reporteNotaVentas.resultados.filter(nota => nota._id === Number(id)))
  }

  const getReporteNotaVentas = async () => {
    if (new Date(startDateFromBtn) > new Date(endDateFromBtn)) {
      Swal.fire({
        icon: 'warning',
        title: 'Importante',
        text: 'Las fechas no son correctas'
      })
    } else {
      const response = await fetch(url)
      const reporteNotaVentas = await response.json()
      if (reporteNotaVentas.body.resultados.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Importante',
          text: 'No hay registros'
        })
      }
      setReporteNotaVentas(reporteNotaVentas.body)
      setIsDisabled(false)
    }
  }

  function handlePrint () {
    window.print()
  }

  useEffect(() => {
    if (startDateFromBtn && endDateFromBtn) { getReporteNotaVentas() }
  }, [startDateFromBtn, endDateFromBtn])

  return (
    <>
      <HeaderAdmin title="Control y seguimiento de compra" />
      <main className="control__compra">

        <div className="control__compra--container not-print">
          <div className="labels">
            <label>Comprar desde</label>
            <label>Comprar hasta</label>
            <label>Monto total S/</label>
          </div>
          <div className="filters__group">
            <div className="filters__subgroup">
              <div className="filter__item">
                <Input
                  type="date"
                  content="attr(data-date)"
                  iconMarginRight={38}
                  font="18px"
                  colorPlace="var(--fourth-color)"
                  height={{
                    xs: 40,
                    md: 40
                  }}
                  width="214px"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="filter__item">
                <Input
                  type="date"
                  iconMarginRight={38}
                  colorPlace="var(--fourth-color)"
                  width="214px"
                  font="18px"
                  height={{
                    xs: 40,
                    md: 40
                  }}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="filter__item monto">
                <Input
                  type="text"
                  defaultValue={reporteNotaVentas.montoTotal}
                  fontWeight="bold"
                  name="monto"
                  width="191px"
                  color="red"
                  bg="#F3F3F3"
                  disabled
                />
              </div>
              <div
                className="search "
                onClick={handleDates}
              >
                <Image src="/icons/lupa.svg" width={17} height={17} />
              </div>
            </div>
            <div className="btn">
              <Button
                label="Ver detalle por paquete"
                variant="outline"
                font="18px"
                textTransform="inherit"
                height="43px"
                to="/admin/vista-detallada-compra"
              />
            </div>
          </div>
        </div>
        <div className="modal__table print">
          <div className='not-display control__compra--dates'>
            <span>Fecha de inicio: {startDateFromBtn} </span>
            <span>Fecha de fin: {endDateFromBtn}</span>
            <span>Monto total: S/{reporteNotaVentas.montoTotal}</span>

          </div>
          <TableDetallePaquete
            headers={headers}
            data={reporteNotaVentas.resultados}
            icon="vista.svg"
            handleOnClick={handleShowNota}
          />
          {openModalVistaCompra && (
            <ModalVistaCompra
              closeModalVistaCompra={setOpenModalVistaCompra}
              data={notaVenta}
            />
          )}
        </div>
      </main>
      <FooterSeguimiento
        excelData={reporteNotaVentas.resultados ?? []}
        headers={headers}
        isDisabled={isDisabled}
        handlePrint={handlePrint}
      />
      <style jsx>{`
          .control__compra {
            height: 630px;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 3rem 195px;
            width: 100%;
          }

          .control__compra--container {
            display: flex;
            flex-direction: column;
          }

          .control__compra--dates{
            display:flex;
            margin-bottom: 20px;
            gap:20px;
            color: var(--fourth-color);
            font-size: 18px;
            font-weight: bold;
          }

          .filters__group {
            display: flex;
            gap:8px
          }

          .filters__subgroup {
            display: flex;
            gap: 8px;
          }

          .labels {
            display: grid;
            grid-template-columns: 214px 214px 191px;
            margin-bottom: 5px;
            line-height: 15px;
            font-weight: bold;
            column-gap: 11px;
            font-size: 12px;
            color: #585858;
          }
          .search{
            background: var(--main-color);
            border-radius: 8px;
            width: 47px;
            display:flex;
            justify-content: center;
            cursor:pointer;
            height: 40px

          }

          .btn {
            display: grid;
            width: 347px;
            height: 43px;
          }

          .modal__table {
            width: 100%;
            max-width: 970px;
            margin-top: 29px;
          }

          
        @media screen{

          .not-display{
            display:none;
          }
      
        }

        @media print{
          @page {
            margin: 5mm;
            size: landscape;
          }

          .not-print{
            display: none
          }

          .print{
            position: absolute;
            left: 40px;
          }
          
          .control__compra {
            padding: 0;
          }
        }
        `
      }</style>
    </>
  )
}

ControlSeguimientoCompra.layout = 'Admin'

export default ControlSeguimientoCompra
