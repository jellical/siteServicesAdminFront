import React, {useContext} from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core'
import AuthContext from '../../../contexts/AuthContext'

const useStyles = makeStyles(() => ({
  root: {}
}));

const SignUp = ({ className, ...rest }:{className?:string}) => {
  const classes = useStyles()
  const { register } = useContext(AuthContext)

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        firstName:'',
        lastName:'',
        policy: false,
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().min(7).max(255).required('Password is required'),
        firstName: Yup.string().max(255).required('First Name is required'),
        lastName: Yup.string().max(255).required('Last Name is required'),
        policy: Yup.boolean().oneOf([true], 'This field must be checked')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await register(values.email, values.password, values.firstName, values.lastName)

            setStatus({ success: true })
            setSubmitting(false)
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
        <form
          noValidate
          className={`${classes.root} className`}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={ Boolean(touched.firstName && errors.firstName) }
            fullWidth
            helperText={ touched.firstName && errors.firstName }
            label='First Name'
            margin='normal'
            name='firstName'
            onBlur={ handleBlur }
            onChange={ handleChange }
            type='firstName'
            value={ values.firstName }
            variant='outlined'
          />
          <TextField
            error={ Boolean(touched.lastName && errors.lastName) }
            fullWidth
            helperText={ touched.lastName && errors.lastName }
            label='Last Name'
            margin='normal'
            name='lastName'
            onBlur={ handleBlur }
            onChange={ handleChange }
            type='lastName'
            value={ values.lastName }
            variant='outlined'
          />
          <TextField
            error={ Boolean(touched.email && errors.email) }
            fullWidth
            helperText={ touched.email && errors.email }
            label='Email Address'
            margin='normal'
            name='email'
            onBlur={ handleBlur }
            onChange={ handleChange }
            type='email'
            value={ values.email }
            variant='outlined'
          />
          <TextField
            error={ Boolean(touched.password && errors.password) }
            fullWidth
            helperText={ touched.password && errors.password }
            label='Password'
            margin='normal'
            name='password'
            onBlur={ handleBlur }
            onChange={ handleChange }
            type='password'
            value={ values.password }
            variant='outlined'
          />
          <Box
            alignItems='center'
            display='flex'
            mt={2}
            ml={-1}
          >
            <Checkbox
              checked={values.policy}
              name='policy'
              onChange={handleChange}
            />
            <Typography
              variant='body2'
              color='textSecondary'
            >
              I have read the
              {' '}
              <Link
                component="a"
                href="#"
                color="secondary"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          { Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>
              {errors.policy}
            </FormHelperText>
          ) }
          { errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                { errors.submit }
              </FormHelperText>
            </Box>
          ) }
          <Box mt={2}>
            <Button
              color='secondary'
              disabled={isSubmitting}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
            >
              Register
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default SignUp
