import React, { useContext } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Box,
  Button,
  FormHelperText,
  TextField
} from '@material-ui/core'
import AuthContext from '../../../contexts/AuthContext'

const SignIn = () => {
  const { login } = useContext(AuthContext)

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await login(values.email, values.password)
          setStatus({ success: true })
          setSubmitting(false)

        } catch (err) {
          console.error(err)
          console.log(err.response)
          setStatus({ success: false })
          setErrors({ submit: err.response.data.message })
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
        <form
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label='Email Address'
            margin='normal'
            name='email'
            onBlur={handleBlur}
            onChange={handleChange}
            type='email'
            value={values.email}
            variant='outlined'
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label='Password'
            margin='normal'
            name='password'
            onBlur={handleBlur}
            onChange={handleChange}
            type='password'
            value={values.password}
            variant='outlined'
          />
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                { errors.submit }
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color='secondary'
              disabled={ isSubmitting }
              fullWidth
              size='large'
              type='submit'
              variant='contained'
            >
              Log In
            </Button>
          </Box>

        </form>
      )}
    </Formik>
  )
}

export default SignIn
