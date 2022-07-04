import React from 'react'
import GalleryItem from './GalleryItem'

export default function Gallery () {
  return (
    <>
      <div className="gallery__anexas">
        <div className="gallery__anexas-item">
          <GalleryItem
            index={0}
            id="anexa1"
            nameFile="fotosAnexas" />
        </div>
        <div className="gallery__anexas-item">
          <GalleryItem
            index={1}
            id="anexa2"
            nameFile="fotosAnexas" />
        </div>
        <div className="gallery__anexas-item">
          <GalleryItem
            index={2}
            id="anexa3"
            nameFile="fotosAnexas" />
        </div>
        <div className="gallery__anexas-item">
          <GalleryItem
            index={3}
            id="anexa4"
            nameFile="fotosAnexas" />
        </div>
      </div>
      <style jsx>{`
        .gallery__anexas {
          width: 100%;
        }

        .gallery__anexas {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem
        }

        .gallery__anexas-item {
          width: 48.6%;
          height: 300px;
        }

        @media (min-width: 998px) {
          .gallery__anexas {
            width: 58.2%;
          }

          .gallery__anexas-item {
            width: 48.2%;
            height: 240px;
          }
        }

        @media (min-width: 1280px) {
          .gallery__anexas {
            width: 53.2%;
          }

          .gallery__anexas-item {
            width: 48.2%;
            height: 240px;
          }
        }
      `}</style>
    </>
  )
}
