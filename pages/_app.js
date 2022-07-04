import { LayoutWeb, LayoutAuth, LayoutAdmin } from '../layouts'
import { AppProvider } from '@/context/GlobalContext'

import '../styles/normalize.css'
import '../styles/global.css'
import '../styles/login.css'
import 'flatpickr/dist/flatpickr.min.css'

const layouts = {
  Web: LayoutWeb,
  Auth: LayoutAuth,
  Admin: LayoutAdmin
}

const App = ({ Component, pageProps }) => {
  const Layout = layouts[Component.layout || 'Web'] || ((children) => (<>{children}</>))

  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}

export default App
