import PropTypes from 'prop-types'
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

function ReporteControlYSeguimiento({ csvData, fileName, wscols }) {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'
  const Heading = [
    {
      nBoleto: 'N° Boleto',
      dni: 'Dni',
      nombreComprado: 'Nombre del Comprador',
      boletos: 'Boletos',
      montoPago: 'Monto de Pago',
      fechaPago: 'Fecha de pago',
      paqueteComprado: 'Paquete Comprado'
    }
  ]
  const exportToCSV = (csvData, fileName, wscols) => {
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: ['nBoleto', 'dni', 'nombreComprado', 'boletos', 'montoPago', 'fechaPago', 'paqueteComprado'],
      skipHeader: true,
      origin: 0 // ok
    })

    ws['!cols'] = wscols

    XLSX.utils.sheet_add_json(ws, csvData, {
      header: ['nBoleto', 'dni', 'nombreComprado', 'boletos', 'montoPago', 'fechaPago', 'paqueteComprado'],
      skipHeader: true,
      origin: -1 // ok
    })

    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(data, fileName + fileExtension)
  }

  return (
    <>
      <button
        // disabled={!csvData.length > 0}
        className='btn-default'
        onClick={(e) => exportToCSV(csvData, fileName, wscols)}
      >
        Exportar
      </button>
      <style jsx>{`
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
      `}</style>
    </>
  )
}

ReporteControlYSeguimiento.propTypes = {
  csvData: PropTypes.array.isRequired,
  fileName: PropTypes.string.isRequired,
  wscols: PropTypes.array.isRequired
}

export default ReporteControlYSeguimiento
