import React, {
  useState,
  useRef, useContext
} from 'react'
import { capitalCase } from 'change-case'
import {
  Box,
  Button,
  IconButton,
  Popover,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core'
import { Settings as SettingsIcon } from 'react-feather'
import { THEMES } from 'src/constants'

import { useTranslation } from 'react-i18next'
import SettingsContext from 'src/contexts/SettingsContext'

const useStyles = makeStyles((theme) => ({
  popover: {
    width: 320,
    padding: theme.spacing(2)
  }
}));

const Settings = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const ref = useRef(null)
  const { settings, saveSettings } = useContext(SettingsContext)
  const [isOpen, setOpen] = useState(false)
  const [values, setValues] = useState({
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme
  });

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  const handleChange = (field:string, value:string) => {
    setValues({
      ...values,
      [field]: value
    })
  }

  const handleSave = () => {
    saveSettings(values)
    setOpen(false)
  };


  return (
    <>
      <Tooltip title="Settings">
        <IconButton
          color="inherit"
          onClick={handleOpen}
          ref={ref}
        >
          <SvgIcon fontSize="small">
            <SettingsIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Typography
          variant="h4"
          color="textPrimary"
        >
          {t('Theme settings')}
        </Typography>

        <Box mt={2}>
          <TextField
            fullWidth
            label={t('Theme')}
            name="theme"
            onChange={(event) => handleChange('theme', event.target.value)}
            select
            SelectProps={{ native: true }}
            value={values.theme}
            variant="outlined"
          >
            {Object.keys(THEMES).map((theme) => (
              <option
                key={theme}
                value={theme}
              >
                {capitalCase(theme)}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSave}
          >
            {t('Save Settings')}
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default Settings
