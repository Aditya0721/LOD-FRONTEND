import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import OtpVerificationComponent from "./OtpVerification"
import { useNavigate } from "react-router-dom"
import FormControl from '@mui/material/FormControl';
import { Button, Grid, InputLabel, MenuItem, Select, TextField, Stack, Typography, Paper} from "@mui/material"
import Input from "../control/input"
import paperStyle from "../config/style"
import { width } from "@mui/system"


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
    const [pinCodeValiDate, setPinCodeValidate] = useState("dont show")
    const [validateMessage, setValidateMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [showOtpComponent, setShowOtpComponent] = useState(false)
    const [otpVerified, setOtpVerified] = useState(false)
    const [otpVerificationMessage, setOtpVerificationMessage] = useState("")

    const navigate = useNavigate()

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

    const checkUserExists = async()=>{
        let flag = false
        await axios.get("http://localhost:8081/lod/user/"+user.phoneNumber).
                    then((res)=>{flag = true}).
                    catch((err)=>{flag = false})
        return flag
    }

    const handleOtpVerification = async()=>{
        if(user.phoneNumber.length===0){
            setOtpVerificationMessage("please enter your number")
        }
        else if(user.phoneNumber.length!=10){
            setOtpVerificationMessage("please enter 10 digit phone number")
        }
        else if(await checkUserExists()){
            setOtpVerificationMessage("number already registerred")
        }
        else{
            setOtpVerificationMessage("")
            setShowOtpComponent(true)
        }
    }
    
    const handleSubmit = async(e) => {
        console.log("inside handleSubmit")
        e.preventDefault()
        console.log(user)

        if(otpVerified){
            await axios.post("http://localhost:8081/lod/user/signup", user)
            .then((res)=>{console.log(res.data);setSuccessMessage(res.data.status);setErrorMessage("")})
            .catch((err)=>{console.log(err); setErrorMessage(err.request.response); setSuccessMessage("")})
            //navigate("/users")      
        }
        else{
            setErrorMessage("Please register your Number")
        }
        
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <Stack direction='column'>
            <Typography variant="h4" sx={{fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'green',
                    justifyContent:"center", alignItems:"center", mt:"2"}}>Register</Typography>
                <Paper elevation={2}>
                    <Stack border={0} direction='row'>
                        <Input label="FirstName" name="firstName" value={user.firstName} onChange={(event)=>{handleChange(event)}} required/>
                        <Input label="LastName" name="lastName" value={user.lastName} onChange={(event)=>{handleChange(event)}} required/>
                    </Stack>
                </Paper>
                
                <Paper elevation={2} sx={paperStyle}>
                    <Stack direction='column'>
                        <Stack border={0} direction='row'>
                            <Input label="PhoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={(event)=>{handleChange(event)}} disabled={showOtpComponent} required/>
                            <Button sx={{}} variant="text" onClick={handleOtpVerification}>Verify OTP</Button>
                        </Stack>
                    <Typography variant='inherit' ml={2} sx={{color:'red'}}>{otpVerificationMessage}</Typography>
                    </Stack>
                </Paper>
                
                {(!otpVerified && showOtpComponent) &&<Paper elevation={2} sx={paperStyle}>
                    <Stack direction='row'>
                        <OtpVerificationComponent phoneNumber={user.phoneNumber} setOtpVerified={setOtpVerified} setOtpVerificationMessage={setOtpVerificationMessage} setShowOtpComponent={setShowOtpComponent}></OtpVerificationComponent>
                        <Button onClick={()=>{setShowOtpComponent(false)}}>Change Number</Button>
                    </Stack>
                </Paper>}

                <Paper sx={paperStyle}>
                    <Stack direction='row'>
                        <Input label="EmailId" name="email" value={user.email} onChange={(event)=>{emailValidate(event.target.value);handleChange(event)}}
                        error={emailValiDate!==""} helperText={emailValiDate!==""? 'wrong email id format':""}/>
                        <Input placeHolder="Password" label="Password" name="password" value={user.password} onChange={(event)=>{passwordValidate(event.target.value);handleChange(event)}}  type='password' 
                        error={passwordValiDate!==""} helperText={passwordValiDate!==""? 'password should be greater than 8 characters':""}/>
                    </Stack>
                </Paper>

                <Paper sx={paperStyle}>
                    <Input type="text" label="PinCode" name="pinCode" value={address.pinCode} onChange={handlePincodeChange} error={pinCodeValiDate!==""}
                        helperText={pinCodeValiDate!==""?"PinCode is Not Valid":""} required/>
                    
                        {pinCodeValiDate==="" && (<>
                                <Input label="State" type="text" value={address.state} disabled/>
                                <Input label="District" type="text" value={address.district} disabled/>
                                <Input label="City" type="text" value={address.city} disabled/>
                                <Stack direction='column'>
                                    <InputLabel id='register-select-label'>Locality</InputLabel>
                                    <Select
                                        labelId='register-select-label'
                                        label='Locality'
                                        id="register-select"
                                        value = {address.locality}
                                        onChange={(event)=>{setAddress({...address,["locality"]:event.target.value})}}
                                        disabled={address.pinCode==="" || pinCodeValiDate!==""}
                                    >
                                        {localities.map((locality, index)=>{
                                            return <MenuItem key={index} value={locality.officeName}>{locality.officeName}</MenuItem>
                                        })}
                                    </Select>
                                    <Input type="text"label="LandMark" name="landMark" value={address.landMark} onChange={handleChangeAddress} required/>
                                </Stack></>)}
                            
                </Paper>
                <Paper style={{...paperStyle, justifyContent:'center'}}>
                    <Button type="submit" sx={{backgroundColor:"lightGreen", width:"50%", alignContent:"center"}}><Typography variant="button" >Register</Typography></Button>
                </Paper>
                <Paper>
                    <Typography color='red'>{errorMessage}</Typography>
                    <Typography variant="inherit" color='red'>{successMessage}</Typography>
                </Paper>
            </Stack>
        </form>
        
        {/* <Grid item container border={1} sx={{alignContent:"center"}}>
           <form onSubmit={handleSubmit}>
            <Grid item xs={5} container sx={{ml:"2rem", backgroundColor:"rgb(255,255,255,0.8)"}}>
                <Grid item xs={12}>
                    <Input label="FirstName" name="firstName" value={user.firstName} onChange={(event)=>{handleChange(event)}} required/>
                    <Input label="LastName" name="lastName" value={user.lastName} onChange={(event)=>{handleChange(event)}} required/>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Input label="PhoneNumber" name="phoneNumber" value={user.phoneNumber} onChange={(event)=>{handleChange(event)}} disabled={otpVerified} required/>
                        <Button sx={{mt:"2rem"}} variant="text" onClick={handleOtpVerification}>Verify OTP</Button>
                    </Grid>
                    <Grid item xs={12}>
                        {(!otpVerified && showOtpComponent) && <OtpVerificationComponent phoneNumber={user.phoneNumber} setOtpVerified={setOtpVerified} setOtpVerificationMessage={setOtpVerificationMessage} setShowOtpComponent={setShowOtpComponent}></OtpVerificationComponent>}
                        {otpVerificationMessage}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Input label="EmailId" name="email" value={user.email} onChange={(event)=>{emailValidate(event.target.value);handleChange(event)}}
                    error={emailValiDate!==""} helperText={emailValiDate!==""? 'wrong email id format':""}/>
                    <Input placeHolder="Password" label="Password" name="password" value={user.password} onChange={(event)=>{passwordValidate(event.target.value);handleChange(event)}}  type='password' 
                    error={passwordValiDate!==""} helperText={passwordValiDate!==""? 'password should be greater than 8 characters':""}/>
                </Grid>
                <Grid item xs={12}>
                    <Input type="text" label="PinCode" name="pinCode" value={address.pinCode} onChange={handlePincodeChange} required/>
                    {pinCodeValiDate==="" && (
                        <Grid>
                            <Input label="State" type="text" value={address.state} disabled/>
                            <Input label="District" type="text" value={address.district} disabled/>
                            <Input label="City" type="text" value={address.city} disabled/>
                            <InputLabel sx= {{ml: "1rem"}} id="demo-multiple-name-label">Locality</InputLabel>
                            <Select
                                label="Select a locality"
                                value = {address.locality}
                                onChange={(event)=>{setAddress({...address,["locality"]:event.target.value})}}
                                disabled={address.pinCode==="" || pinCodeValiDate!==""}
                                sx= {{m: "1rem"}}
                            >
                                {localities.map((locality, index)=>{
                                    return <MenuItem key={index} value={locality.officeName}>{locality.officeName}</MenuItem>
                                })}
                            </Select>
                            <Input type="text"label="LandMark" name="landMark" value={address.landMark} onChange={handleChangeAddress} required/>
                        </Grid>)}
                </Grid>
                <Grid item xs={12} sx= {{ml: "1rem"}}>
                    <Button variant="contained" type="submit" disabled={validate()}>Register</Button>
                </Grid>
                
            </Grid>  */}
                
                
                {/* <div className="form-group">
                    <InputLabel>Last Name</InputLabel>
                    <Input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <InputLabel>Email address</InputLabel>
                    <Input type="email" name="email" value={user.email} onChange={(e)=>{emailValidate(e.target.value);handleChange(e)}} className="form-control" required/>
                </div>
                <div className="form-group">
                    <InputLabel>PhoneNumber</InputLabel>
                    <Input type="text" name="phoneNumber" value={user.phoneNumber} onChange={(e)=>{handleChange(e)}} className="form-control" required disabled={otpVerified}/>
                    <div className="form-group">
                        <Input type="button" className="form-group" style={{ background:"none", border:"none", color:"blue" }}  onClick={handleOtpVerification} value="Verify OTP"></Input>
                    </div>
                    {(!otpVerified && showOtpComponent) && <OtpVerificationComponent phoneNumber={user.phoneNumber} setOtpVerified={setOtpVerified} setOtpVerificationMessage={setOtpVerificationMessage} setShowOtpComponent={setShowOtpComponent}></OtpVerificationComponent>}
                </div>
                {otpVerificationMessage}
                <div className="form-group">
                    <InputLabel>Password</InputLabel>
                    <Input type='password' className="form-control" name="password" value={user.password} onChange={(e)=>{passwordValidate(e.target.value);handleChange(e)}} required/>
                </div>
                <div className="form-group">
                    <InputLabel>PinCode</InputLabel>
                    <Input type="text" className="form-control" name="pinCode" value={address.pinCode} onChange={handlePincodeChange} required/>
                </div>
                {pinCodeValiDate==="" && (
                        <form>
                            <TextField label="State" type="text" value={address.state} className="form-control" disabled/>

                            <InputLabel>District</InputLabel>
                            <Input type="text" value={address.district} className="form-control" disabled/>

                            <InputLabel>City</InputLabel>
                            <Input type="text" value={address.city} className="form-control" disabled/>
                            
                            <InputLabel>Locality</InputLabel>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                name="locality"
                                onChange={handleChange}
                            >
                                <MenuItem value="none" disabled hidden>Select a Locality</MenuItem>
                                {localities.map((locality, index)=>{
                                    return <MenuItem key={index}>{locality.officeName}</MenuItem>
                                })}
                            </Select>
                            {/* <select name="locality" onChange={handleChangeAddress} className="form-control">
                                <option value="none" selected disabled hidden>Select a Locality</option>
                                {localities.map((locality, index)=>{
                                    return <option key={index}>{locality.officeName}</option>
                                })}
                            </select> */}

                        {/* </form>)} */}
                {/* <div className="form-group">
                    <InputLabel>LandMark</InputLabel>
                    <Input type="text" className="form-control" name="landMark" value={address.landMark} onChange={handleChangeAddress} required/>
                </div>
                <Input type="submit" value="Register" className="btn btn-primary" disabled={validate()}/> */}
                {/* {emailValiDate} */}
                {/* {passwordValiDate}
                {pinCodeValiDate}
                {errorMessage}
                {successMessage}
                </form>
                </Grid> */}
        </>
    )
}

export default Register