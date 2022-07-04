import React from 'react'
import Section from '@/components/Section/Section'

const LoaderDetalle = () => {
  return (
    <>
    <div className="skeleton__container">
      <section className="container">
        <div className='skeleton__backbutton'></div>
        <div className='skeleton__cotizador'></div>
        <div className='skeleton__galeria'>
          <div className='skeleton__foto'></div>
          <div className='skeleton__anexa1'></div>
          <div className='skeleton__anexa2'></div>
          <div className='skeleton__anexa3'></div>
          <div className='skeleton__anexa4'></div>
        </div>
        <div className="info">
          <div className="skeleton__info">
            <Section>
              <h2 className="skeleton__subtitle">NUESTRO PROGRAMA INCLUYE</h2>
              <ul className="list">
                <li><div className="list__content"></div></li>
                <li><div className="list__content"></div></li>
                <li><div className="list__content"></div></li>
              </ul>
            </Section>
          </div>
          <div className="skeleton__info">
            <Section>
              <h2 className="skeleton__subtitle">NO INCLUYE</h2>
              <ul className="list">
                <li><div className="list__content"></div></li>
                <li><div className="list__content"></div></li>
                <li><div className="list__content"></div></li>
              </ul>
              <div className="skeleton__buttons">
                <div className="skeleton__btn"></div>
                <div className="skeleton__btn"></div>
                <div className="skeleton__btn"></div>
              </div>
            </Section>
          </div>
        </div>
        <div className="skeleton__info">
            <Section>
              <h2 className="skeleton__subtitle">QUE LLEVAR</h2>
              <div className="skeleton__llevar"></div>
            </Section>
          </div>
      </section>
      </div>
      <style jsx>{/* css */`
        .skeleton__container {
          display: flex;
          flex-direction: column;
          margin: auto;
          margin-bottom: 2rem;
        }
        .skeleton__backbutton {
          width: 340px;
          height: 25px;
          background: #f3f3f3;
          margin-bottom: .5rem;
        }
        .skeleton__cotizador {
          width: 340px;
          height: 151px;
          background: #f3f3f3;
          margin: auto;
          margin-bottom: 2rem;
          border-radius: 8px;
        }
        .skeleton__galeria {
          display: flex;
          flex-direction: row;
        }
        .skeleton__foto {
          width: 382px;
          height: 340px;
          background: #f3f3f3;
          margin: auto;
        }
        .skeleton__subtitle {
          color: #f3f3f3;
          margin-bottom: 1rem;
        }
        .list li {
          color: var(--fourth-color);
          font-weight: normal;
          font-size: 14px;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
        }
        .list li::before {
          content: "";
          display: block;
          width: 16px;
          height: 16px;
          background: #f3f3f3;
          border-radius: 50%;
          margin-right: 1rem;
          margin-bottom: .5rem;
        }
        .list__content {
          width: 250px;
          height: 16px;
          background: #f3f3f3;
        }
        .skeleton__buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .5rem;
          margin-top: 2rem;
        }
        .skeleton__btn {
          width: 290px;
          height: 40px;
          background: #f3f3f3;
          border-radius: 8px;
        }
        .skeleton__llevar {
          width: 352px;
          height: 140px;
          background: #f3f3f3;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 2rem;
          margin: auto;
        }

        @media screen and (min-width: 720px) {
          .skeleton__foto,
          .skeleton__anexa1 {
            width: 338px;
            height: 340px;
            background: #f3f3f3;
          }
        }

        @media screen and (min-width: 768px) {
          .skeleton__cotizador {
            width: 90%;
          }
          .skeleton__galeria {
            display: grid;
            justify-content: center;
            grid-template-columns: 320px 160px 160px;
            grid-template-rows: repeat(2, 1fr);
            gap: .5rem;
          }
          .skeleton__foto {
            width: 320px;
            height: 330px;
            grid-row: 1/3;
            grid-column: 1/2;
          }
          .skeleton__anexa1 {
            background: #f3f3f3;
            grid-column: 2/3;
            grid-row: 1/2;
            width: 160px;
            height: 160px;
          }          
          .skeleton__anexa2 {
            background: #f3f3f3;
            grid-column: 3/4;
            grid-row: 1/2;
            width: 160px;
            height: 160px;
          }
          .skeleton__anexa3 {
            background: #f3f3f3;
            grid-column: 2/3;
            grid-row: 2/3;
            width: 160px;
            height: 160px;
          }
          .skeleton__anexa4 {
            background: #f3f3f3;
            grid-column: 3/4;
            grid-row: 2/3;
            width: 160px;
            height: 160px;
          }
          .info {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .skeleton__llevar{
            width: 100%;
            margin-botom: 2rem;
          }
        }

        @media screen and (min-width: 1200px) {
          .skeleton__galeria {
            display: grid;
            grid-template-columns: 500px 250px 250px;
          }
          .skeleton__foto {
            width: 500px;
            height: 500px;
          }
          .skeleton__anexa1,
          .skeleton__anexa2,
          .skeleton__anexa3,
          .skeleton__anexa4 {
            width: 250px;
            height: 250px;
          }
        }      
      `}</style>
    </>
  )
}

export default LoaderDetalle