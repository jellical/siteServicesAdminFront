import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core'

import Page from 'src/components/Page'
import SignIn from './SignIn'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  }
}))

const SignInView = () => {
  const classes = useStyles()

  return (
    <Page
      className={classes.root}
      title="Sign In"
    >

      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems='center'
              display='flex'
              justifyContent='space-between'
              mb={3}
            >
              <div>
                <Typography
                  color='textPrimary'
                  gutterBottom
                  variant='h2'
                >
                  Sign In
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                >
                  Sign in below to continue.
                </Typography>
              </div>
            </Box>
            <Box
                mt={3}
            >
              <Divider />
            </Box>
            <Box
              flexGrow={1}
              mt={1}
            >
              <SignIn />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to='/signup'
              variant='body2'
              color='textSecondary'
            >
              Click here for the registration page
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}

export default SignInView
