import { useEffect, useState } from "react"
import axios from "axios";
const Home = ()=>{
    const [userList, setUserList] = useState([])

    useEffect(()=>{
            axios.get("http://localhost:8081/lod/admin/users").
            then((res)=>{
                setUserList(res.data.result)
                console.log(res.data, res.data.result)
            })
            .catch((err)=>{console.log(err)})
        },[])

    return (
        <>  
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
                    {userList.map((user)=>{
                        return <tr key={user.userId}>
                                    <td>{user._id}</td>
                                    <td>{user.address.landMark+","+user.address.city+","+user.address.state}</td>
                                    <td>{user.userId}</td>
                                    <td>{user.firstName+user.lastName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.email}</td>
                                </tr>
                    })}
                </tbody>
               
            </table>
            
        </>
    )
}

export default Home