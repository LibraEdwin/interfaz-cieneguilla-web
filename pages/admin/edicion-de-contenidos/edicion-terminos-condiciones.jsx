import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import Button from '@/components/common/Button'
import { successAlert } from '@/lib/alerts'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const TextAreaResize = ({ updateState, ...props }) => {
  const refTextArea = useRef()
  const [attr, setAttr] = useState({
    rows: 1,
    minRows: 5,
    maxRows: 10,
  })

  const calculateAutoSize = () => {
    if (refTextArea) {
      refTextArea.current.style.height = `auto`
      let scHeight = refTextArea.current.scrollHeight
      refTextArea.current.style.height = `${scHeight}px`
    }
  }

  const handleOnChange = (e) => {
    calculateAutoSize()
    updateState(e)
  }

  useEffect(() => {
    calculateAutoSize()
  }, [])
  return <>
    <textarea
      ref={refTextArea}
      rows={attr.rows}
      className='item-textarea'
      onChange={handleOnChange}
      {...props}
    />
    <style jsx>{`
    .item-textarea {
      width: 100%;
      font-size: 18px;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border-style: none;
      border: 1px solid #C4C4C4;
      line-height: 22px;
      resize: none;
      overflow-y: hidden;
    }
  `}</style>
  </>
}

export const getServerSideProps = async (context) => {
  const response = await fetch(`${process.env.URI_API}/api-cieneguilla-service/terms`)
  const data = await response.json()

  return {
    props: { terms: data.terms }
  }
}

const TerminosYCondiciones = ({ terms }) => {
  const { back } = useRouter()
  const [items, setItems] = useState(terms)
  const lastItem = items[items.length - 1]
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeValue = (e) => {
    const { value } = e.target
    const indexParagraph = Number(e.target.getAttribute('data-index'))

    const addedParagraph = items.map((item, index) => {
      return index === indexParagraph ? { ...item, text: value } : item
    })

    console.log(addedParagraph)

    setItems(addedParagraph)
  }
  const addItem = () => setItems([...items, { _id: uuidv4(), text: '' }])
  const save = async () => {
    setIsLoading(true)
    const dataSanitize = items.filter(item => item.text !== '')
    const response = await fetch(`${process.env.URI_API}/api-cieneguilla-service/terms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataSanitize)
    })
    setIsLoading(false)
    successAlert('Guardado exitosamente')
  }
  const removeItem = (index) => {
    const itemRemoved = items.filter((item, i) => i !== index)
    console.log(itemRemoved)
    setItems(itemRemoved)
  }
  return (
    <>
      <HeaderAdmin title="Editor de terminos y condiciones" />
      <div className="container">
        <div className='wrapper'>
          <ol className='list'>
            {items.length > 0 && items.map((item, index) => (
              <li className='item-group' key={item?._id}>
                <b>{index + 1}</b>
                <TextAreaResize
                  data-index={index}
                  placeholder='Ingrese el texto aquí'
                  defaultValue={item.text}
                  updateState={handleChangeValue}
                />
                <button
                  className='button-remove'
                  disabled={index === 0 && items[0] === ''}
                  onClick={() => removeItem(index)}>
                  <img src="/icons/deleteRegistro.svg" alt="" />
                </button>
              </li>
            ))}
          </ol>
          <button
            className='button-add'
            onClick={addItem}
            disabled={lastItem?.text === ''}>
            <img src='/icons/add.svg' />
            Agregar
          </button>
        </div>
      </div>
      <footer className='footer'>
        <div className="container">
          <Button
            label="Ir atrás"
            variant="outline"
            width={139}
            onClick={back}
          />
          <Button label="Guardar" loading={isLoading} width={139} onClick={() => save()} />
        </div>
      </footer>
      <style jsx>{`
        .wrapper {
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          border-radius: 8px;
          background: white;
          padding: 4rem;
          width: 100%;
          margin: 0 auto;
          text-align: end;
          margin-bottom: 130px;
        }

        .container {
          width: 90%;
          max-width: 1200px;
        }

        .footer {
          position: fixed;
          bottom: 0;
          width: 100%;
          border-top: 1px solid rgba(0, 0, 0, 0.25);
          padding: 2rem 0;
          margin-top: 1rem;
          background: white;
        }

        .footer .container {
          display: flex;
          gap: 1.5rem;
          justify-content: flex-end;
        }

        .list {
          margin: 0;
          padding: 0;
        }

        .item-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }



        .button-remove {
          display: inline-flex;
          gap: 0.25rem;
          align-items: center;
          border-style: none;
          padding: 0;
          cursor: pointer;
          color: black;
        }

        .button-add {
          display: inline-flex;
          gap: 0.25rem;
          align-items: center;
          border-style: none;
          padding: 0;
          cursor: pointer;
          color: black;
          background: transparent;
          font-weight: 700;
          margin-right: 30px;
        }
        button:disabled {
          opacity: 0.5;
        }
      `}</style>
    </>
  )
}

TerminosYCondiciones.layout = 'Admin'

export default TerminosYCondiciones