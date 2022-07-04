import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import Link from 'next/link'
import Login from '../../login'
import useValidationToken from '@/hooks/useValidationToken'
import { useState } from 'react'
import ModalEditarBanner from '@/components/Modal/ModalEdicionBanner'

const SubMenu = () => {
  const shouldLogin = useValidationToken()
  const [openModalEditBanner, setOpenModalEditBanner] = useState(false)

  return (
    shouldLogin ? <Login />
    : <>
        <HeaderAdmin title="Módulos de plataforma" />
        <div className='submenu__container'>
          <div className="submenu__backbutton">
            <Link href="/admin">
              <img src="/icons/back-button-menu.svg" alt="a"/>
            </Link>
          </div>
          <div className="submenu__content">
            <div className="submenu__button" onClick={()=>setOpenModalEditBanner(true)}>
              <div className='submenu__button-nombre'>
                <img className="" src="/icons/edicion_banner.svg" width="73" />
                <a>Edición del banner principal</a>
              </div>
              <img
                className=""
                src="/icons/arrowRight.svg"
                alt="a"
                width="73"
                height="73"
              />
            </div>
            {openModalEditBanner && <ModalEditarBanner closeModal={()=>setOpenModalEditBanner(false)}/>}
            <Link href="/admin/edicion-de-contenidos/edicion-terminos-condiciones">
              <div className="submenu__button">
                <div className='submenu__button-nombre'>
                  <img className="" src="/icons/edicion_terminos.svg" alt="a" width="73" />
                  <a>Edición de terminos y condiciones</a>
                </div>
                <div>
                  <img
                    className=""
                    src="/icons/arrowRight.svg"
                    alt="a"
                    width="73"
                    height="73"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>

        <style>{/*css*/`
          .submenu__container {
            max-width: 976px;
            margin: auto;
            margin-top: 4rem;
          }
          .submenu__backbutton {
            cursor: pointer;
            width: 4rem;
          }
          .submenu__content {
            margin-top: 3.5rem;
          }
          .submenu__button {
            display: flex;
            justify-content: space-between;
            border: 1px solid rgba(0, 0, 0, 0.3);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 8px;
            margin-bottom: 30px;
            padding: 45px;
            cursor: pointer;
          }
          .submenu__button-nombre {
            display: flex;
            align-items: center;
            gap: 3rem;
            font-size: 24px;
            font-weight: bold;
            color: #08bc61;
          }
        `}</style>
      </>
  )
}

SubMenu.layout = 'Admin'

export default SubMenu