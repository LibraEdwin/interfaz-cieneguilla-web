import React from 'react'
import Section from '@/components/Section/Section'
import Button from '@/components/common/Button'

const SectionQuestions = () => {
  return (
    <>
      <Section
        title="¿Tienes alguna pregunta?"
        align={{ xs: 'center' }}
        titleMarginBottom={{
          xs: 35,
          md: 50
        }}
        padding={{
          xs: '75px 0 95px 0',
          md: '141px 0 176px 0'
        }}
      >
        <div className="answers">
          <Button
            label="La respondemos aquí"
            width={{ xs: 281, md: 458 }}
            height={64}
            to="/preguntas-frecuentes"
          />
        </div>
      </Section>

      <style jsx>{/* css */`
        .answers {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }
      `}</style>
    </>
  )
}

export default SectionQuestions
