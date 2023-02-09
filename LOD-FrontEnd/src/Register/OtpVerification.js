import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import app from "../config/firbaseConfig"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Input from "../control/input"
import { Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';


const auth = getAuth(app);
const OtpVerificatoin = (props)=>{
    const user = useSelector(state=>state.auth.user);
    
    const [otp, setOtp] = useState("")
    const [message, setMessage] = useState("")

    useEffect(()=>{
        onSignInSubmit()
    }, [])

    const onCaptchaVerify = ()=>{
        console.log("inside onCaptchaVErify")
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
              console.log("captcha resolved")
            },
          }, auth);
    }

    const onSignInSubmit = ()=>{
        onCaptchaVerify()
        console.log("inside onSignInSubmit")
        const phoneNumber = "+91"+props.phoneNumber;
        const appVerifier = window.recaptchaVerifier;
        console.log(phoneNumber)

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log(error)
            props.setShowOtpComponent(false)
            props.setOtpVerificationMessage("number is not correct")
            });
    }
    
    const verifyCode = ()=>{
        const code = otp;
        window.confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        console.log(user, "verified successfully")
        props.setOtpVerified(true)
        // ...
        }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log("User couldn't sign in (bad verification code?)")
        props.setOtpVerificationMessage("otp is not correct")
        });
    }
    // const handleVerifyOtp = (e)=>{
    //     if(otp=="123456"){
    //         props.setOtpVerificationMessage("Number Verified")
    //     }
    //     else{
    //         props.setOtpVerificationMessage("Number Not Verified")
    //     }        
    // }
    return(
        <>
            <TextField autoFocus label="OTP" name="otp" value={otp} onChange={(e)=>{setOtp(e.target.value)}} size="small" sx={{m:1}}></TextField>
            <div id="recaptcha-container"></div>
            <Button variant='contained' color="success" sx={{ml:"1rem"}} onClick={verifyCode}>Check Otp</Button> 
        </>
    )
}

export default OtpVerificatoin