import React from 'react'
import Link from 'next/link'

const FooterBrand = (props) => {
  const { to = '/' } = props

  return (
    <>
      <figure className="brand">
        <Link href={to}>
          <a className="brand__link">
            <img src="/images/logo-white.webp" className="logo" />
          </a>
        </Link>
      </figure>

      <style jsx>{
        /* css */ `
          .brand {
          }

          .logo {
            width: 106px;
            height: 113px;
          }

          @media screen and (min-width: 720px) {
            .logo {
              width: 131px;
              height: 141px;
            }
          }

          @media screen and (min-width: 960px) {
            .logo {
              width: 181px;
              height: 191px;
            }
          }
        `
      }</style>
    </>
  )
}

export default FooterBrand
