// import 'regenerator-runtime/runtime'
import { MantineProvider, ColorSchemeProvider, ColorScheme, Image, Skeleton, Loader } from '@mantine/core'
import ProtectedRoute from 'src/components/ProtectedRoute'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from 'src/components/Layout'
import { ErrorPage } from 'src/components/ErrorPage/ErrorPage'
import { useQuery, useQueryClient, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryCache } from '@tanstack/react-query'
import { useUISlice } from 'src/slices/ui'
import { useTwitchUser } from 'src/queries/twitch'
import { NotificationsProvider } from '@mantine/notifications'
import { css } from '@emotion/react'
import FallbackLoader from 'src/components/FallbackLoader'
import axios from 'axios'
import { requestInterceptor, responseInterceptor, updateTimestamps } from 'src/queries/interceptors'
import { get, set, del } from 'idb-keyval'
import type { PersistedClient, Persister } from '@tanstack/react-query-persist-client'
import { ModalsProvider } from '@mantine/modals'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5, // 5 min
      // cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      keepPreviousData: true,
    },
    mutations: {
      cacheTime: 1000 * 60 * 5, // 5 minutes
    },
  },
  // queryCache,
})

// axios.interceptors.request.use(requestInterceptor, function (error) {
//   return Promise.reject(error)
// })
axios.interceptors.response.use(responseInterceptor, function (error) {
  return Promise.reject(error)
})

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
function createIDBPersister(idbValidKey: IDBValidKey = 'reactQuery') {
  return {
    persistClient: async (client: PersistedClient) => {
      set(idbValidKey, client)
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey)
    },
    removeClient: async () => {
      await del(idbValidKey)
    },
  } as Persister
}

export const persister = createIDBPersister()

const Home = React.lazy(() => import('./views/Home/Home'))
const Login = React.lazy(() => import('./views/Login/Login'))

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  )
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    localStorage.setItem('theme', colorScheme)
  }, [colorScheme])

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
            fontFamily: 'Catamaran, Arial, sans-serif',
          }}
        >
          <ModalsProvider
            labels={{ confirm: 'Submit', cancel: 'Cancel' }}
            modalProps={{ styles: { root: { marginTop: '100px', zIndex: 20000 } } }}
          >
            <NotificationsProvider>
              <BrowserRouter basename="">
                <React.Suspense
                  fallback={<div style={{ backgroundColor: 'rgb(20, 21, 25)', height: '100vh', width: '100vw' }} />}
                >
                  <Layout>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <React.Suspense fallback={<FallbackLoader />}>
                            <Home />
                          </React.Suspense>
                        }
                      />
                      <Route
                        path="/login"
                        element={
                          <React.Suspense fallback={<FallbackLoader />}>
                            <Login />
                          </React.Suspense>
                        }
                      />
                      <Route
                        path="/posts/upload"
                        element={
                          <React.Suspense fallback={<FallbackLoader />}>
                            <ProtectedRoute>
                              {/* TODO
                            - reject url is not isURL
                            - show free services to upload if its not a link
                            - this should really be a modal on Home, not a dedicated route
                            */}
                              <div>Upload post</div>
                            </ProtectedRoute>
                          </React.Suspense>
                        }
                      />
                      <Route
                        path="/analytics"
                        element={
                          <React.Suspense fallback={<FallbackLoader />}>
                            <ProtectedRoute>
                              <div> TODO: - Analytics page with plotly</div>
                            </ProtectedRoute>
                          </React.Suspense>
                        }
                      />
                      <Route
                        path="*"
                        element={
                          <React.Suspense fallback={<FallbackLoader />}>
                            <ErrorPage status={404} />
                          </React.Suspense>
                        }
                      />
                    </Routes>
                  </Layout>
                </React.Suspense>
              </BrowserRouter>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
      {!import.meta.env.PROD && <ReactQueryDevtools initialIsOpen />}
    </PersistQueryClientProvider>
  )
}
