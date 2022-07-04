import React from 'react'
import Section from '@/components/Section/Section'
import CarouselPopulares from '@/components/Carousel/CarouselPopulares'

const SectionNewPacks = props => {
  const {
    packs
  } = props

  return (
    <>
      <Section
        title="Los más populares"
        bg="#F2B907"
        titleMarginBottom={{
          xs: 49,
          md: 60
        }}
        padding={{
          xs: '11px 0 27px 0',
          md: '30px 0 39px 0'
        }}
      >
      <CarouselPopulares items={packs}/>
      </Section>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default SectionNewPacks
