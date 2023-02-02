import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const Register = () => {
    
    const [address, setAddress] = useState({
        "city":"",
        "state":"",
        "pinCode":"",
        "landMark":"",
        "district":"",
        "locality":""})  

    const [user, setUser] = useState({
        "firstName":"",
        "lastName":"",
        "email":"",
        "password":"",
        "phoneNumber":"",
        "address":address, 
        "cardDetails":[{"cardId":1, "cardNumber": 12324}, {"cardId":3, "cardNumber": 12324}]
    })

    const [pinCodeData, setPinCodeData] = useState([])
    const [pinCodes, setPinCodes] = useState([])
    const [localities, setLocalities] = useState([])
    const [emailValiDate, setEmailValidate] = useState("")
    const [passwordValiDate, setPasswordValidate] = useState("")
    const [pinCodeValiDate, setPinCodeValidate] = useState("")
    const [validateMessage, setValidateMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:4000/data").
        then((res)=>{
            setPinCodeData(res.data); 
            setPinCodes(res.data.map((element)=> {return element.pincode.toString()}))
        }).
        catch((err)=>{console.log(err)})
    }, [])

    useEffect(()=>{
        console.log(address)
        setUser({...user, ["address"]:address})
    },[address])

    const emailValidate = (email)=>{
        if(!email.match(/^([a-z0-9]+)@([a-z]{3,9})\.([a-z]{2,3})$/)){
            setEmailValidate("email is not in a correct format")
        }
        else{
            setEmailValidate("")
        }
    }

    const passwordValidate = (password)=>{
        if(password.length<8){
            setPasswordValidate("password should be greater than 8 characters")
        }
        else{
            setPasswordValidate("")
        }
    }

    const handleChangeAddress = (e) =>{
        //console.log(e.target)
        setAddress({...address, [e.target.name]:e.target.value})
    }

    const handlePincodeChange = (e) =>{
        setAddress({...address, [e.target.name]:e.target.value})
        //console.log(e.target.value)
        const contains = pinCodes.includes(e.target.value)
        //console.log(contains)
        if(contains){
            const add = pinCodeData.filter((ele)=>{return ele.pincode==e.target.value})[0]
            setLocalities(pinCodeData.filter((ele)=>{return ele.pincode==e.target.value}))
            setAddress({...address,["city"]:add.taluk, ["state"]:add.stateName, ["district"]:add.districtName, ["pinCode"]:add.pincode})
            setPinCodeValidate("")
        }
        else{
            setPinCodeValidate("enter a valid Pincode")
        }
    }

    const handleChange = (e)=>{
        //console.log(e.target.name, e.target.value)
        setUser({...user, [e.target.name]:e.target.value})
    }

    const validate = ()=>{
        return emailValiDate+passwordValiDate+pinCodeValiDate!=""
    }

    const handleSubmit = (e) => {
        console.log("inside handleSubmit")
        e.preventDefault()
        console.log(user)

        axios.post("http://localhost:8081/lod/user/signup", user)
        .then((res)=>{console.log(res.data);setSuccessMessage(res.data.status);setErrorMessage("")})
        .catch((err)=>{console.log(err); setErrorMessage(err.request.response); setSuccessMessage("")})
    }

    return (
        <>
           <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={(event)=>{handleChange(event)}} required/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" value={user.email} onChange={(e)=>{emailValidate(e.target.value);handleChange(e)}} className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>PhoneNumber</label>
                    <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={(e)=>{handleChange(e)}} className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type='password' className="form-control" name="password" value={user.password} onChange={(e)=>{passwordValidate(e.target.value);handleChange(e)}} required/>
                </div>
                <div className="form-group">
                    <label>PinCode</label>
                    <input type="text" className="form-control" name="pinCode" value={address.pinCode} onChange={handlePincodeChange} required/>
                </div>
                {pinCodeValiDate==="" && (
                        <div>
                            <label>State</label>
                            <input type="text" value={address.state} className="form-control" disabled/>

                            <label>District</label>
                            <input type="text" value={address.district} className="form-control" disabled/>

                            <label>City</label>
                            <input type="text" value={address.city} className="form-control" disabled/>
                            
                            <label>Locality</label>
                            <select name="locality" onChange={handleChangeAddress} className="form-control">
                                <option value="none" selected disabled hidden>Select a Locality</option>
                                {localities.map((locality, index)=>{
                                    return <option key={index}>{locality.officeName}</option>
                                })}
                            </select>

                        </div>)}
                <div className="form-group">
                    <label>LandMark</label>
                    <input type="text" className="form-control" name="landMark" value={address.landMark} onChange={handleChangeAddress} required/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary" disabled={validate()}/>
                {emailValiDate}
                {passwordValiDate}
                {pinCodeValiDate}
                {errorMessage}
                {successMessage}
                </form>
        </>
    )
}

export default Register