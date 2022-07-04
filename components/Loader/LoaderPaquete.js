import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderPaquete = (props) => (
  <ContentLoader
    speed={2}
    width={1400}
    height={500}
    title='Loader paquete turistico'
    viewBox="0 0 600 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="8" y="47" rx="3" ry="3" width="349" height="34" />
    <rect x="372" y="49" rx="3" ry="3" width="36" height="33" />
    <rect x="430" y="52" rx="3" ry="3" width="162" height="33" />
    <rect x="6" y="106" rx="3" ry="3" width="151" height="35" />
    <rect x="163" y="106" rx="3" ry="3" width="131" height="35" />
    <rect x="303" y="106" rx="3" ry="3" width="111" height="33" />
    <rect x="430" y="106" rx="3" ry="3" width="162" height="33" />
    <rect x="5" y="169" rx="3" ry="3" width="296" height="309" />
    <rect x="319" y="172" rx="3" ry="3" width="131" height="105" />
    <rect x="465" y="172" rx="3" ry="3" width="131" height="105" />
    <rect x="319" y="295" rx="3" ry="3" width="131" height="105" />
    <rect x="465" y="295" rx="3" ry="3" width="131" height="105" />
  </ContentLoader>
)

export default LoaderPaquete
