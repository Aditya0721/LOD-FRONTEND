import { useEffect, useState } from "react"
import axios from "axios"

const useFetch = (url) => {

    //console.log(url)

    const [data, setData] = useState([])
    
    useEffect(()=>{
        console.log("inside effect")
        axios.get(url)
        .then((res)=>{
            console.log(res.data)
            setData(res.data)
            //console.log(res.data)
        })
        .catch((err)=>{console.log(err)})
    }, [url])

    return [data, setData]
}

export default useFetch
