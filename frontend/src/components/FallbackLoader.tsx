import { Loader } from '@mantine/core'
import { css } from '@emotion/react'

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
