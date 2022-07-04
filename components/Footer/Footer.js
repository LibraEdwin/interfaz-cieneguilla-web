import React from 'react'
import FooterAbout from '@/components/Footer/components/FooterAbout'
import FooterBrand from '@/components/Footer/components/FooterBrand'
import FooterContact from '@/components/Footer/components/FooterContact'
import FooterMincetur from '@/components/Footer/components/FooterMincetur'
import SectionFooterSocial from '@/components/Footer/components/FooterSocial'

const links = [
  {
    to: '/nosotros',
    label: 'Nosotros'
  },
  {
    to: '/paquetes-y-full-days',
    label: 'Paquetes y Full Days'
  },
  {
    to: '/preguntas-frecuentes',
    label: 'Preguntas Frecuentes'
  },
  {
    to: '/suscripcion',
    label: 'Suscripción'
  }
]

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__container--fluid">
          <div className="footer__wrapper">
            <div className="about">
              <FooterAbout links={links}/>
            </div>
            <div className="contact">
              <FooterContact />
            </div>
            <div className="social">
              <SectionFooterSocial />
            </div>
            <div className="mincetur">
              <FooterMincetur />
            </div>
            <div className="logo__footer">
              <FooterBrand />
            </div>
          </div>
        </div>
      </footer>
      <div className="footerInterfaz">
                    <div>Copyright © { new Date().getFullYear() } - Cieneguilla Travel Tours</div>
                    <div style={{display: 'flex', alignItems: 'center'}}><span style={{marginRight: "10px"}}>Desarrollado por</span><a rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=51984162726&text=Hola%2C%20Interfaz" target="_blank"><img src="/interfaz-blanco.webp" width="100" height="41"/></a></div>
      </div>

      <style jsx>{`
        .footer {
          height: auto;
          position: relative;
          background: var(--second-color);
          padding: 3rem 0
        }

        .footerInterfaz{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    heigth: auto;
                    background-color: #0071ac;
                    color: white;
                    font-size: x-small;
                    padding: 10px 20px 10px 20px;
        }

        .logo__footer {
          display: flex;
          justify-content: center;
        }

        @media screen and (min-width: 720px) {
          .footer__wrapper{
            display: grid;
            grid-template-columns: repeat(2, auto);
            grid-template-rows: auto;
            column-gap: 5rem
          }
          
          .mincetur {
            grid-column: 1/2;
            grid-row: 2/3
          }
    
          .social {
            grid-column: 2/3;
          }

          .logo__footer {
            grid-column: 1/3;
          }

        }

        @media screen and (min-width: 960px) {
          .footer {
            height: 341px
          }
          .footer__wrapper{
            display: grid;
            grid-template-rows: 100px;
            justify-content: center;
            margin-top: 1.5rem;
          }

          .about {
            grid-column: 1/2;
            grid-row: 1/3;
          }

          .contact {
            grid-column: 2/3;
            grid-row: 1/3;
          }

          .logo__footer {
            grid-row: 1/3;
            grid-column: 4/5
          }

          .mincetur {
            grid-row: 1/2;
            grid-column: 3/4
          }
    
          .social {
            grid-row: 2/3;
            grid-column: 3/4
          }
        }

        @media print {
          .footer {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export default Footer
