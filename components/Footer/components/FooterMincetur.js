import React from 'react'
import SectionFooter from '@/components/sections/SectionFooter'

const SectionFooterMincetur = () => {
  return (
    <>
      <SectionFooter
        title="Agencia de turismo autorizada por:"
        align="center"
        padding={{ xs: 1 }}
      >
        <div className="logo__mincetur">
          <img src="/images/MINCETUR.webp" />
        </div>
      </SectionFooter>

      <style jsx>{
        /* css */ `
          .logo__mincetur {
            display: flex;
            justify-content: center;
          }

          .logo__mincetur img {
            width: 206px;
            height: 41px;
          }

          @media screen and (min-width: 720px) {
            .logo__mincetur {
              justify-content: left;
              padding-bottom: 1px;
            }
          }

          @media screen and (min-width: 960px) {
            .logo__mincetur img {
              width: 242px;
              height: 48px;
            }
          }
        `
      }</style>
    </>
  )
}

export default SectionFooterMincetur
