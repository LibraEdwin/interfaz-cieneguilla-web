import React from 'react'

export default function ModalBtn ({ icon, label, ...res }) {
  return (
    <>
      <button className="modal__btn" { ...res }>
        <img src={`/icons/${icon}`}/>
        {label}
      </button>
      <style jsx>{`
        .modal__btn {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0 0.4rem 1rem;
          cursor: pointer;
          background: transparent;
          color: var(--main-color);
          font-weight: bold;
          font-size: 18px;
          border-style: none;
        }
      `}</style>
    </>
  )
}
