import React from 'react'
import Image from 'next/image'
import SectionFooter from '@/components/sections/SectionFooter'

const FooterContact = () => {
  return (
    <>
      <SectionFooter title="Contacto" padding={{ xs: 1 }} align="center">
        <div className="footer__contact--items">
          <div className="item">
            <Image
              className="info"
              src="/images/phone.png"
              width={18}
              height={18}
            />
            <span className="info">
              <a className='numerosWssp' href='tel:014798797'>
                (01) 479 8797
              </a> /
                
              <a className='numerosWssp' href='tel:014799213'>
                (01) 479 9213
              </a>
            </span>
          </div>
          <div className="item">
            <Image src="/images/whatsapp-footer.png" width={20} height={20} />
            <span className="info">
              <a className='numerosWssp' href='https://api.whatsapp.com/send?phone=51951568920' target="_blank">
                (+51) 951 568 920
              </a>/
              <a className='numerosWssp' href='https://api.whatsapp.com/send?phone=51966190480' target="_blank">
                (+51) 966 190 480
              </a>
              <br />
              <a className='numerosWssp' href='https://api.whatsapp.com/send?phone=51982197817' target="_blank">
                (+51) 982 197 817
              </a> / 
              <a className='numerosWssp' href='https://api.whatsapp.com/send?phone=51981297224' target="_blank">
                (+51) 981 297 224
              </a>
            </span>
          </div>
          <div className="item mail">
            <Image src="/images/mail_footer.png" width={20} height={19} />
            {/* <span>contacto@cieneguillatours.com</span> */}
            <span>
              <a href="mailto:reservas@cieneguillatours.com">
                reservas@cieneguillatours.com
              </a>
            </span>
          </div>
          <div className="item direction">
            <Image src="/images/location_footer.png" width={20} height={20} />
            <span className="calle">
              Calle Micaela Bastidas Zona F Mz.D Lt.5 - Cieneguilla
            </span>
          </div>
        </div>
      </SectionFooter>

      <style jsx>{
        /* css */ `
        .numerosWssp{
          color: #ffffff;
        }
          .footer__contact--items {
            color: #ffffff;
            font-size: 14px;
            font-weight: 400;
            text-align: center;

            align-items: center;
            display: flex;
            flex-direction: column;
          }

          .footer__contact--items .item {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .footer__contact--items div {
            margin-top: 0.7rem;
          }

          .footer__contact--items span {
            margin-left: 0.5rem;
            line-height: 17.5px;
            width: auto;
          }

          .mail a {
            text-decoration: underline;
            color: #ffffff;
          }

          @media screen and (min-width: 720px) {
            .footer__contact--items {
              display: flex;
              align-items: start;
              row-gap: 0.3rem;
            }

            .footer__contact--items div {
              margin-top: 0.5rem;
            }

            .footer__contact--items .item {
              justify-content: flex-start;
            }
          }
        `
      }</style>
    </>
  )
}

export default FooterContact
