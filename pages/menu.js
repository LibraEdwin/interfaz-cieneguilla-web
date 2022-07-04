import Image from "next/image";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import HeaderAdmin from "@/components/Admin/HeaderAdmin";
import Link from "next/link";

const Menu = () => {
  return (
    <>
      <HeaderAdmin title="Módulos de plataforma" />
      <div className="layout-admin">
        <main className="page">
          <div className="menu-container">
            <div className="menu">
              <div className="menu-body">
                <img className="" src="/icons/paquete.svg" alt="a" width="73" />
                <p>Registro de paquete o tour</p>
              </div>
            </div>
            <div className="menu">
              <div className="menu-body">
                <img className="" src="/icons/card.svg" alt="a" width="73" />
                <Link href="/admin/seguimiento-compra">
                  <a>Control y seguimiento de compra</a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{
        /*css*/ `
          .menu-container {
            max-width: 976px;
            margin: 0 auto;
            padding: 50px 0;
          }
          .menu {
            display: flex;
            justify-content: center;
            border: 1px solid rgba(0, 0, 0, 0.3);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 8px;
            height: 167px;
            margin-top: 30px;
          }
          .menu-body {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .menu-body p {
            font-size: 24px;
            font-weight: bold;
            color: #08bc61;
            margin-left: 25px;
          }

          .menu-body a {
            font-size: 24px;
            font-weight: bold;
            color: #08bc61;
            margin-left: 25px;
          }
        `
      }</style>
    </>
  );
};

Menu.layout = "Auth";

export default Menu;
