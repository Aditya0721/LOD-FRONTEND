import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"


const Profile = ()=>{
    const user = useSelector(state=>state.auth.user)

    return(<>
              <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>address</th>
                        <th>userId</th>
                        <th>name</th>
                        <th>PhoneNumber</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{user._id}</td>
                            <td>{user.address.landMark+","+user.address.city+","+user.address.state}</td>
                            <td>{user.userId}</td>
                            <td>{user.firstName+user.lastName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr> 
                </tbody>
               
            </table>
    </>)
}

export default Profile