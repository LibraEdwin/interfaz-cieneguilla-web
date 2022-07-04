import React from 'react'
import Section from '@/components/Section/Section'
import CarouselNuevos from '@/components/Carousel/CarouselNuevos'
import PackCard from '@/components/PackCard/PackCard'

const SectionNewPacks = props => {
  const {
    packs
  } = props

  return (
    <>
      <Section
        title="Lo nuevo"
        titleMarginBottom={{
          xs: 47,
          md: 58
        }}
        padding={{
          xs: '22px 0 2px 0',
          md: '57px 0 2px 0'
        }}
      >
        <CarouselNuevos items={packs} delay={15000}/>
      </Section>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default SectionNewPacks
