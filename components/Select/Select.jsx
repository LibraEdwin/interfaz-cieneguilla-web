import { PaqueteTuristicoCtx } from '@/context/paqueteTuristicoCtx'
import { useContext } from 'react'

export default function Select ({ items, placeholder, ...res }) {
  const { paqueteTuristico, setPaqueteTuristico } = useContext(PaqueteTuristicoCtx)

  const selectChange = (e) => {
    setPaqueteTuristico({
      ...paqueteTuristico,
      [e.target.name]: e.target.value
    })
  }


  return (
    <>
      <select className="select-default" onChange={selectChange} {...res}>
        <option value="">{placeholder}</option>
        {items && items.map(el => (
          <option key={el.id} value={el.id}>{el.texto}</option>
        ))}
      </select>
      <style jsx>{`
        .select-default {
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.5rem;
          color: var(--border-color);
          cursor: pointer;
          font-weight: 700;
        }
      `}</style>
    </>
  )
}
