import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Typography,
  Breadcrumbs,
  Link
} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

const Header = () => {
  return (
    <div
    >
      <Breadcrumbs
        separator={
          <NavigateNextIcon fontSize='small' />
        }
      >
        <Link
            color='inherit'
            to="/admin"
            component={RouterLink}
        >
          Dashboard
        </Link>
        <Typography>
          Profile
        </Typography>
      </Breadcrumbs>
    </div>
  )
}

export default Header
