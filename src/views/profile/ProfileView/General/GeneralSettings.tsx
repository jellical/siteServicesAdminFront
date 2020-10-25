import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField
} from '@material-ui/core'

import { User } from 'src/types/User'
import { updateSelf } from 'src/slices/user'

const GeneralSettings = ({ user }:{ user?:User }) => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  return (
    <Formik
      enableReinitialize
      initialValues={{
        email: user?.email || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        firstName: Yup.string().max(255).required('First Name is required'),
        lastName: Yup.string().max(255)
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {

        try {

          const valuesToSend = {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName
          }

          await dispatch(updateSelf(valuesToSend))
          resetForm()
          setStatus({ success: true })
          setSubmitting(false)
          enqueueSnackbar('Profile updated', {
            variant: 'success'
          })
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
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader title='Profile' />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={ Boolean(touched.firstName && errors.firstName) }
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label='First Name'
                    name='firstName'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    variant='outlined'
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={ Boolean(touched.lastName && errors.lastName) }
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label='Last Name'
                    name='lastName'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    variant='outlined'
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={ Boolean(touched.email && errors.email) }
                    fullWidth
                    helperText={ touched.email && errors.email }
                    label='Email Address'
                    name='email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type='email'
                    value={values.email}
                    variant='outlined'
                  />
                </Grid>

              </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              p={2}
              display='flex'
              justifyContent='flex-end'
            >
              <Button
                color='secondary'
                disabled={isSubmitting}
                type='submit'
                variant='contained'
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  )
}

export default GeneralSettings
