import React, {useCallback, useEffect, useState} from 'react'
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core'
import { useDispatch } from 'react-redux'

import Page from '../../../components/Page'
import Header from './Header'
import General from './General'

import {fetchCurrentUser} from 'src/slices/user'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))

const AccountView = () => {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState('general');

  const dispatch = useDispatch()

  const getCurrentUser = useCallback(async () => {
    try {

      dispatch(fetchCurrentUser())

    } catch (err) {
      console.error(err)
    }
  }, [dispatch])

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])


  const tabs = [
    { value: 'general', label: 'General' }
  ]

  const handleTabsChange = (event:any, value:string) => {
    setCurrentTab(value)
  }

  return (
    <Page
      className={classes.root}
      title='Settings'
    >
      <Container maxWidth='lg'>
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons='auto'
            value={currentTab}
            variant='scrollable'
            textColor='secondary'
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'general' && <General />}
        </Box>
      </Container>
    </Page>
  );
};

export default AccountView
