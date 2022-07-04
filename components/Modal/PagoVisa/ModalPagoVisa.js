import React, { useState, useContext } from 'react'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Select from '@/components/common/Select'
import Image from 'next/image'
import ModalPagoSatisfactorio from '../Pago/PagoSatisfactorio'
import IconTC from '@/components/icons/tc.svg'
import IconMail from '@/components/icons/mail.svg'
import IconUser from '@/components/icons/userTC.svg'
import { NotaVentaCtx } from '@/context/NotaVentaCtx'
import { useRouter } from 'next/router'

const ModalPagoVisa = ({ closeModalPagoVisa, monto }) => {
  const router = useRouter()
  const [openModalPagoSatisfactorio, setOpenModalPagoSatisfactorio] = useState(false)
  const { notaVenta } = useContext(NotaVentaCtx)

  const sendPayment = () => {
    fetch(`${process.env.URI_API}/api-cieneguilla-service/notas-venta`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notaVenta)
    })
      .then(res => res.json())
      .then(res => {
        setOpenModalPagoSatisfactorio(true)
        setTimeout(() => {
          router.push(`/detalle-compra/${res.body._id}`)
        }, 1200)
      })
      .catch(err => console.log(err.message))
  }

  const formatToCurrency = amount => {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

  return (
    <>
      <div className="modal__pago--visa modal__container">
        <span className="btn_close">
          <img
            src="/images/close.svg"
            width="19px"
            height="19px"
            alt="cerrar"
            onClick={() => closeModalPagoVisa(false)}
          />
        </span>
        <div className="payment__visa">
          <Image src="/images/visanet.png" width={211} height={140} />
        </div>
        <form action="" className="container__datos">
          <div className="item--num">
            <Input
              icon={<IconTC height={20} />}
              type="text"
              fontWeight="normal"
              placeholder="Numero de tarjeta"
              name="numeroTarjeta"
              height={{
                xs: 40
              }}
            />
          </div>
          <div className="item--ccv">
            <Input
              type="text"
              fontWeight="normal"
              placeholder="CCV"
              name="ccv"
              height={{
                xs: 40
              }}
            />
          </div>

          <div className="item">
            <Input
              icon={<IconUser height={20} />}
              type="text"
              fontWeight="normal"
              placeholder="Nombre del titular"
              name="dni"
              height={{
                xs: 40
              }}
            />
          </div>
          <div className="item">
            <Input
              icon={<IconMail height={20} />}
              type="email"
              fontWeight="normal"
              placeholder="Correo electrónico"
              name="email"
              height={{
                xs: 40
              }}
            />
          </div>
        </form>
        <div className="btn__pagar">
          <Button
            type="submit"
            font="18px"
            label={`Pagar S/ ${formatToCurrency(monto)}`}
            color="var(--main-color)"
            width={{
              xs: 283,
              lg: 450
            }}
            height={{
              xs: 40,
              md: 40
            }}
            onClick={sendPayment}
          />
          { openModalPagoSatisfactorio && <ModalPagoSatisfactorio closeModalPagoDone={setOpenModalPagoSatisfactorio}/>}
        </div>
      </div>

      <div className="overlay" onClick={() => closeModalPagoVisa(false)}></div>

      <style jsx>{
        /* css */ `
          .modal__pago--visa {            
            margin: auto;
            width: 339px;
            height: 523px;
            display: grid;           
            border-radius: 8px;
            background: #ffffff;
            color: var(--fourth-color);
            grid-template-columns: auto;
            padding: 24px 27px 81px 27px;
            box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
          }

          img {
            display: flex;
            margin-left: 265px;
            cursor: pointer;
          }

          .container__datos {
            width: 283px;
            display: grid;        
            row-gap: 1rem;
            column-gap: 14px;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;            
            grid-template-rows: repeat(3, 40px);
            grid-template-columns: 222px 58px;
          }

          .item {
            grid-column: 1/3;
          }

          .modal__container {
            top: 50% !important;
          }     
          
          .payment__visa {
            display: flex;
            justify-content: center;
            height:140px;
          }

          @media screen and (min-width: 920px) {
            .modal__pago--visa {
              width: 680px;
              height: 493px;
              margin: auto;
              padding: 23px 23px 35px;
              grid-template-rows: 40px 140px
            }

            .container__datos {
              display:grid;
              justify-content: center;
              margin: auto;
              width: 392px;
              row-gap: 24px;
              column-gap: 16px;             
              // grid-template-rows: repeat(2, 40px);
              grid-template-columns: 359px 71px;             
            }
           

            .btn__pagar {
              margin: auto;
            }

            .btn_close {
              // margin-bottom: 18px;
              display: flex;
              justify-content: flex-end;
            }
            
            .modal__container {
              top: 52% !important;
            }

            .overlay {
              top: 130px!important;
            }
          }
        `
      }</style>
    </>
  )
}

export default ModalPagoVisa
