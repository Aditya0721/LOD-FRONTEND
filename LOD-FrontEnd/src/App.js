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
import OnlyAdmin from './ProtectedComponent/OnlyAdmin';
import ShowShops from './shops/ShowShops';
import ShopRequests from './admin/ShopRequests';
import LiquorStoreIcon from './Icon/LiquorStoreIcon';
import Menu from './Menu/Menu';
import './App.css'
import OnlyShopKeeper from './ProtectedComponent/OnlyShopKeeper';
import MyShop from './shopOwner/MyShop';
import EditMenu from './shopOwner/EditMenu';
import jwtDecode from 'jwt-decode';
import { authActions } from './store/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cart from './Menu/Cart';
import Order from './Menu/Order';

function App() {

  const dispatch = useDispatch()
  useEffect(()=>{console.log(localStorage.getItem("token"))
    if(localStorage.getItem("token")!==null){
        const decoded = jwtDecode(localStorage.getItem("token"), 'SECRET SALT')
        const user = decoded._doc
        user.token = localStorage.getItem("token")
        console.log(user)
        dispatch(authActions.setUser(user))
        dispatch(authActions.logIn())
    }},[])

  return(
  <>
    <BrowserRouter>
      <Grid container
          direction="row"
          justify="center" height="100vh" alignItems="stretch">
          <Grid item xs={12}>
              <NavBar></NavBar>
          </Grid>
          <Grid item container xs={12} height='100%' display='flex' justifyContent="center">
            <Routes>
              <Route path="/*" element={<Layout></Layout>}></Route>
              <Route path="/layout/*" element={<Layout />} />
              {/* <Route to="/users" element={<User></User>}></Route> */}
              <Route path="/shops" element={<ShowShops></ShowShops>}></Route>
              <Route path="/shops/:userId" element={<OnlyShopKeeper><MyShop></MyShop></OnlyShopKeeper>}></Route>
              <Route path='/editMenu/:shopId' element={<OnlyShopKeeper><EditMenu></EditMenu></OnlyShopKeeper>}></Route>
              <Route path='/users' element={<OnlyAdmin><User></User></OnlyAdmin>}></Route>
              <Route path='/profile' element={<ProtectedComponent><Profile></Profile></ProtectedComponent>}></Route>
              <Route path='/shopRequests' element={<OnlyAdmin><ShopRequests></ShopRequests></OnlyAdmin>}></Route>
              <Route path='/menu/:shopId' element={<Menu></Menu>}></Route>
              <Route path='/cart' element={<Cart></Cart>}></Route>
              <Route path='/order' element={<ProtectedComponent><Order></Order></ProtectedComponent>}></Route>
            </Routes>
          </Grid>
        </Grid>
    </BrowserRouter>
  </>
  
  )
}

export default App;