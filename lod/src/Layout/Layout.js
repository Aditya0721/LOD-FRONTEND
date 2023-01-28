import { Link, Outlet } from "react-router-dom"

const Layout = () => {
    return(<>
     <nav>
        <ul>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/users">UserList</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </ul>
    </nav>
    <Outlet></Outlet>
    </>)
   
}

export default Layout