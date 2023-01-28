import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

const Register = () => {
    
    const [address, setAddress] = useState({
        "city":"",
        "state":"",
        "pinCode":"",
        "landMark":"",
        "district":""})  

    const [user, setUser] = useState({
        "firstName":"aditya",
        "lastName":"",
        "email":"",
        "password":"",
        "address":address, 
        "card":[{"cardId":1, "cardNumber": 12324}, {"cardId":3, "cardNumber": 12324}]
    })

    const handleChangeAddress = (e) =>{
        setAddress({...address, [e.target.name]:e.target.value})

        setUser({...user, ["address"]:address})
    }
    const handleChange = (e)=>{
        //console.log(e.target.name, e.target.value)
        setUser({...user, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        console.log("inside handleSubmit")
        e.preventDefault()
        console.log(user)
    }
    return (
        <>
           <form>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type='password' className="form-control" name="password" value={user.password} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label>PinCode</label>
                    <input type="text" className="form-control" name="pinCode" value={address.pinCode} onChange={handleChangeAddress}/>
                </div>
                <div className="form-group">
                    <label>LandMark</label>
                    <input type="text" className="form-control" name="landMark" value={address.landMark} onChange={handleChangeAddress}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                {user.firstName}
                </form>
        </>
    )
}

export default Register