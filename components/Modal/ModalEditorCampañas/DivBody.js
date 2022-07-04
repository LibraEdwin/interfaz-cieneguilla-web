import React, { useState } from 'react'
import { MdEdit, MdSave, MdDelete } from 'react-icons/md';
import { BsEyeFill } from 'react-icons/bs';
import { useEffect } from 'react';
import { ButtonVisibilidad } from '@/components/common/ButtonVisibilidad';
import { InputCampaña } from '@/components/common/inputCampaña';

export const DivBody = ({ _id, nombreCampaña, colorButton, visibilidad, getCampaña }) => {
  const [disable, setDisable] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [btnEye, setBtnEye] = useState(visibilidad);
  const [dataNameCamapaña, setDataNameCamapaña] = useState(nombreCampaña);
  const [dataColorButtonCamapaña, setDataColorButtonCamapaña] = useState(colorButton);


  const handleImputChangeName = (e) => {
    setDataNameCamapaña(e.target.value)
  }
  const handleImputChange = (e) => {
    setDataColorButtonCamapaña(e.target.value)
  }
  const btnEdit = () => {
    setDisableInput(true)
    setDisable(!disable)
  }
  useEffect(() => {
    document.getElementById(_id).focus()
  }, [disable])

  const btnSave = () => {
    setDisable(!disable)
    editCampaña(_id)
    setDisableInput(false)
  }
  //editar
  const editCampaña = async (id) => {
    await fetch(`${process.env.URI_API}/api-cieneguilla-service/campania/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombreCampaña: dataNameCamapaña,
        colorButton: dataColorButtonCamapaña,
        visibilidad: btnEye
      })
    })
  }
  const editCampañaVisibilidad = async (id) => {
    await fetch(`${process.env.URI_API}/api-cieneguilla-service/campania/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        visibilidad: !visibilidad
      })
    })
  }

  // eliminar
  const deleteCampaña = async (id) => {
    await fetch(`${process.env.URI_API}/api-cieneguilla-service/campania/${id}`, {
      method: 'DELETE'
    })
    getCampaña()
  }

  return (
    <>
      <div className="code"> {_id} </div>
      <div className="name">
        <InputCampaña
          desavilitado={disableInput}
          type='text'
          disabled={disable}
          name='name'
          id={_id}
          onChange={handleImputChangeName}
          value={dataNameCamapaña} />
      </div>
      <div className="Color">
        <div className='divInpColor'>
          <span className='spanColor'>Color boton</span>
          <input
            type='Color'
            name='colorButton'
            className='inpColor'
            onChange={handleImputChange}
            value={dataColorButtonCamapaña}
            disabled={disable} />
        </div>
      </div>
      <div className="view">
        {(disable &&
          (<ButtonVisibilidad onClick={() => btnEdit(_id)} className='btn_size'><MdEdit /></ButtonVisibilidad>)) ||
          (!disable &&
            (<ButtonVisibilidad onClick={() => btnSave()} className='btn_size'><MdSave /></ButtonVisibilidad>))
        }
        <ButtonVisibilidad onClick={() => deleteCampaña(_id)} >
          <MdDelete />
        </ButtonVisibilidad>
        <ButtonVisibilidad
          visibilidad={btnEye}
          onClick={() => { editCampañaVisibilidad(_id), setBtnEye(!visibilidad) }}>
          <BsEyeFill />
        </ButtonVisibilidad>
      </div>
      <style jsx>{/*css*/`
        .code {
          width: 20%;
          padding-left: 1rem;
        }
        .name {
          width: 40%;
        }
        .Color{
          white: 30%;
          margin: auto;
        }
        .divInpColor{
          position: relative;
          display:flex;
          border: 1px solid #08BC61;
          color: #08BC61;
          padding: 1px 3px;
          border-radius: 10px;
          margin: auto;
        }
        .spanColor{
          font-family: 'Quicksand';
          font-style: normal;
          font-weight: 700;
          font-size: 8px;
          line-height: 10px;
          margin: auto;
        }
        .inpColor{
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: transparent;
          width: 25px;
          height: 25px;
          border: none;
          cursor: pointer;
        }
        .inpColor::-webkit-color-swatch {
          border-radius: 50%;
          border: none;
        }
        .view {
          width: 20%;
          text-align: center;
          display: flex;
        }

        .view button {
          border-style: none;
          background: transparent;
          margin: 0;
        }
      `}</style>
    </>
  )
}
