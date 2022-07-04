import React, { useContext, useEffect, useState } from 'react'
import { PaqueteTuristicoCtx } from '@/context/paqueteTuristicoCtx'

export default function GalleryItem ({ index, id, nameFile }) {
  const { paqueteTuristico, setPaqueteTuristico } = useContext(PaqueteTuristicoCtx)
  const [image, setImage] = useState({})
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const updateFile = (e) => {
    const objectFile = e.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setImage({ objectFile, url: reader.result })
      const newList = paqueteTuristico.fotosAnexas.map(photo => (photo.id === id ? { id, objectFile, url: reader.result } : photo))
      setPaqueteTuristico({ ...paqueteTuristico, [nameFile]: newList })
    }

    if (objectFile) {
      reader.readAsDataURL(objectFile)
    } else {
      clearImage()
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const clearImage = () => {
    setImage({})
    const newList = paqueteTuristico.fotosAnexas.map(photo => (photo.id === id ? { id, objectFile: null, url: '' } : photo))
    setPaqueteTuristico({ ...paqueteTuristico, [nameFile]: newList })
  }

  useEffect(() => {
    setImage(paqueteTuristico.fotosAnexas[index])
  }, [paqueteTuristico])

  return (
    <>
      <div className="card-img">
        {image.url !== ''
          ? (
          <>
            <button type="button" className="card-img__clear" onClick={clearImage}>
              <img src="/icons/delete.svg" />
            </button>
            {isLoading
              ? (
              <div className="spinner"></div>
                )
              : (
              <img src={imageError ? '/images/empty.jpg' : image.url} alt="" className="card-img__file" onError={(e) => setImageError(true)}/>
                )}
          </>
            )
          : (
          <>
            <img src={'/images/file-imagen.svg'} alt="" className="card-img__not-found"/>
            <label htmlFor={`gallery-${id}`} type="button" className="card-img__upload">
              <img src="/icons/cloud.svg" />
            </label>
          </>
            )}

        <input type="file" id={`gallery-${id}`} accept="image/png, image/gif, image/jpeg" onChange={updateFile} />
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
