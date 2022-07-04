import React, { useContext, useEffect, useState } from 'react'

import { PaqueteTuristicoCtx } from '@/context/paqueteTuristicoCtx'

export default function CardImg ({ nameFile, id }) {
  const { paqueteTuristico, setPaqueteTuristico } = useContext(PaqueteTuristicoCtx)
  const [image, setImage] = useState(paqueteTuristico.fotoPrincipal)
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const updateFile = (e) => {
    const objectFile = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setPaqueteTuristico({ ...paqueteTuristico, fotoPrincipal: { objectFile, url: reader.result } })
    }

    if (objectFile) {
      reader.readAsDataURL(objectFile)
    } else {
      clearFile()
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const clearFile = () => {
    setImage({})
    setPaqueteTuristico({ ...paqueteTuristico, fotoPrincipal: { objectFile: null, url: '' } })
  }

  useEffect(() => {
    setImage(paqueteTuristico.fotoPrincipal)
  }, [paqueteTuristico])

  return (
    <>
      <div className="card-img" >
        {image.url !== ''
          ? (
          <>
            <button type="button" className="card-img__clear" onClick={clearFile}>
              <img src="/icons/delete.svg" />
            </button>
            {isLoading
              ? (
              <div className="spinner"></div>
                )
              : (
              <img src={imageError ? '/images/empty.jpg' : image.url} alt="" className="card-img__file" onError={(e) => setImageError(true)} />
                )}
          </>
            )
          : (
          <>
            <img src={'/images/file-imagen.svg'} alt="" className="card-img__not-found"/>
            <label htmlFor={`cardImg${id}`} type="button" className="card-img__upload">
              <img src="/icons/cloud.svg" />
            </label>
          </>
            )}

        <input type="file" id={`cardImg${id}`} accept="image/png, image/gif, image/jpeg" onChange={updateFile} />
      </div>
      <style jsx>{`
        .spinner {
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
        .card-img {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(0,0,0,0.4);
          position: relative;
        }

        .card-img__clear,
        .card-img__upload {
          background: transparent;
          border-style: none;
          position: absolute;
          z-index: 3;
          top: 1rem;
          left: 1rem;
          cursor: pointer
        }

        .card-img__file {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: zoomOut 0.3s;
        }

        @keyframes zoomOut {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
