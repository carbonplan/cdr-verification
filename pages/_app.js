import { ThemeProvider } from 'theme-ui'
import '@carbonplan/components/fonts.css'
import '@carbonplan/components/globals.css'
import theme from '@carbonplan/theme'
import { Layout } from '@carbonplan/components'
import { useState } from 'react'

const App = ({ Component, pageProps }) => {
  const [settings, setSettings] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <Layout
        title='CDR Verification Framework – CarbonPlan'
        description='An interactive tool for understanding CDR verification
      by exploring key uncertainties around carbon removal and
      durability outcomes for different CDR pathways'
        card='https://images.carbonplan.org/social/cdr-verification.png'
        container={false}
        footer={false}
        metadata={false}
        nav={'research'}
        settings={{
          value: settings,
          onClick: () => setSettings((prev) => !prev),
        }}
      >
        <Component
          {...pageProps}
          settings={settings}
          setSettings={setSettings}
        />
      </Layout>
    </ThemeProvider>
  )
}

export default App
