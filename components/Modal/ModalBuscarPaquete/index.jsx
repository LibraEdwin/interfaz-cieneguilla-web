import React, { useContext, useEffect, useState } from 'react'
import Search from '@/components/icons/Search'
import NotFound from '@/components/icons/NotFoud'
import View from '@/components/icons/View'
import { PaqueteTuristicoCtx } from '@/context/paqueteTuristicoCtx'
import { getData } from '@/lib/Api'

export default function ModalBuscarPaquete({ closeModal }) {
  const { obtenerPaquete, buscarPaquete, setIsLoadingLoader } = useContext(PaqueteTuristicoCtx)
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [pagination, setPagination] = useState({})
  // const [cacheLocal, setCacheLocal] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const NUMBER_LIMIT = 10

  const view = async (id) => {
    obtenerPaquete(id)
    closeModal()
  }

  const handleOnchange = (e) => {
    setSearchTerm(e.target.value)
    setIsSearching(true)
  }

  const paginateList = async (page) => {
    const resultados = await buscarPaquete(searchTerm, NUMBER_LIMIT, page)
    setPaginationWithResults(resultados)
    setResults(resultados.docs)
  }

  const setPaginationWithResults = (results) => {
    setPagination({
      totalDocs: results.totalDocs,
      limit: results.limit,
      totalPages: results.totalPages,
      page: results.page,
      pagingCounter: results.pagingCounter,
      hasPrevPage: results.hasPrevPage,
      hasNextPage: results.hasNextPage,
      prevPage: results.prevPage,
      nextPage: results.nextPage
    })
  }

  const renderPages = totalPages => {
    const content = []
    for (let i = 1; i <= totalPages; i++) {
      content.push(
        <li key={i} className="pagination__item">
          <button type="button" onClick={() => paginateList(i)} className="pagination__button">{i}</button>
          <style jsx>{`
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
          `}</style>
        </li>
      )
    }

    return content
  }

  useEffect(async () => {
    if (debouncedSearchTerm) {
      const resultados = await buscarPaquete(searchTerm, NUMBER_LIMIT)
      setPaginationWithResults(resultados)
      setResults(resultados.docs)
      // let resultadosLocales = []

      // // buscamos en la cache local
      // resultadosLocales = cacheLocal.filter(data => {
      //   return data.nombrePaquete.toLowerCase().includes(searchTerm.toLowerCase())
      // })

      // if (resultadosLocales.length > 0) {
      //   setResults(resultadosLocales)
      // } else {
      //   // hacemos fetch
      //   const resultados = await buscarPaquete(searchTerm)
      //   setResults(resultados)
      //   setCacheLocal([...cacheLocal, ...resultados ])
      // }

      setIsSearching(false)
    } else {
      setResults([])
      setIsSearching(false)
    }
  }, [debouncedSearchTerm])

  return (
    <>
      <div className="modal-search">
        <div className="modal-search__wrapper">
          <button type="button" className="modal-search__close" onClick={closeModal}>
            <img src="/images/close.svg" width="19px" height="19px" />
          </button>
          <label className="label">
            Búsqueda por nombre de paquete
          </label>
          <div className="input">
            <input type="text" autoFocus placeholder="Escriba un nombre" onChange={handleOnchange} />
            <div className="search-icon">
              <Search size="16" />
            </div>
          </div>
          <div className="table">
            <div className="table__head">
              <div className="code">
                Código
              </div>
              <div className="name">
                Nombre de Paquete
              </div>
              <div className="view">
                Ver
              </div>
            </div>
            <div className="table__content">
              {isSearching && (<span className="loading"></span>)}
              {results.length > 0
                ? results.map(result => (
                  <div className="table__item" key={result._id}>
                    <div className="code"> {result._id} </div>
                    <div className="name"> {result.nombrePaquete} </div>
                    <div className="view">
                      <button onClick={() => view(result._id)}>
                        <View size="24" />
                      </button>
                    </div>
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
          <ul className="pagination">
            <li className="pagination__item">
              <button type="button" onClick={() => paginateList(pagination.prevPage)} className="pagination__button pagination__button--prev" disabled={!pagination.hasPrevPage}>prev</button>
            </li>
            {renderPages(pagination.totalPages)}
            <li className="pagination__item">
              <button type="button" onClick={() => paginateList(pagination.nextPage)} className="pagination__button pagination__button--next" disabled={!pagination.hasNextPage}>next</button>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
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
          padding: 0.6rem 0.5rem;
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

        .code {
          width: 25%;
          padding-left: 1rem;
        }

        .name {
          width: 65%;
        }

        .view {
          width: 10%;
          text-align: center;
        }

        .view button {
          border-style: none;
          background: transparent;
          color: rgba(0, 0, 0, 0.2);
          cursor: pointer;
          margin: 0;
        }

        .view button:hover {
          color: #08bc62;
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

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )
  return debouncedValue
}
