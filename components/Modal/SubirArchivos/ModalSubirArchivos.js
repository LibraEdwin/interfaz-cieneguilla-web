import React, { useState, useContext, useEffect } from 'react'
import { PaqueteTuristicoCtx } from '@/context/paqueteTuristicoCtx';

export default function ModalSubirArchivos({closeModal}) {
  const {paqueteTuristico, setPaqueteTuristico} = useContext(PaqueteTuristicoCtx)
  const [file, setFile] = useState(paqueteTuristico.archivoItinerario)
  const [isLoading, setIsLoading] = useState(false)

  const handlePreviewFile = (e) => {
    const fileObject = e.target.files[0]
    const dataFile = {
      nombre: fileObject.name,
      objectFile: fileObject
    }
    setFile(dataFile)
    setPaqueteTuristico({...paqueteTuristico, ['archivoItinerario']: dataFile})
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <>
      <div className="modal-file">
        <div className="modal-file__wrapper">
          <button type="button" className="modal-file__close" onClick={closeModal}>
            <img src="/images/close.svg" width="19px" height="19px" />
          </button>

          <span className="modal-file__title">Subir archivos de paquete para: </span>

          <div className="modal-file__input">
            <span>itinerario</span>
            <input type="file" id="itenerario" onChange={handlePreviewFile} accept="application/pdf" />
            <div className="value">{isLoading ? '' : file.nombre}</div>
            {isLoading ? (
              <div className="modal-file__loading">
                <div className="spinner"></div>
              </div>
            ): (
              <label className="add" htmlFor="itenerario">
                <img src="/icons/cloud.svg"/>
              </label>
            )}
            
          </div>

          <button type="button" onClick={closeModal} className="modal-file__save">
            <img src="/icons/save.svg"/>
            Guardar
          </button>          
        </div>
      </div>
      <style jsx>{`
        .modal-file {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-file__wrapper {
          background: white;
          width: 100%;
          max-width: 500px;
          padding: 3rem;
          padding-top: 4rem;
          border-radius: 8px;
          position: relative;
          animation: fadeIn 0.3s ease-in;
        }

        .modal-file__close {
          border-style: none;
          background: transparent;
          cursor: pointer;
          margin-left: auto;
          display: block;
          position: absolute;
          top: 2rem;
          right: 3rem;
          padding: 0;
        }

        .modal-file__title {
          font-size: 18px;
          color: var(--fourth-color);
          font-weight:bold;
          margin-bottom: 20px;
          display: block;
        }

        .modal-file__input {
          display: flex;
          align-items: center;
          gap: 1rem;        
        }

        .modal-file__input span {
          font-size: 18px;
          line-height: 22px;
          text-transform: uppercase;
        }

        .modal-file__input .value {
          width: 100%;
          height: 36px;
          padding: 0.5rem;
          background: #F3F3F3;
          border: 1px solid #C4C4C4;
          border-radius: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          width: calc(100% - 150px)
        }

        .modal-file__input .clear,
        .modal-file__input .add {
          border-style: none;
          background: transparent;
          cursor: pointer;
        }

        .modal-file__input .clear:disabled {
          cursor: initial;
        }

        .modal-file__save {
          display: flex;
          align-items: center;
          margin-left: auto;
          margin-top: 40px;
          background: transparent;
          border-style: none;
          cursor: pointer;
          gap: 0.5rem;
          color: #08BC61;
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
        }

        .modal-file__loading {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid rgba(0,0,0,0.2);
          border-left-color: #0693dd;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          } to {
            opacity: 1;
          }
        }
      `}</style>
      </>
  )
}
