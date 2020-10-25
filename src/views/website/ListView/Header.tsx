import React from 'react'
import {
  Button,
  Grid,
  SvgIcon,
  Typography,
  Dialog
} from '@material-ui/core'
import {
  PlusCircle as PlusCircleIcon
} from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import AddEditWebsiteForm from './AddEditWebsiteForm'
import { openModal, closeModal } from 'src/slices/website'
import { RootState } from 'src/store'

const Header = () => {
  const dispatch = useDispatch()
  const selectedWebSite = useSelector((state: RootState) => state.website.selectedId)
  const isModalOpen = useSelector((state: RootState) => state.website.isModalOpen)

  const handleClickOpen = () => {
    dispatch(openModal())
  }

  const handleModalClose = () => {
    dispatch(closeModal())
  };

  return (
    <Grid
      container
      justify='space-between'
      spacing={3}
    >
      <Grid item>
        <Typography
          variant='h3'
        >
          Added websites
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color='primary'
          variant="contained"
          onClick={ handleClickOpen }
          startIcon={
            <SvgIcon fontSize='small'>
              <PlusCircleIcon />
            </SvgIcon>
          }
        >
          Add WebSite
        </Button>
      </Grid>

      <Dialog
          maxWidth='sm'
          fullWidth
          onClose={ handleModalClose }
          open={ isModalOpen }
      >
          {isModalOpen &&
                    <AddEditWebsiteForm
                        selectedWebSite={ selectedWebSite }
                        onAddComplete={ handleModalClose }
                        onCancel={ handleModalClose }
                        onEditComplete={ handleModalClose }
                    />
          }
      </Dialog>
    </Grid>
  )
}

export default Header
