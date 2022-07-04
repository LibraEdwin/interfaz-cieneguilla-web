import React from 'react'
import SectionHero from '@/components/sections/SectionHero'
import SectionPacks from '@/components/sections/SectionPacks'
import SectionNewPacks from '@/components/sections/SectionNewPacks'
import SectionQuestions from '@/components/sections/SectionQuestions'
import SectionPopularPacks from '@/components/sections/SectionPopularPacks'
import SectionPaymentMethods from '@/components/sections/SectionPaymentMethods'
import { useGlobalContext } from '@/context/GlobalContext'

const Index = () => {
  const { ofertas, nuevos, populares } = useGlobalContext()
  return (
    <>
      <SectionHero />
      <SectionPacks packs={ofertas} />
      <SectionPopularPacks packs={populares} />
      <SectionNewPacks packs={nuevos} />
      <SectionQuestions />
      <SectionPaymentMethods />
    </>
  )
}

export default Index
