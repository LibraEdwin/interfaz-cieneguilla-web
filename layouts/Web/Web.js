import React from 'react'
import { Header, Footer } from '@/components'
import ButtonWhatsapp from '@/components/common/ButtonWhatsapp'

const Web = ({ children }) => {
  return (
    <div className="layout-web">
      <Header />
      <main className="page">
        {children}
      </main>
      <Footer />
      <ButtonWhatsapp />
    </div>
  )
}

export default Web
