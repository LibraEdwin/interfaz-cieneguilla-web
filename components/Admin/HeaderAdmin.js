import React, { useState } from 'react'
import { UserAvatar } from '../icons/UserAvatar'
import router from 'next/router'
import Loader from './Loader'
import Link from 'next/link'

const HeaderAdmin = ({ title }) => {
  const [isLoading, setIsLoading] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push('/login')
    }, 1000)
  }

  return (
    <>
      <div className="header-admin">
        <div className="header-admin__container">
          <Link href="/admin">
            <a className="header-admin__logo">
              <img src="/images/logo-black.webp" alt="Logo - Cieneguilla Travel"/>
            </a>
          </Link>
          <h2 className="header-admin__title">{title}</h2>
          <button type="button" className="header-admin__logout not-print" onClick={logout}>
            Cerrar sesión
            <UserAvatar size="24px" />
          </button>
        </div>
      </div>
      <Loader isLoading={isLoading} text="Cerrando sesión"/>

      <style jsx>{`
        .header-admin {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .header-admin__container {
          width: 100%;
          max-width: 1000px;
          padding: 0 1rem;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .header-admin__logo {
          display: block;
          height: 109px;
        }

        .header-admin__logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: left;
        }

        .header-admin__logout {
          cursor: pointer;
          background: transparent;
          border-style: none;
          display: flex;
          align-items: center;
          transition: 0.3s ease;
          font-weight: 600;
        }

        .header-admin__logout:hover {
          color: #0693dd;
        }

        @media (min-width: 1280px) {
          .header-admin__container {
            max-width: 1100px;
          }
        }

        @media print{
          .not-print{
            display: none
          }

          .header-admin__title {
            text-align: right;
          }
        }
        
      `}</style>
    </>
  )
}

export default HeaderAdmin
