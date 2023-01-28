import useFetch from "../customHooks/useFetch"

const User = ()=>{

    const url = "http://localhost:8081/lod/admin/users"

    //console.log(useFetch(url))

    const [userList, setUserList] = useFetch(url)

    const testSetUserList = ()=>{
        console.log("inside test function")
        setUserList(userList.slice(0, userList.length-1))
    }

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
                    {userList.map((user, index)=>{
                        return <tr key = {index}>
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
            <button onClick={testSetUserList}>Remove Last Element</button>
        </>
    )
}

export default User