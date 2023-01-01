import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core'
import { Navigate, useNavigate } from 'react-router-dom'
import { useStyles } from 'src/components/ErrorPage/ErrorPage.styles'

interface ErrorPageProps {
  status: number
}

export function ErrorPage({ status }: ErrorPageProps) {
  const { classes } = useStyles()
  const navigate = useNavigate()

  let text = 'An unknown error ocurred.'
  switch (status) {
    case 404:
      text = 'You may have mistyped the address, or the page has been moved to another URL.'
      break
    case 403:
      text = "You don't have the required permissions to access this content."
      break
    case 401:
      text = 'You need to log in before accessing this content.'
    default:
      break
  }
  return (
    <Container className={classes.root}>
      <div className={classes.label}>{status}</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        {text}
      </Text>
      <Group position="center">
        <Button
          size="md"
          onClick={() => {
            navigate('/')
          }}
        >
          Take me back to the home page
        </Button>
      </Group>
    </Container>
  )
}
