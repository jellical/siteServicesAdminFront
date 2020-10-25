import React from 'react'
import clsx from 'clsx'
import {
    Box,
    Container,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        paddingTop: 200,
        paddingBottom: 200,
        [theme.breakpoints.down('md')]: {
            paddingTop: 60,
            paddingBottom: 60
        }
    },
    technologyIcon: {
        height: 40,
        margin: theme.spacing(1)
    },
    image: {
        perspectiveOrigin: 'left center',
        transformStyle: 'preserve-3d',
        perspective: 1500,
        '& > img': {
            maxWidth: '90%',
            height: 'auto',
            transform: 'rotateY(-35deg) rotateX(15deg)',
            backfaceVisibility: 'hidden',
            boxShadow: theme.shadows[16]
        }
    },
    shape: {
        position: 'absolute',
        top: 0,
        left: 0,
        '& > img': {
            maxWidth: '90%',
            height: 'auto'
        }
    }
}));

const Hero = ({ className, ...rest }:{className?:string}) => {
    const classes = useStyles();

    return (
        <div
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                        md={5}
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            height="100%"
                        >
                            <Typography
                                variant="h1"
                                color="textPrimary"
                            >
                                Site Services
                            </Typography>
                            <Box mt={3}>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    Bunch of site-helpers
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={7}
                    >
                        <Box position="relative">

                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};


export default Hero
