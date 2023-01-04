import { useEffect, useState } from 'react'
import LoginTwitchButton from '../../components/LoginTwitchButton'
import { Code, Container, Group, Space, useMantineTheme } from '@mantine/core'
import { Prism } from '@mantine/prism'

export default function Login() {
  return (
    <Container style={{ padding: 0, margin: '2rem' }}>
      <LoginTwitchButton />
    </Container>
  )
}
