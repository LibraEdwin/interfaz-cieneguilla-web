import HeaderAdmin from "@/components/Admin/HeaderAdmin"
import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import ModalChangePassword from "@/components/Modal/ModalChangePassword"
import TableClient from "@/components/Table/TableClient"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from "react"

const RegistroClienteWeb = () => {
  const [dataCliente, setdataCliente] = useState([])
  const [client, setClient] = useState({})
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const handleChangePassword = (client) => {
    setShowModal(true)
    setClient(client)
  }
  const getCampaña = async () => {
    const filtro = await fetch(`${process.env.URI_API}/api-cieneguilla-service/clientes`)
    const { body } = await filtro.json()
    setdataCliente(body)
  }
  useEffect(() => {
    getCampaña()
  }, [])
  return (
    <>
      <HeaderAdmin title="Registro de Clientes Web" />
      <main className="regitro-cliente">
        <div className="regitro-cliente--container not-print">
          <div className="labels">
            <label>Desde fecha de registo:</label>
            <label>Hasta fecha de registo :</label>
          </div>
          <div className="filters__group">
            <div className="filters__subgroup">
              <div className="filter__item">
                <Input
                  type="date"
                  content="attr(data-date)"
                  iconMarginRight={38}
                  font="18px"
                  colorPlace="var(--fourth-color)"
                  height={{
                    xs: 40,
                    md: 40
                  }}
                  width="214px"
                />
              </div>
              <div className="filter__item">
                <Input
                  type="date"
                  iconMarginRight={38}
                  colorPlace="var(--fourth-color)"
                  width="214px"
                  font="18px"
                  height={{
                    xs: 40,
                    md: 40
                  }}
                />
              </div>
              <button className="search" >
                <Image src="/icons/lupa.svg" width={17} height={17} />
              </button>
            </div>
          </div>
        </div>
        <TableClient clients={dataCliente} handleOnClick={handleChangePassword} />
        {showModal && (
          <ModalChangePassword close={() => setShowModal(false)} client={client} />
        )}
      </main>
      <footer className="regitro-cliente__footer">
        <div className="regitro-cliente__footer-container no-print">
          <Button
            label="ir atras"
            variant="outline"
            width="139"
            className='ml-2'
            textTransform="uppercase"
            onClick={() => router.back()}
          />
          <Button
            label="imprimir"
            variant="outline"
            width="139"
            className='ml-2'
            textTransform="uppercase"
          />

          <Button
            label="exportar"
            width="139"
            className='ml-2'
            textTransform="uppercase"
          />
        </div>
      </footer>
      <style jsx>{`
          .regitro-cliente__footer {
            position: sticky;
            bottom: 0;
            width: 100%;
            left: 0;
            border-top: 1px solid rgba(0,0,0,0.1);
            padding: 1rem 0;
            background: white;
          }
          .regitro-cliente__footer-container {
            display: flex;
            justify-content: flex-end;
            padding: 1rem 0;
            max-width: 1100px;
            margin: 0 auto;
          }
          .regitro-cliente {
            width: 100%;
            min-height: calc(100vh - 300px);
            margin: 50px auto; 
            max-width: 1100px;
            padding: 0 1rem;
          }

          .regitro-cliente--container {
            display: flex;
            flex-direction: column;
          }

          .regitro-cliente--dates{
            display:flex;
            margin-bottom: 20px;
            gap:20px;
            color: var(--fourth-color);
            font-size: 18px;
            font-weight: bold;
          }

          .filters__group {
            display: flex;
            gap:8px
          }

          .filters__subgroup {
            display: flex;
            gap: 8px;
          }

          .labels {
            display: grid;
            grid-template-columns: 214px 214px 191px;
            margin-bottom: 5px;
            line-height: 15px;
            font-weight: bold;
            column-gap: 11px;
            font-size: 12px;
            color: #585858;
          }
          .search{
            background: var(--main-color);
            border-radius: 8px;
            width: 47px;
            display:flex;
            justify-content: center;
            align-items:center;
            cursor:pointer;
            height: 40px;
            border-style:none;
          }

          .btn {
            display: grid;
            width: 347px;
            height: 43px;
          }

          .modal__table {
            width: 100%;
            max-width: 970px;
            margin-top: 29px;
          }

          
        @media screen{
          .not-display{
            display:none;
          }
      
        }

        @media print{
          @page {
            margin: 5mm;
            size: landscape;
          }

          .not-print{
            display: none
          }

          .print{
            position: absolute;
            left: 40px;
          }
          
          .regitro-cliente {
            padding: 0;
          }
        }
        `
      }</style>
    </>
  )
}

RegistroClienteWeb.layout = 'Admin'

export default RegistroClienteWeb