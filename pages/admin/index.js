import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import Link from 'next/link'
import Login from '../login'
import useValidationToken from '@/hooks/useValidationToken'

const Menu = () => {
  const shouldLogin = useValidationToken()

  return (
    shouldLogin ? <Login />
      : <>
        <HeaderAdmin title="Módulos de plataforma" />
        <div className="menu-container">

          <Link href="/admin/paquete-turistico">
            <div className="menu">
              <div>
                <img className="" src="/icons/paquete.svg" alt="a" width="73" />
                <a>Registro de paquete o tour</a>
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

          <Link href="/admin/seguimiento-compra">
            <div className="menu">
              <div>
                <img className="" src="/icons/card.svg" alt="a" width="73" />
                <a>Control y seguimiento de compra</a>
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


          <Link href="/admin/edicion-de-contenidos">
            <div className="menu">
              <div>
                <img className="" src="/icons/editContenido.svg" alt="a" width="73" />
                <a>Edición de contenidos</a>
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
          <Link href="/admin/registro-cliente-web">
            <div className="menu">
              <div>
                <img className="" src="/icons/clients-group.svg" alt="a" width="73" />
                <a>Registro de clientes web</a>
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
        <style jsx>{
        /* css */ `
          .menu-container {
            max-width: 976px;
            margin: 0 auto;
            margin-top: 60px;
          }
          .menu {
            display: flex;
            // justify-content: center;
            border: 1px solid rgba(0, 0, 0, 0.3);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 8px;
            // height:  167px;
            margin-bottom: 30px;
            padding: 45px;
            cursor: pointer;
            justify-content: space-between;
          }
          .menu-body {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .menu div {
            display: flex;
            align-items: center;
          }
          .menu p {
            font-size: 24px;
            font-weight: bold;
            color: #08bc61;
            margin-left: 25px;
          }

          .menu a{
            font-size: 24px;
            font-weight: bold;
            color: #08BC61;
            margin-left: 25px;
          }
        `
        }</style>
      </>
  )
}

Menu.layout = 'Admin'

export default Menu
