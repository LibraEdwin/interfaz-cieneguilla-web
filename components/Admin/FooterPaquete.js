import { useContext } from 'react'
import { PaqueteTuristicoCtx } from '@/context/paqueteTuristicoCtx'
import { useRouter } from 'next/router'
import Loader from './Loader'

const FooterPaquete = ({ uploadFiles }) => {
  const router = useRouter()
  const { paqueteTuristico, limpiarPaquete, eliminarPaquete, editarPaquete, registrarPaquete, isLoading } = useContext(PaqueteTuristicoCtx)
  const registrarOtrosDatos = () => router.push(`/admin/otros-datos/${paqueteTuristico.id}`)

  return (
    <>
    <footer className="footer-paquete">
      <button className="btn-default--stroke" onClick={uploadFiles}>Subir archivos de paquete</button>
      <button className="btn-default--stroke" disabled={!paqueteTuristico.id} onClick={registrarOtrosDatos}>Registrar otros datos</button>
      <button className="btn-default--stroke" disabled={!paqueteTuristico.id} onClick={limpiarPaquete}>Nuevo</button>
      <button className="btn-default--stroke" disabled={!paqueteTuristico.id} onClick={eliminarPaquete}>Borrar</button>
      {!paqueteTuristico.id
        ? (
        <button className="btn-default" onClick={registrarPaquete}>Registrar</button>
          )
        : (
        <button className="btn-default" onClick={editarPaquete}>Actualizar</button>
          )}
    </footer>
    <Loader isLoading={isLoading} text="Un momento estamos procesando su solicitud"/>
    <style jsx>{`
      .footer-paquete {
        display: flex;
        gap: 1rem;
        justify-content: center;
        border-top: 1px solid rgba(0,0,0,0.1);
        padding: 2rem 0;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: white;
        z-index: 10;
      }

      .btn-default {
        padding: 0.5rem 1rem;
        height:40px;
        border-radius: 8px;
        border-style: none;
        font-size: 18px;
        font-weight: 700;
        color: white;
        background: #08BC61;
        cursor: pointer;
      }

      .btn-default--stroke {
        padding: 0.5rem 1rem;
        height: 40px;
        border-radius: 8px;
        border-style: none;
        border: 1px solid #08BC61;
        font-size: 18px;
        font-weight: 700;
        color: #08BC61;
        background: transparent;
        cursor: pointer;
        transition: 0.4s ease;
      }

      .btn-default--stroke:disabled {
        opacity: 0.6;
        cursor: initial;
      }

      .btn-default--stroke:hover:disabled {
        background: transparent;
        color: #08BC61;
      }

      .btn-default--stroke:hover {
        background: #08BC61;
        color: white;
      }
    `}</style>
    </>
  )
}

export default FooterPaquete
