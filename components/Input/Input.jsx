import { PaqueteTuristicoCtx } from "@/context/paqueteTuristicoCtx"
import { useContext } from "react"

export default function Input({ type, textAlign, paddingLeft, ...res }) {
  const { paqueteTuristico, setPaqueteTuristico } = useContext(PaqueteTuristicoCtx)

  const changeValue = (e) => {
    const { name, value } = e.target

    setPaqueteTuristico({
      ...paqueteTuristico,
      [name]: value
    })
  }

  return (
    <>
      <input type={type} className='input-default ' onChange={changeValue} {...res} />
      <style jsx>{`
        .input-default {
          width: 100%;
          padding: 0.6rem 0.5rem;
          padding-left: ${paddingLeft};
          border-radius: 8px;
          color: var(--border-color);
          border: 1px solid var(--border-color);
          text-align: ${textAlign};
          font-weight: 600;
        }

        .input-default::-webkit-outer-spin-button,
        .input-default::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        .input-default::placeholder {
          font-weight: 600;
          color: rgba(0, 0, 0, 0.3);
        }

        .input-default[type=number] {
            -moz-appearance:textfield;
        }
      `}</style>
    </>
  )
}
