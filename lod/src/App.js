import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './Home/Home';
import User from './Users/User';
import Register from './Register/Register';

function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path='' element={<Layout></Layout>}>
        {/* <Route index element={<Home></Home>}></Route> */}
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/users' element={<User></User>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
