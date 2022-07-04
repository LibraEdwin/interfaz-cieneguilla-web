import React, { useContext, useEffect, useState, useRef } from 'react'
import { PaqueteTuristicoCtx } from '@/context/paqueteTuristicoCtx'
import FooterPaquete from './FooterPaquete'
import ModalSubirArchivos from '../Modal/SubirArchivos/ModalSubirArchivos'
import ModalBuscarPaquete from '../Modal/ModalBuscarPaquete'
import ModalRegistroSalidas from '../Modal/RegistroSalidas/ModalRegistroSalidas'
import ModalLinkProducto from '../Modal/LinkProducto/ModalLinkProducto'
import MainPhoto from '../CardImg/MainPhoto'
import Gallery from '../CardImg/Gallery'
import Input from '../Input/Input'
import Select from '../Select/Select'
import Button from '../common/Button'
import Search from '../icons/Search'
import LoaderPaquete from '../Loader/LoaderPaquete'
import ModalEditorCampañas from '../Modal/ModalEditorCampañas'

export default function ContentPaquete({ initialData, listaEstados, listaZonas, listaCampañas }) {
  const { paqueteTuristico, setData, isLoadingLoader } = useContext(PaqueteTuristicoCtx)
  const [abrirModalArchivo, setAbrirModalArchivo] = useState(false)
  const [abrirModalBusqueda, setAbrirModalBusqueda] = useState(false)
  const [openModalRegistroSalidas, setOpenModalRegistroSalidas] = useState(false)
  const [openModalLinkProducto, setOpenModalLinkProducto] = useState(false)
  const [openModalEditCampaña, setOpenModalEditCampaña] = useState(false)
  useEffect(() => {
    if (initialData) {
      setData(initialData)
    }

  }, [initialData])
  return (
    <>
      {isLoadingLoader
        ? <LoaderPaquete />
        : <>
          <div className='container-registro'>
            <div className='container-editRegister'>
              <div className="view-register divRegister">
                <Button
                  label="Editar campañas"
                  textTransform="none"
                  variant="button--outline"
                  type="button"
                  onClick={() => setOpenModalEditCampaña(true)}
                />
              </div>
              <div className="view-url">
                <Button
                  label="Registro de salidas"
                  textTransform="none"
                  variant="button--outline"
                  type="button"
                />
              </div>
            </div>
            <div className="values-group">
              <div className="name">
                <Input autoFocus type="text" name="nombrePaquete" placeholder="Nombre de paquete o tour" value={paqueteTuristico.nombrePaquete} />
              </div>
              <div className="search">
                <button className="buton-search" onClick={() => setAbrirModalBusqueda(true)}>
                  <div className="tooltip">Buscar Tour</div>
                  <Search size="16" />
                </button>
              </div>
              {/* <div className="view-register">
                <Button
                  disabled={!paqueteTuristico.id}
                  label="Registro de salidas"
                  textTransform="none"
                  width={{ xs: 289 }}
                  type="button"
                  onClick={() => setOpenModalRegistroSalidas(true)}
                />

              </div> */}
              <div className="select-group">
                <div className="zones">
                  <Select placeholder="Seleccionar Zona" value={paqueteTuristico.zonaGeografica} items={listaZonas} name="zonaGeografica" />
                </div>
                <div className="estatus">
                  <Select placeholder="Seleccionar Estado" value={paqueteTuristico.estadoPaquete} items={listaEstados} name="estadoPaquete" />
                </div>
                <div className="campaña">
                  <Select placeholder="Seleccione Campaña" value={paqueteTuristico.campaniaId} items={listaCampañas} name="campaniaId" />
                </div>
                {/* <div className="price">
                  <span>S/</span>
                  <Input type="number" name="precio" min="0" placeholder="00.00" textAlign="right" value={paqueteTuristico.precio} />
                </div> */}
              </div>
              {/* <div className="view-url">
                <Button
                  disabled={!paqueteTuristico.id}
                  label="Ver URL"
                  textTransform="none"
                  variant="outline"
                  type="button"
                  onClick={() => setOpenModalLinkProducto(true)}
                />
              </div> */}
            </div>
            <div className='group-paquetePrecio'>
              <div className='labelPrecioPaquete'>
                <label>Precio de paquete :</label>
              </div>
              <div className='InputPrecioPaquete'>
                <label className='lblSoles'>s/.</label>
                <Input paddingLeft='50px' type="number" name="precio" min="0" placeholder="00.00" textAlign="right" value={paqueteTuristico.precio} />
              </div>
              <div>
                <Button
                  disabled={!paqueteTuristico.id}
                  label="Ver URL"
                  textTransform="none"
                  variant="outline"
                  type="button"
                  onClick={() => setOpenModalLinkProducto(true)}
                />
              </div>
            </div>
            <div className="gallery">
              <div className="gallery__main">
                <MainPhoto
                  id="main"
                  nameFile="fotoPrincipal" />
              </div>
              <Gallery />
            </div>
          </div>
        </>
      }
      <FooterPaquete
        uploadFiles={() => setAbrirModalArchivo(true)}
      />

      {abrirModalArchivo && (
        <ModalSubirArchivos
          closeModal={() => setAbrirModalArchivo(false)}
        />
      )}

      {abrirModalBusqueda && (
        <ModalBuscarPaquete
          closeModal={() => setAbrirModalBusqueda(false)}
        />
      )}
      {openModalRegistroSalidas && (
        <ModalRegistroSalidas
          closeModal={() => setOpenModalRegistroSalidas(false)}
        />
      )}
      {
        openModalEditCampaña && <ModalEditorCampañas closeModal={() => setOpenModalEditCampaña(false)} />
      }
      {openModalLinkProducto && (
        <ModalLinkProducto closeModal={() => setOpenModalLinkProducto(false)} url={paqueteTuristico.nombreURL} />
      )}
      <style jsx>{/*css*/`
      .group-paquetePrecio{
        display: flex;
        justify-content: right;
        max-width: 1080px;
        margin: auto;
        padding-right: 1rem;
        padding-bottom: 1rem;
      }
      .labelPrecioPaquete{
        font-family: 'Quicksand';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        margin: auto;
        margin-right: 2rem;
      }
      .InputPrecioPaquete{
        position: relative;
        margin-right: 1rem;
        width: 150px;
      }
      .lblSoles{
        position: absolute;
        top:0.3rem;
        left:0.6rem;
        font-size: 1.5rem;
        font-weight: 700;
        font-family: 'Quicksand';
        font-style: normal;

      }
      .container-editRegister{
        display:flex;
        justify-content: right;
        max-width: 1080px;
        margin: auto;
        padding: 2rem 0.5rem 0 1rem;

      }
      .divRegister{
        padding-right: 1rem;
      }
        .container-registro {
          margin-bottom: 130px;
        }

        .values-group {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          padding: 2rem 1rem 0 1rem;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .values-group .name,
        .values-group .view-register,
        .values-group .view-url {
          width: 100%;
        }
        .values-group .buton-search {
          border-style: none;
          background: #08bc62;
          border-radius: 8px;
          color: white;
          display: flex;
          align-items: center;
          padding: 0.75rem 0.8rem;
          cursor: pointer;
          position: relative;
        }

        .values-group .buton-search .tooltip {
          position: absolute;
          bottom: 140%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 13px;
          background: #000;
          padding: 0.2rem 0.4rem;
          color: white;
          font-weight: 600;
          border-radius: 4px;
          white-space: nowrap;
          opacity: 0;
          transition: 0.2s ease-in;
        }

        .values-group .buton-search .tooltip::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-left: 6px solid transparent;
          border-top: 6px solid #000;
          border-bottom: 6px solid transparent;
          border-right: 6px solid transparent;
        }

        .values-group .buton-search:hover > .tooltip {
          opacity: 1;
        }
        
        .values-group .select-group {
          width: 100%;
        }
        
        .values-group .zones,
        .values-group .estatus,
        .values-group .price {
          width: 100%;
          margin-bottom: 1rem;
          position: relative;
        }
        .campaña{
          width: 200%;
        }

        .values-group .price span {
          position: absolute;
          left: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          font-weight: 600;
          color: rgba(0, 0, 0, 0.3);
        }

        @media (min-width: 998px) {
          .values-group .name {
            width: calc(100% - 60px);
          }

          .values-group .view-register,
          .values-group .view-url {
            width: 289px;
          }

          .values-group .select-group {
            width: calc(100%);
            display: flex;
            gap: 1rem;
          }
        }

        .gallery {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 0 1rem;
        }

        .gallery__main {
          height: 400px;
        }

        .gallery__main {
          width: 100%;
        }

        @media (min-width: 998px) {
          .gallery__main {
            width: 40%;
            height: 500px;
          }
        }

        @media (min-width: 1280px) {
          .values-group,
          .gallery {
            max-width: 1100px;
          }

          .gallery__main {
            width: 45%;
            height: 500px;
          }
        }
      `}</style>
    </>
  )
}
