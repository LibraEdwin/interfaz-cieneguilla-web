import React from 'react'
import HeaderAdmin from '@/components/Admin/HeaderAdmin'
import Button from '@/components/common/Button'
import FooterAdmin from '@/components/Admin/FooterAdmin'

const buttonsFooter = [
  {
    label: 'Imprimir',
    variant: 'outline',
    width: '139px'
  },
  {
    label: 'Exportar',
    width: '139px'
  }
]

const SeguimientoCompra = () => {
  return (
    <>
      <HeaderAdmin title="Vista detallada de paquete comprado" />
      <div className="search">
        <h5 className="search__label">Paquete consultado</h5>
        <div className="search__grid">
          <div className="search__item">
            <input type="text" />
          </div>
          <div className="search__item">
            <Button variant="outline" label="Buscar paquete"/>
          </div>
        </div>
      </div>
      <FooterAdmin buttons={buttonsFooter}/>
    </>
  )
}

SeguimientoCompra.layout = 'Admin'

export default SeguimientoCompra
