import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderOtrosDatos = (props) => (
  <ContentLoader
    speed={2}
    width={1600}
    height={600}
    viewBox="0 0 1000 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="25" y="14" rx="3" ry="3" width="260" height="27" />
    <rect x="25" y="53" rx="3" ry="3" width="700" height="28" />
    <rect x="25" y="184" rx="3" ry="3" width="700" height="28" />
    <rect x="25" y="92" rx="3" ry="3" width="700" height="26" />
    <rect x="25" y="140" rx="3" ry="3" width="260" height="31" />
    <rect x="25" y="220" rx="3" ry="3" width="700" height="27" />
    <rect x="25" y="272" rx="3" ry="3" width="260" height="27" />
    <rect x="25" y="310" rx="3" ry="3" width="700" height="28" />
    <rect x="25" y="346" rx="3" ry="3" width="700" height="28" />
    <rect x="25" y="397" rx="3" ry="3" width="260" height="27" />
    <rect x="25" y="432" rx="3" ry="3" width="700" height="26" />
    <rect x="26" y="466" rx="3" ry="3" width="700" height="28" />
  </ContentLoader>
)

export default LoaderOtrosDatos
