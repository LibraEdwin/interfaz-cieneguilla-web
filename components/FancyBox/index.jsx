import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Fancybox as NativeFancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css'

const FancyBox = ({ children, delegate = '[data-fancybox]', options = {} }) => {
  useEffect(() => {
    NativeFancybox.bind(delegate, options)

    return () => {
      NativeFancybox.destroy()
    }
  }, [])

  return <>{children}</>
}

FancyBox.propTypes = {
  children: PropTypes.node.isRequired,
  delegate: PropTypes.string,
  options: PropTypes.object
}

export default FancyBox