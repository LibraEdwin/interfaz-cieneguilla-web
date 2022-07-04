import React from 'react'
import Link from 'next/link'
import SectionFooter from '@/components/sections/SectionFooter'

const SectionFooterAbout = ({ links }) => {
  return (
    <>
      <SectionFooter
        title="Sobre nosotros"
        padding={{ xs: 1 }}
        align={{ xs: 'center' }}
      >
        <ul className="footer__about--items">
          {links.map((item, key) => (
            <li key={key}>
              <Link href={item.to}>
                <a className="footer__link" href="">
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </SectionFooter>

      <style jsx>{
        /* css */ `
          .footer__about--items {
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 0.5rem;
          }

          .footer__link {
            color: #ffffff;
            font-size: 14px;
            font-weight: 400;
          }

          @media screen and (min-width: 720px) {
            .footer__about--items {
              display: flex;
              flex-direction: column;
              align-items: start;
              row-gap: 0.5rem;
            }
          }
        `
      }</style>
    </>
  )
}

export default SectionFooterAbout
