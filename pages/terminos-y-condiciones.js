import React from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router'
import BackButton from '@/components/common/BackBtn';
import BackButtonTerms from '@/components/common/BackBtnTerms';

const { serverRuntimeConfig } = getConfig();

const TerminosYCondiciones = ({ paragraphs }) => {
  const { isFallback, back } = useRouter()


  if (isFallback) {
    return <div> Página cargando .... </div>
  }

  return (
    <>
      <section className="terms-conditions">
        <div className="container">
          <div className='title_container'>
            <BackButtonTerms
              onClick={() => back()}
            />
            <h1 className="terms-conditions__title">TÉRMINOS Y CONDICIONES</h1>
          </div>
          <ol className="terms-conditions__content">
            {
              paragraphs.map((paragraph, index) => (
                <li key={index.id}>{paragraph.text}</li>
              ))
            }
          </ol>
        </div>
      </section>

      <style jsx>{/*css*/`

        .terms-conditions {
          // margin-top: 20px;
          margin-bottom: 140px;
        }

        .title_container {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .terms-conditions__title {
          color: var(--fourth-color);
          font-weight: 700;
          font-size: 18px;
          text-transform: uppercase;
          // margin-top: 1rem;
        }

        .terms-conditions__content {
          padding: 0 0 0 1.8rem;
        }

        .terms-conditions__content li {
          color: var(--fourth-color);
          font-size: 14px;
          font-weight: 400;
          margin-bottom: 6px;
        }

        @media screen and (min-width: 576px) {
          .terms-conditions {
            // margin-top: 100px;
            margin-bottom: 250px;
          }
        }

        @media screen and (min-width: 768px) {
          .terms-conditions__title {
            font-size: 24px;
          }

          .terms-conditions__content li {
            font-size: 18px;
          }

          .container {
            margin-top: 1.5rem
          }
        }

        @media screen and (min-width: 1200px) {
          .title_container {
            margin-top: 4rem;
            margin-bottom: 2.5rem;
          }
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.URI_API}/api-cieneguilla-service/terms`)
  const data = await response.json()

  return {
    props: {
      paragraphs: data.terms,
    },
  }
}

export default TerminosYCondiciones;
