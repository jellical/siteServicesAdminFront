import React from 'react'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'

import GeneralSettings from './GeneralSettings'
import { RootState } from 'src/store'
import LoadingScreen from 'src/components/LoadingFallback'



const General = () => {

  const user = useSelector((state: RootState) => state.user.user)

  if (!user) {
    return <LoadingScreen />
  }

  return (
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        xs={12}
      >
        <GeneralSettings user={user} />
      </Grid>
    </Grid>
  )
}

export default General
