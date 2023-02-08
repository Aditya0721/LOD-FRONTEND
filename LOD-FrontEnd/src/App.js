import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home/Home';
import User from './Users/User';
import Register from './Register/Register';
import LogIn from './SignIn/LogIn';
import { Grid } from '@mui/material';
import NavBar from './NavBar/NavBar';
import CustomDialog from './control/Dialog';
import Profile from './Profile/Profile';
import ProtectedComponent from './ProtectedComponent/ProtectedComponent';

function App() {
  return(
  <>
    <BrowserRouter>
      <Grid container
          direction="row"
          justify="center" height="100vh" alignItems="stretch">
          <Grid item xs={12}>
              <NavBar></NavBar>
          </Grid>
          <Grid item container xs={12} border={1} height='100%' justifyContent='center' alignItems='center'>
            <Routes>
              <Route path="/" element={<Layout></Layout>}></Route>
              <Route path="/layout/*" element={<Layout />} />
              {/* <Route to="/users" element={<User></User>}></Route> */}
              <Route path='/register' element={<CustomDialog><Register></Register></CustomDialog>}></Route>
              <Route path='/login' element={<CustomDialog><LogIn></LogIn></CustomDialog>}></Route>
              <Route path='/users' element={<User></User>}></Route>
              <Route path='/profile' element={<ProtectedComponent><Profile></Profile></ProtectedComponent>}></Route>
            </Routes>
          </Grid>
        </Grid>
    </BrowserRouter>
  </>
  
  )
}

export default App;
