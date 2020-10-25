import React from 'react'
import clsx from 'clsx'

import { Link as RouterLink } from 'react-router-dom'

import Logo from '../../../components/Logo'
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  SvgIcon
} from '@material-ui/core'
import { Menu as MenuIcon } from 'react-feather'
import { THEMES } from '../../../constants'
import Account from './Account'
import Settings from './Settings'

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...theme.name === THEMES.DEFAULT ? {
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main
    } : {},
    ...theme.name === THEMES.DARK ? {
      backgroundColor: theme.palette.background.default
    } : {}
  },
  toolbar: {
    minHeight: 64
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}:{
  className?:string,
  onMobileNavOpen:any
}) => {
  const classes = useStyles();
  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <Settings />
        <Box ml={2}>
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
