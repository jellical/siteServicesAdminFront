import React, {useCallback, useEffect} from 'react'
import _ from 'lodash'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  makeStyles
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'


import { createWebSite, updateWebSite, fetchWebSite } from 'src/slices/website'
import { WebSite } from 'src/types/WebSite'
import { RootState } from '../../../store'

const getInitialValues = (website?: WebSite) => {
  if (website) {
    return _.merge({}, {
      url: '',
      title: '',
      submit: null
    }, website);
  }

  return {
    url: '',
    title: '',
    submit: null
  }
}

const useStyles = makeStyles((theme) => ({
  root: {},
  confirmButton: {
    marginLeft: theme.spacing(2)
  }
}))

interface AddEditWebsiteFormProps {
  selectedWebSite?: string,
  onAddComplete: () => void,
  onCancel: () => void,
  onEditComplete: () => void
}

const AddEditWebsiteForm: React.FC<AddEditWebsiteFormProps> = ({
  selectedWebSite,
  onAddComplete,
  onCancel,
  onEditComplete
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const website = useSelector((state: RootState) => state.website.current )

  const getWebsite = useCallback(() => {
    if (selectedWebSite) {
      dispatch(fetchWebSite(selectedWebSite))
    }
  },[dispatch,selectedWebSite])

  useEffect(()=>{
    getWebsite()
  }, [getWebsite])

  const isCreating = !selectedWebSite

  return (
    <Formik
      initialValues={getInitialValues(website)}
      validationSchema={Yup.object().shape({
        url: Yup.string().max(5000).required('URL is required'),
        title: Yup.string().max(255).required('Title is required')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          const data:WebSite = {
            title: values.title,
            url: values.url
          };

          if (website != null && website.id != null) {
            await dispatch(updateWebSite(website.id, data))
          } else {
            await dispatch(createWebSite(data));
          }

          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Website updated', {
            variant: 'success'
          });

          if (isCreating) {
            onAddComplete()
          } else {
            onEditComplete()
          }
        } catch (err) {
          console.error(err)
          setStatus({ success: false })
          setErrors({ submit: err.message })
          setSubmitting(false)
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldTouched,
        setFieldValue,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Typography
              align="center"
              gutterBottom
              variant="h3"
              color="textPrimary"
            >
              {isCreating ? 'Add website' : 'Edit website'}
            </Typography>
          </Box>
          <Box p={3}>
            <TextField
              error={Boolean(touched.title && errors.title)}
              fullWidth
              helperText={touched.title && errors.title}
              label="Title"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              variant="outlined"
            />
            <Box mt={2}>
              <TextField
                  error={Boolean(touched.url && errors.url)}
                  fullWidth
                  helperText={touched.url && errors.url}
                  label="Url"
                  name="url"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.url}
                  variant="outlined"
              />
            </Box>
          </Box>
          <Divider />
          <Box
            p={2}
            display="flex"
            alignItems="center"
          >
            <Box flexGrow={1} />
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="secondary"
              className={classes.confirmButton}
            >
              Confirm
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default AddEditWebsiteForm
