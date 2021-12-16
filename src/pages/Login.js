import React from 'react'
import { useState, useContext }  from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = (props) => {
  // WILL - This is the useContext syntax added
  // User info will be sved to userState so we know which page should show what
    const theme = createTheme();
    const { userState } = useContext(UserContext)
    const [ user, setUser ] = userState
    const [ email, setEmail] = useState('')
    const [ password, setPassword] = useState('')
    
    const submitForm = async (e) => {
      try {
        e.preventDefault()
        // Pulls user from backend
        const response = await axios.post(`${env.BACKEND_URL}/user/login`, { email, password })
  
        // Sets user through useContext
        await setUser(response.data.user)

        // Set userId into localStorage
        await localStorage.setItem('userId', response.data.user.id)
      } catch (error) {
        console.log('Error:', error.message)
      }
    }

    return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="setEmail"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="setPassword"
              autoComplete="current-password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login