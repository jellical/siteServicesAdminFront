import React from 'react';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  toolbar: {
    height: 64
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

const TopBar = ({ className }:{className?:string}) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
    >
      <Toolbar className={classes.toolbar}>
        <Box flexGrow={1} />
        <Divider className={classes.divider} />
        <Button
          color="secondary"
          component="a"
          href="/signin"
          variant="contained"
          size="small"
        >
          SignIn
        </Button>
      </Toolbar>
    </AppBar>
  );
};


export default TopBar;
