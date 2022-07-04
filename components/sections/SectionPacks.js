import React from 'react'
import Section from '@/components/Section/Section'
import CarouselOfertas from '@/components/Carousel/CarouselOfertas'

const SectionNewPacks = props => {
  const {
    packs
  } = props

  return (
    <>
      <Section
        title="Ofertas de paquetes turísticos"
        titleMarginBottom={{
          xs: 47,
          md: 56
        }}
        padding={{
          xs: '50px 0 40px 0',
          md: '88px 0 66px 0'
        }}
      >
        <CarouselOfertas items={packs} />
      </Section>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default SectionNewPacks
