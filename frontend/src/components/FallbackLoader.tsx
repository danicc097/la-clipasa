import { useEffect, useState } from 'react'

import { Code, Image, Loader } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Header from 'src/components/Header'
import { css } from '@emotion/react'
import { useQueryClient } from '@tanstack/react-query'
import { useUISlice } from 'src/slices/ui'
import Footer from 'src/components/Footer'

export default function FallbackLoader() {
  return (
    <div
      css={css`
        margin-top: 100px;
        padding-bottom: 100%;
        min-height: 100%;
        /* overflow: 'hidden',
          position: 'absolute',
          msFlex: 'none',
          flex: 'none',
          width: '100vw', */
      `}
    >
      <Loader size={'xl'} variant="bars"></Loader>
    </div>
  )
}
