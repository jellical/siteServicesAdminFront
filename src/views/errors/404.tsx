import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
    Box,
    Button,
    Container,
    Typography,
    useTheme,
    useMediaQuery,
    makeStyles
} from '@material-ui/core'
import Page from '../../components/Page'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(3),
        paddingTop: 80,
        paddingBottom: 80
    },
    image: {
        maxWidth: '100%',
        width: 560,
        maxHeight: 300,
        height: 'auto'
    }
}))

const Error404 = () => {
    const classes = useStyles()
    const theme = useTheme()
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Page
            className={classes.root}
            title="Not found"
        >
            <Container maxWidth="lg">
                <Typography
                    align="center"
                    variant={mobileDevice ? 'h4' : 'h1'}
                    color="textPrimary"
                >
                    404: The page you are looking for isn’t here
                </Typography>
                <Box
                    mt={6}
                    display="flex"
                    justifyContent="center"
                >
                    <Button
                        color="secondary"
                        component={RouterLink}
                        to="/"
                        variant="outlined"
                    >
                        Back to home
                    </Button>
                </Box>
            </Container>
        </Page>
    )
}

export default Error404
