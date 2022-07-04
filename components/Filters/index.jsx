import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import flatpickr from 'flatpickr'
import { IconCalendar, IconPointer, IconArrowBottom, IconAttachMoney } from '@/components/icons'
import { removeDuplicates } from '@/lib/util'

const Filters = ({ listaZonas, listaEstados, setListaPaquetes, setIsLoading }) => {
  const fromDateElement = useRef(null)
  const toDateElement = useRef(null)
  const [filter, setFilter] = useState({
    place: '',
    type: '',
    fromDate: '',
    toDate: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilter({
      ...filter,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { place, type, fromDate, toDate } = filter

    let urlSearch = `${process.env.URI_API}/api-cieneguilla-service/salidas-programadas/search-paquete?`

    if (place) {
      urlSearch = `${urlSearch}&zonaGeografica=${place}`
    }

    if (type) {
      urlSearch = `${urlSearch}&estadoPaquete=${type}`
    }

    if (fromDate && toDate) {
      urlSearch = `${urlSearch}&fechaSalida=${fromDate},${toDate}`
    }

    setIsLoading(true)
    let res = await fetch(urlSearch)
    res = await res.json()

    const filterPaquete = res.body.map(salida => salida.paqueteTuristico)
    const filtroIdPaqueteUnico = removeDuplicates(filterPaquete, '_id').filter(paquete => paquete.esEliminado === false)

    setListaPaquetes(filtroIdPaqueteUnico)
    setIsLoading(false)
  }

  useEffect(() => {
    const date = new Date().toISOString()
    const today = date.split('T')[0]

    flatpickr(fromDateElement.current, {
      altInput: true,
      minDate: today,
      altFormat: 'd/m/Y',
      onChange: (selectedDates, dateStr, instance) => {
        setFilter({
          ...filter,
          fromDate: dateStr
        })
      }
    })

    flatpickr(toDateElement.current, {
      altInput: true,
      minDate: today,
      altFormat: 'd/m/Y',
      onChange: (selectedDates, dateStr, instance) => {
        setFilter({
          ...filter,
          toDate: dateStr
        })
      }
    })
  }, [filter])

  return (
    <>
      <form className="filter" onSubmit={handleSubmit}>
        <div className="filter__item location">
          <div className="select">
            <span className="select__icon">
              <IconPointer fill="var(--fourth-color)" height={20} />
            </span>
            <span className="select__arrow">
              <IconArrowBottom fill="var(--fourth-color)" height={8} />
            </span>
            <select name="place" className="select__field" onChange={handleChange}>
              <option value="">¿A dondé quieres ir?</option>
              {listaZonas?.map(zona => (
                <option key={zona.id} value={zona.id}>{zona.texto}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="filter__item type">
          <p>Selecciona tu fecha de salida: </p>
          {/* <div className="select">
            <span className="select__icon">
              <IconAttachMoney fill="var(--fourth-color)" height={20} />
            </span>
            <span className="select__arrow">
              <IconArrowBottom fill="var(--fourth-color)" height={8} />
            </span>
            <select name="type" id="" className="select__field" onChange={handleChange}>
              <option value="">Tipo de paquete</option>
              {listaEstados?.map(estado => (
                <option key={estado.id} value={estado.id}>{estado.texto}</option>
              ))}
            </select>
          </div> */}
        </div>
        <div className="filter__item from">
          <div className="select">
            <span className="select__icon">
              <IconCalendar fill="var(--fourth-color)" height={16} />
            </span>
            <span className="select__arrow">
              <IconArrowBottom fill="var(--fourth-color)" height={8} />
            </span>
            <input type="text" className="select__field" placeholder="Desde" name="fromDate" ref={fromDateElement} />
          </div>
        </div>
        <div className="filter__item to">
          <div className="select">
            <span className="select__icon">
              <IconCalendar fill="var(--fourth-color)" height={16} />
            </span>
            <span className="select__arrow">
              <IconArrowBottom fill="var(--fourth-color)" height={8} />
            </span>
            <input type="text" className="select__field" placeholder="Hasta" name="toDate" ref={toDateElement} />
          </div>
        </div>

        <div className="filter__item submit">
          <button type="submit" className="button">buscar</button>
        </div>
      </form>
      <style jsx>{`
        .filter {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .filter__item {
          width: 100%;
        }

        .select {
          width: 100%;
          position: relative;
        }
        .select__arrow,
        .select__icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          height: 20px;
        }

        .select__icon {
          left: 1rem;
        }

        .select__arrow {
          right: 1rem;
        }

        .select__field {
          position: relative;
          width: 100%;
          z-index: 3;
          -webkit-appearance: none;
          background: transparent;
          padding: 0.8rem 1rem 0.8rem 2.5rem;
          border-radius: 0.5rem;
          border: 1px solid #C4C4C4;
          font-weight: 700;
          cursor: pointer;
        }

        .select__field::placeholder {
          color: var(--fourth-color);
        }

        .select__field:focus {
          border-color: var(--fourth-color);
        }

        .select__field::-ms-expand {
          display: none;
        }

        .button {
          background: var(--second-color);
          color: white;
          border-radius: 0.5rem;
          display: block;
          width: 100%;
          padding: 0.8rem 1rem;
          text-align: center;
          border-style: none;
          cursor: pointer;
          transition: 0.3s ease;
          text-transform: uppercase;
          font-weight: 700;
        }

        .button:hover {
          filter: brightness(110%);
        }

        .button:active {
          transform: scale(0.99);
          filter: brightness(90%);
        }

        .filter__item.type {
          font-weight: 600;
        }
        
        @media (min-width: 411px) {
          .filter__item.from,
          .filter__item.to {
            width: calc(50% - 0.25rem);
          }
        }
        
        @media (min-width: 1024px) {
          .filter__item.location,
          .filter__item.type {
            width: calc(25% - 0.25rem);
          }

          .filter__item.from,
          .filter__item.to {
            width: calc(25% - 0.5rem)
          }
        }

        @media (min-width: 1280px) {
          .filter__item.location
           {
            width: calc(24.8% - 0.25rem);
          }

          .filter__item.type {
            width: calc(18.8% - 0.25rem);
          }

          .filter__item.from,
          .filter__item.to {
            width: calc(15% - 0.5rem)
          }

          .filter__item.submit {
            width: calc(25%)
          }
        }
      `}</style>
    </>
  )
}

Filters.propTypes = {
  listaEstados: PropTypes.array.isRequired,
  listaZonas: PropTypes.array.isRequired,
  setListaPaquetes: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired
}

export default Filters
