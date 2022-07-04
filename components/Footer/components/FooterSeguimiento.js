import React, { useEffect, useState } from 'react'
import Button from '../../common/Button'
// import { CSVLink } from 'react-csv'
import ReporteControlYSeguimiento from '@/components/Report/ReporteControlYSeguimiento'
import { formatDate, formatToCurrency } from '@/lib/util'

export default function FooterSeguimiento ({ isDisabled, excelData, headers, handlePrint }) {
  const [dataExport, setDataExport] = useState([])
  const wscols = []
  const generateCSVData = () => {
    if (excelData.length > 0) {
      const formatData = excelData.map(nota => {
        return {
          nBoleto: nota._id,
          dni: nota.cliente._id,
          nombreComprado: nota.cliente.nombre,
          boletos: nota.pasajeros.length,
          montoPago: formatToCurrency(Number(nota.montoPago)),
          fechaPago: formatDate(nota.fechaPago),
          paqueteComprado: nota.salidaProgramada.paqueteTuristico.nombrePaquete
        }
      })

      setDataExport(formatData)
    }
  }

  useEffect(() => {
    generateCSVData()
  }, [excelData])
  return (
        <footer className="footer not-print">
             <Button
                label="imprimir"
                variant="outline"
                width="139"
                textTransform="uppercase"
                onClick= {handlePrint}
                disabled = {isDisabled}
              />
              {excelData.length > 0 && (
              <ReporteControlYSeguimiento csvData={dataExport} fileName={`Reporte-Control-Y-Seguimiento-${new Date().toLocaleDateString()}`} wscols={wscols} />
              )}
            <style jsx>{`

                .footer {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: #ffffff;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    height: 100px;
                    padding: 0px 12rem;
                    justify-content: flex-end;
                    position: fixed;
                    width: 100%;
                    bottom: 0;
                }

                .export{
                    color:white;
                    background: #08BC61;
                    border-radius: 8px;
                    height:40px;
                    width:140px;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    size:18px;
                    font-weight: 700;
                    text-transform: uppercase;
                    border: none;
                }  
                
                @media print{
                    .not-print{
                        display: none
                    }
                }
            `}</style>
        </footer>
  )
}
