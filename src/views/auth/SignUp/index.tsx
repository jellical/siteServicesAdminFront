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
import Page from '../../../components/Page'
import SignUp from './SignUp'

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

const SignUpView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title='Register'
    >
      <Container
        className={classes.cardContainer}
        maxWidth='sm'
      >
        <Box
          mb={8}
          display='flex'
          justifyContent='center'
        >
        </Box>
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
                  Register
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                >
                  Register below to continue
                </Typography>
              </div>
            </Box>
            <Box
              flexGrow={1}
              mt={3}
            >
              <SignUp />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to='/signin'
              variant='body2'
              color='textSecondary'
            >
              Already registered?
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}

export default SignUpView
