import React, { useState } from 'react'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Select from '@/components/common/Select'
import { useGlobalContext } from '@/context/GlobalContext'
import { errorAlert, successAlert } from '@/lib/alerts'

const ModalCrearCuenta = ({ closeModal }) => {
  const { tipoDocs } = useGlobalContext()

  const [nombre, setNombre] = useState('')
  const [tipoDoc, setTipoDoc] = useState('1')
  const [id, setId] = useState('')
  const [celular, setCelular] = useState('')
  const [celularAlterno, setCelularAlterno] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState(null)
  const [repeatPassword, setRepeatPassword] = useState('')

  let finalPassword = ''
  if (password === repeatPassword) {
    finalPassword = password
  }

  const client = {
    _id: id,
    nombre,
    tipoDocumento: Number(tipoDoc),
    celular: Number(celular),
    celularAlterno: Number(celularAlterno),
    correo,
    password: finalPassword,
  }


  const handleSubmit = () => {
    fetch(`${process.env.URI_API}/api-cieneguilla-service/clientes`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(client)
    }).then(res => res.json())
      .then(res => {
        if (res.code === 200) {
          successAlert('Su cuenta ha sido creada')
          closeModal(false)
        }
        if (res.code === 400) errorAlert(res.error)
        if (password !== repeatPassword) errorAlert('Contraseñas son diferentes')
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  return (
    <>
      <div className="modal__crear-cuenta modal__container">
        <span className="btn_close">
          <img
            src="/images/close.svg"
            width="19px"
            height="19px"
            alt="cerrar"
            onClick={() => closeModal(false)}
          />
        </span>
        <h1 className="cuenta__title">Nueva cuenta</h1>
        <form autoComplete='off' action="" className="container__cuenta--formulario">
          <div className="form__item">
            <Input
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              fontWeight="normal"
              placeholder="Nombres completos"
              name="nombre"
              colorPlace="#C4C4C4"
              height={{
                xs: 40
              }}
            />
          </div>
          <div className="form__item dni">
            <Select
              onChange={(e) => setTipoDoc(e.target.value)}
              value={tipoDoc}
              name="tipoDocumento"
              bg="transparent"
              height={{
                xs: 40
              }}
            >
              {tipoDocs.map(doc =>
                <option key={doc._id} value={doc._id}>{doc.nombreTipoDoc}</option>
              )}
            </Select>
          </div>
          <div className="form__item--identificacion">
            <Select
              onChange={(e) => setTipoDoc(e.target.value)}
              value={tipoDoc}
              name="tipoDocumento"
              bg="transparent"
              height={{
                xs: 40
              }}
            >
              {tipoDocs.map(doc =>
                <option key={doc._id} value={doc._id}>{doc.nombreTipoDoc}</option>
              )}
            </Select>
          </div>
          <div className="form__item--num-dni">
            <Input
              onChange={(e) => setId(e.target.value)}
              type="text"
              fontWeight="normal"
              placeholder="Número"
              colorPlace="#C4C4C4"
              name="_id"
              height={{
                xs: 40
              }}
            />
          </div>
          <div className="form__item--cel">
            <Input
              onChange={(e) => setCelular(e.target.value)}
              type="text"
              fontWeight="normal"
              placeholder="Núm. celular"
              colorPlace="#C4C4C4"
              name="celular"
              height={{
                xs: 40
              }}
            />
          </div>
          <div className="form__item--cel-opc">
            <Input
              onChange={(e) => setCelularAlterno(e.target.value)}
              type="text"
              fontWeight="normal"
              placeholder="Núm. alternativo"
              colorPlace="#C4C4C4"
              name="celularAlterno"
              height={{
                xs: 40
              }}
            />
          </div>
          <div className="form__item">
            <Input
              onChange={(e) => setCorreo(e.target.value)}
              type="email"
              fontWeight="normal"
              placeholder="Correo electrónico"
              colorPlace="#C4C4C4"
              name="correo"
              height={{
                xs: 40
              }}
            />
          </div>
          <div className="form__item">
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fontWeight="normal"
              placeholder="Crear contraseña"
              colorPlace="#C4C4C4"
              name="password"
              height={{
                xs: 40
              }}
            />
          </div>
          <div className="form__item">
            <Input
              onChange={(e) => setRepeatPassword(e.target.value)}
              type="password"
              fontWeight="normal"
              placeholder="Repetir contraseña"
              colorPlace="#C4C4C4"
              name="repeatPassword"
              height={{
                xs: 40
              }}
            />
          </div>
        </form>
        <div className="btn__crear-cuenta">
          <Button
            type="submit"
            font="18px"
            label="crear cuenta"
            color="var(--main-color)"
            onClick={handleSubmit}
            width={{
              xs: 283
            }}
            height={{
              xs: 40,
              md: 40
            }}
          />
        </div>
      </div>
      <div className="overlay" onClick={() => closeModal(false)}></div>

      <style jsx>{
        /* css */ `
          .modal__crear-cuenta {            
            margin: auto;
            width: 339px;
            // height: 523px;
            display: grid;           
            border-radius: 8px;
            background: #ffffff;
            color: var(--fourth-color);
            grid-template-columns: auto;
            // padding: 24px 27px 81px 27px;
            box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
          }

          .cuenta__title {
            font-size: 18px;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
          }

          img {
            display: flex;
            margin-left: 265px;
            cursor: pointer;
          }

          .container__cuenta--formulario {
            width: 283px;
            display: grid;        
            row-gap: 1rem;
            column-gap: 14px;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;            
            grid-template-rows: repeat(6, 40px);
            grid-template-columns: repeat(2, auto);
          }

          .form__item {
            grid-column: 1/3;
          }

          // .form__item--identificacion,
          // .form__item--num-dni {
          //   display: none;
          // }

          .form__item.dni {
            display: none;
          }

          .modal__container {
            top: 50% !important;
          }          

          @media screen and (min-width: 920px) {
            .modal__crear-cuenta {
              width: 680px;
              height: 547px;
              margin: auto;
              padding: 23px 23px;
            }

            .container__cuenta--formulario {
              display:grid;
              width: 392px;
              row-gap: 14px;
              column-gap: 16px;
              margin-top: 33px;
              margin-bottom: 22px;
              justify-self: center;              
              grid-template-rows: repeat(6, 40px);
              grid-template-columns: repeat(4, auto);              
            }

            .form__item {
              width: 392px;
              grid-column: 1/5;
            }
            .dni {
              display: none;
            }

            .form__item--num-dni {
              grid-column: 2/5;
            }

            .form__item--cel {
              width: 181px;
              grid-column: 1/3;
            }
            
            .form__item--cel-opc {
              width: 181px;
              grid-column: 3/5;
            }

            .form__item--identificacion,
            .form__item--num-dni {
              display: block;
            }

            .form__item--identificacion {
              width: 96px;
            }

            .form__item--num-dni {
              width: 280px;
            }

            .form__item--cel {
              width: 184px;
            }

            .form__item--cel-opc {
              width: 194px;
            }

            .btn__crear-cuenta {
              margin: 0 auto;
            }

            .btn_close {
              margin-bottom: 18px;
              display: flex;
              justify-content: flex-end;
            }
            
            .modal__container {
              top: 52% !important;
            }
          }
        `
      }</style>
    </>
  )
}

export default ModalCrearCuenta
