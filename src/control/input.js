import { TextField } from "@mui/material"
import { useEffect, useState } from "react"


const Input = (props)=>{
    return (
    <TextField sx={{...props.sx, m: '1rem' }} type={props.type} placeholder={props.placeHolder} label={props.label} name={props.name} value={props.value} onChange={props.onChange} disabled={props.disabled} error={props.error} helperText={props.helperText} required/>)
}

export default Input