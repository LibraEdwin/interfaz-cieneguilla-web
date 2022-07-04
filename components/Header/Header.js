import React, { useEffect, useState } from 'react';
import HeaderBrand from '@/components/Header/components/HeaderBrand';
import HeaderNavbar from '@/components/Header/components/HeaderNavbar';
import HeaderSidebarNav from '@/components/Header/components/HeaderSidebarNav';
import HeaderButtonBars from '@/components/Header/components/HeaderButtonBars';
import { getData } from '@/lib/Api';

const links = [
  {
    to: '/nosotros',
    label: 'Nosotros',
  },
  {
    to: '/paquetes-y-full-days',
    label: 'Paquetes y Full Days',
  },
  {
    to: '/preguntas-frecuentes',
    label: 'Preguntas Frecuentes',
  },
  {
    to: '/suscripcion',
    label: 'Suscripción',
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [campañas, setCampañas] = useState([])

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    (async () => {
      const data = await getData(`${process.env.URI_API}/api-cieneguilla-service/campania/`)
      const campañasVisibles = data.filter(campaña => campaña.visibilidad === true)
      setCampañas(campañasVisibles)
    })()
  }, [])

  return (
    <>
      <HeaderSidebarNav campañas={campañas} links={links} isOpen={isOpen} onToggle={handleToggle} />
      <header className="header">
        <div className="header__container container--fluid">
          <div className="header__wrapper">
            <HeaderButtonBars onClick={handleToggle} />
            <HeaderBrand
              to="/"
              imgSrc="/images/logo-black.webp"
              imgAlt="Logo - Cieneguilla Travel"
            />
            <HeaderNavbar campañas={campañas} links={links} />
          </div>
        </div>
      </header>

      <style jsx>{/*css*/`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: auto;
          z-index: 100;
          background: #FFFFFF;
        }

        .header__wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media screen and (min-width: 768px) {
          .header {
            height: 130px;
          }

          .header__wrapper {
            justify-content: space-between;
          }
        }

        @media screen and (min-width: 860px) {
          .header__container {
            padding: 0 3.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
