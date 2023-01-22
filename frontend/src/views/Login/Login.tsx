import LoginTwitchButton from '../../components/LoginTwitchButton'
import { Container } from '@mantine/core'

export default function Login() {
  return (
    <Container style={{ padding: 0, margin: '2rem' }}>
      <LoginTwitchButton />
    </Container>
  )
}
