import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
// import 'regenerator-runtime/runtime'
import ProtectedRoute from 'src/components/ProtectedRoute'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from 'src/components/Layout'
import { ErrorPage } from 'src/components/ErrorPage/ErrorPage'

import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

const Home = React.lazy(() => import('./views/Home/Home'))

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    const newTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
    toggleColorScheme(newTheme)
  }, [])

  useEffect(() => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
  }, [colorScheme])

  useEffect(() => {
    // TODO if not user/isAuthneticated -> fetch twitch user using ui slice twitchToken (only on startup)
  }, [])

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            shadows: {
              md: '1px 1px 3px rgba(0, 0, 0, .25)',
              xl: '5px 5px 3px rgba(0, 0, 0, .25)',
            },
          }}
        >
          <BrowserRouter basename="">
            <React.Suspense
              fallback={<div style={{ backgroundColor: 'rgb(20, 21, 25)', height: '100vh', width: '100vw' }} />}
            >
              <Layout>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <React.Suspense fallback={<div />}>
                        <ProtectedRoute>
                          <Home />
                        </ProtectedRoute>
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/upload"
                    element={
                      <React.Suspense fallback={<div />}>
                        <ProtectedRoute>
                          <div>Upload to discord page</div>
                        </ProtectedRoute>
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <React.Suspense fallback={<div />}>
                        <ProtectedRoute>
                          <div>Analytics page</div>
                        </ProtectedRoute>
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <React.Suspense fallback={<div />}>
                        <ProtectedRoute>
                          <div>Analytics page</div>
                        </ProtectedRoute>
                      </React.Suspense>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <React.Suspense fallback={<div />}>
                        <ErrorPage status={404} />
                      </React.Suspense>
                    }
                  />
                </Routes>
              </Layout>
            </React.Suspense>
          </BrowserRouter>
        </MantineProvider>
      </ColorSchemeProvider>
      <ReactQueryDevtools initialIsOpen />
    </PersistQueryClientProvider>
  )
}
