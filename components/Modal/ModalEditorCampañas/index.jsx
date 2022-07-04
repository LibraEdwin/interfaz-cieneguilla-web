import React, { useEffect, useRef, useState } from 'react'
import NotFound from '@/components/icons/NotFoud'
import { DivBody } from './divBody'
import { IoMdSave } from 'react-icons/io';

export default function ModalEditorCampañas({ closeModal }) {
  const [results, setResults] = useState([])
  const [filterData, setfilterData] = useState([])
  const [searchCampaña, setSearchCampaña] = useState('')
  const isSearching = false;

  const getCampaña = async () => {
    const filtro = await fetch(`${process.env.URI_API}/api-cieneguilla-service/campania`)
    const { body } = await filtro.json()
    setResults(body)
  }
  useEffect(async () => {
    getCampaña()
  }, [])

  // agregar
  const addCampaña = async () => {
    if (searchCampaña.length > 0) {
      await fetch(`${process.env.URI_API}/api-cieneguilla-service/campania`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          nombreCampaña: searchCampaña
        })
      })
      setSearchCampaña('')
      getCampaña()
    }
  }
  // Buscador
  const debounceRef = useRef();
  const handleImputChangeSearch = async (e) => {
    setSearchCampaña(e.target.value)
    if (e.target.value.length >= 1) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(async () => {
        const filtro = await fetch(`${process.env.URI_API}/api-cieneguilla-service/campania/search?search=${e.target.value}`)
        const { body } = await filtro.json()
        setResults(body)
        if (e.target.value.length === 0) {
          getCampaña()
        }
        filtrar(e.target.value)
      }, 500);
      if (searchCampaña.length > 0) {
        getCampaña()
      }
    }
  }
  // filter
  const filtrar = (terminoBusqueda) => {
    let resultadoBusqueda = results.filter((elemento) => {
      if (elemento.nombreCampaña.toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        if (elemento.nombreCampaña.length === terminoBusqueda.length) {
          return elemento
        }
      }
    })
    setfilterData(resultadoBusqueda)
  }
  return (
    <>
      <div className="modal-search">
        <div className="modal-search__wrapper">
          <button type="button" className="modal-search__close" onClick={closeModal}>
            <img src="/images/close.svg" width="19px" height="19px" />
          </button>
          <label className="label">
            Nombre de campaña
          </label>
          <div className="input">
            <input
              onChange={handleImputChangeSearch}
              type="text"
              placeholder="Escriba un nombre"
              value={searchCampaña} />
            {searchCampaña.length > 0 && (filterData.length === 0 &&
              <button className='btnCrear' onClick={() => addCampaña()}>
                <IoMdSave /><label>Crear</label>
              </button>)}
          </div>
          <div className="table">
            <div className="table__head">
              <div className="code">
                Código
              </div>
              <div className="name">
                Nombre de campaña
              </div>
              <div className="view">
              </div>
              <div className="view">
              </div>
            </div>
            <div className="table__content">
              {isSearching && (<span className="loading"></span>)}
              {results.length > 0
                ? results.map(result => (
                  <div className="table__item" key={result._id}>
                    <DivBody
                      _id={result._id}
                      nombreCampaña={result.nombreCampaña}
                      colorButton={result.colorButton}
                      visibilidad={result.visibilidad}
                      getCampaña={getCampaña} />
                  </div>
                ))
                : (
                  <div className="results">
                    <div className="not-found">
                      {!isSearching && (
                        <>
                          <NotFound size="72" />
                          <span>Nada para mostrar</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{/*css*/`
        .name {
          width: 65%;
        }

        .code {
          width: 20%;
          padding-left: 2rem;
        }
      .btnCrearDisable{
        position: absolute;
        right: 0.7rem;
        top: 0.7rem;
        padding: 10px;
        gap: 10px;
        background: none;
        border: 1px solid #08BC61;
        border-radius: 8px;
        display: flex;
        margin:auto;
        font-size: 1.5rem;
        color:  #08BC61;
      }
      .btnCrear{
        position: absolute;
        right: 0.7rem;
        top: 0.7rem;
        padding: 10px;
        gap: 10px;
        background: #08BC61;
        border: 1px solid #08BC61;
        border-radius: 8px;
        display: flex;
        margin:auto;
        font-size: 1.5rem;
        color:  white;
      }
      
      .btnCrear button:hover {
        font-size: 2rem;
      }
        .pagination {
          display: flex;
          align-items: center;
          justify-content: right;
          gap: 0.3rem;
          margin-top: 1rem;
        }

        .pagination__button {
          padding: 0.3rem 0.5rem;
          border-radius: 4px;
          border: 1px solid rgba(0,0,0,0.2);
          color: rgba(0,0,0,0.5);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          transition: 0.2s linear;
        }

        .pagination__button:hover {
          background: #08bc62;
          border-color: #08bc62;
          color: white;
        }

        .pagination__button--prev,
        .pagination__button--next {
          background: rgba(6,147,221,1);
          border: none;
          color: white;
        }

        .pagination__button--prev:disabled,
        .pagination__button--next:disabled {
          opacity: 0.5;
          cursor: initial;
          background: rgba(0,0,0,0.5);
        }

        .loading {
          display: block;
          width: 100%;
          height: 5px;
          position: absolute;
          border-radius: 10px;
          top: 0;
          left: 0;
          background: linear-gradient(90deg, rgba(242,185,6,1) 0%, rgba(6,147,221,1) 35%, rgba(0,212,255,1) 100%);
          animation: animationSlide 2s linear infinite;
        }

        .modal-search {
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

        .modal-search__close {
          position: absolute;
          right: 3rem;
          top: 1.5rem;
          background: transparent;
          border-style: none;
          cursor: pointer;
        }

        .modal-search__wrapper {
          background: white;
          width: 100%;
          height: 100%;
          max-height: 600px;
          max-width: 750px;
          padding: 3rem;
          padding-top: 4rem;
          border-radius: 8px;
          position: relative;
          animation: fadeIn 0.3s ease-in;
          overflow: hidden;
        }

        .label {
          margin-bottom: 0.5rem;
          display: block;
        }

        .input {
          position: relative;
          margin-bottom: 1.2rem;
        }

        .input input {
          width: 100%;
          padding: 1.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #3D3D3D;
        }

        .input input::placeholder {
          color: rgba(103, 103, 103, 0.5);
        }

        .input .search-icon {
          position: absolute;
          right: 0.7rem;
          top: 0.7rem;
          color: rgba(103, 103, 103, 0.5);
        }

        .input input:focus +.search-icon {
          color: #3D3D3D;
        }

        .results {
          width: 100%;
        }

        .table {
          width: 100%;
          height: 80%;
          border-radius: 0.5rem;
          border: 1px solid rgba(0,0,0, 0.3);
          border-collapse: collapse;
          padding: 1rem;
          box-sizing: border-box;
        }

        .table__head {
          padding-right: 0.5rem;
        }

        .table__head,
        .table__item {
          display: flex;
          align-items: center;
          font-weight: 700;
          color: #585858;
          padding-bottom: 1rem;
        }
        .table__item {
          padding-top: 1rem;
          font-weight: 400;
          color: #585858;
          border-bottom: 1px solid rgba(0,0,0, 0.3);
          animation: fadeIn 0.1s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          } to {
            opacity: 1;
          }
        }

        .table__item:first-child {
          border-top: 1px solid rgba(0,0,0, 0.3);
        }
        .table__item:last-child {
          border-bottom: none;
        }

        .table__content {
          height: calc(100% - 30px);
          box-sizing: border-box;
          overflow-y: scroll;
          margin-right: -1rem;
          padding-right: 1rem;
        }
        .table__content::-webkit-scrollbar {
          width: 8px;    /* width of the entire scrollbar */
        }

        .table__content::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);        /* color of the tracking area */
        }

        .table__content::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.1);    /* color of the scroll thumb */
          border-radius: 20px;       /* roundness of the scroll thumb */
          border: 6px solid transparent;  /* creates padding around scroll thumb */
        }
        .success {
          width: 100%;
          margin-top: 1rem;
        }

        .not-found {
          position: absolute;
          bottom: 30%;
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

        @keyframes animationSlide {
        0%, 100% {
        transform: translateX(-100%);
        }

        25%, 75% {
          transform: translateX(0);
        }

        50% {
          transform: translateX(100%);
        }
      }
      `}</style>
    </>
  )
}
