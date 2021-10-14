import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Card } from '../components/Card'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'

function useQuery() {
  const location = useLocation()
  return new URLSearchParams(location.search)
}

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth()

  const query = useQuery()
  console.log(query.get('mode'))
  console.log(query.get('oobCode'))
  console.log(query.get('continueUrl'))

  const [newPassword, setNewPassword] = useState('')
  const toast = useToast()
  const history = useHistory()

  return (
    <Layout>
      <Heading textAlign='center' my={12}>
        Reset password
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async e => {
            e.preventDefault()
            // handle reset password
            resetPassword(query.get('oobCode'), newPassword)
              .then(response => {
                toast({
                  description: 'Password has been changed, you can login now.',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
                console.log(response)
                history.push('/login')
              })
              .catch(error => {
                toast({
                  description: error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
                console.log(error.message)
              })
          }}
        >
          <Stack spacing='6'>
            <FormControl id='password'>
              <FormLabel>New password</FormLabel>
              <Input type='password'onChange={e => setNewPassword(e.target.value)} type='password' autoComplete='password' required />
            </FormControl>
            <Button type='submit' colorScheme='primary' size='lg' fontSize='md'>
              Reset password
            </Button>
          </Stack>
        </chakra.form>
      </Card>
    </Layout>
  )
}
