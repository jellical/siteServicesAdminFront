import React, {
  useContext,
  useRef,
  useState
} from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import {
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core'
import {useTranslation} from 'react-i18next'
import AuthContext from 'src/contexts/AuthContext'

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}))

const Account = () => {
  const classes = useStyles()
  const history = useHistory()
  const ref = useRef(null)
  const { user, logout } = useContext(AuthContext)
  const { enqueueSnackbar } = useSnackbar()
  const [isOpen, setOpen] = useState(false)
  const {t} = useTranslation()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    try {
      handleClose()
      await logout()
      history.push('/')
    } catch (err) {
      console.error(err)
      enqueueSnackbar(t('Unable to logout'), {
        variant: 'error'
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        ref={ref}
      >
        <Hidden smDown>
          <Typography
            variant="h6"
            color="inherit"
          >
            {`${user!.firstName} ${user!.lastName}`}
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <MenuItem
          component={RouterLink}
          to="/admin/profile"
        >
          {t('Account')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </>
  );
}

export default Account
