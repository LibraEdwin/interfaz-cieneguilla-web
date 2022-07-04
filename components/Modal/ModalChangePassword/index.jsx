import Input from "@/components/common/Input"
import { useState } from "react"

const ModalChangePassword = ({ close, client }) => {
  const [newContraseña, setNewContraseña] = useState('')
  const [confirmarContraseña, setConfirmarContraseña] = useState('')
  const [validacionContraseña, setValidacionContraseña] = useState('')

  const handleChangeNewContraseña = (e) => {
    setNewContraseña(e.target.value)
  }
  const handleChangeConfirmarContraseña = (e) => {
    setConfirmarContraseña(e.target.value)
  }
  const editCampaña = async (client) => {
    setValidacionContraseña('')
    if (newContraseña === confirmarContraseña) {
      await fetch(`${process.env.URI_API}/api-cieneguilla-service/clientes/password/cambiar`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dni: client._id,
          tipoDocumento: client.tipoDocumento,
          correo: client.correo,
          newPassword: confirmarContraseña
        })
      })
      close()
    } else {
      setValidacionContraseña('error')
    }
  }
  return (
    <>
      <div className="modal">
        <div className="modal__content">
          <button className="modal__close" onClick={close}>&times;</button>
          <h4 className="modal__title">Cambiar password de cliente</h4>
          <p className="modal__name">{client.nombre}</p>
          <Input label='Nuevo password' type='password' onChange={handleChangeNewContraseña} />
          <div className="mb-3"></div>
          <Input label='Confirmar password' type='password' error={validacionContraseña} onChange={handleChangeConfirmarContraseña} />
          {
            validacionContraseña === 'error' &&
            <span className="spanContraseñaIncorrecta">Contraseña incorrecta</span>
          }
          <button className="button" onClick={() => { editCampaña(client) }}><img src="/icons/refresh.svg" alt="" /> Cambiar</button>
        </div>
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal__close {
          position: absolute;
          top: 0.5rem;
          right: 1.5rem;
          cursor: pointer;
          background: transparent;
          border-style: none;
          padding: 0;
          font-size: 3rem;
        }

        .modal__content {
          width: 100%;
          max-width: 550px;
          background: white;
          border-radius: 0.5rem;
          padding: 2rem;
          position: relative;
        }

        .mb-3 {
          margin-bottom: 1rem;
        }
        
        .modal__title, .modal__name {
          text-align: center;
        }

        .modal__name {
          margin: 0.35rem 0 1.5rem;
        }

        .button {
          background: transparent;
          border-style: none;
          cursor: pointer;
          color: var(--main-color);
          font-weight: 600;
          display: flex;
          gap: 0.25rem;
          align-items: center;
          margin-left: auto;
          margin-top: 1rem;:
        }
        .spanContraseñaIncorrecta{
          position: absolute;
          font-weight: 700;
          top: 253px;
          color: red;
          font-size: 0.7rem;
          margin-left: 0.5rem;
        }
      `}</style>
    </>
  )
}

export default ModalChangePassword