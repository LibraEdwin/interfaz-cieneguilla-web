import React from 'react'
import Image from 'next/image'
import Section from '@/components/Section/Section'

const SectionPaymentMethods = () => {
  return (
    <>
      <Section
        title="Formas de pago"
        align={{ xs: 'center' }}
        bg="#EFEFEF"
        titleMarginBottom={{
          xs: 14,
          md: 40
        }}
        padding={{
          xs: '38px 0 58px 0',
          md: '48px 0 60px 0'
        }}
      >
        <h3 className="text">
          Aceptamos todas la tarjetas de débito y crédito
        </h3>
        <div className="payment__cards">
          <Image src="/images/visa.png" width={118} height={66} />
          <Image src="/images/mastercard.png" width={118} height={66} />
          <Image src="/images/amexpr.png" width={67} height={67} />
        </div>
      </Section>

      <style jsx>{
        /* css */ `
          .text {
            font-size: 14px;
            text-align: center;
            font-weight: 500;
            display: block;
          }

          .payment__cards {
            display: flex;
            justify-content: center;
            column-gap: 3rem;
            margin: 2.5rem auto 0;
            width: 90%;
          }

          @media screen and (min-width: 760px) {
            .text {
              font-size: 18px;
              margin-top: 2.5rem;
            }
          }

          @media screen and (min-width: 1400px) {
            .payment__cards {
              margin-bottom: 1rem;
            }
          }
        `
      }</style>
    </>
  )
}

export default SectionPaymentMethods
