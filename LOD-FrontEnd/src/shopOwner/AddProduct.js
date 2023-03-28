import { useSelect } from "@mui/base"
import { Button, Dialog, DialogContent, Input, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProductToMenuUrl, fetchProductByBrandAndTypeUrl, updateProductInMenuUrl } from "../constants/url"
import { shopActions } from "../store/shop"

const AddProduct = (props)=>{
    
    const user = useSelector(state=>state.auth.user)

    const shop = useSelector(state=>state.shops.currentShop)
    const shops = useSelector(state=>state.shops.shops)
    const dispatch = useDispatch()

    const liquorTypes = [{'type':"VODKA",'brands':[`Tito's Vodka`, `Skyy Vodka`, `Absolut Vodka`]}, {'type':'TEQUILA','brands':[`Patrón Silver Tequila`, `Jose Cuervo Tequila`]}, {'type':'RUM', 'brands':[`Bacardi Rum`, `Capitan Morgan Rum`, `Goslings Black Seal Rum`, `Malibu Coconut Rum`]}, {'type':'WHISKEY', 'brands':[`SEAGRAMS`]}]

    const [brands, setBrands] = useState([])

    const [type, setType] = useState("")
    const [brand, setBrand] = useState("")
    const [productName, setProductName] = useState("")
    const [itemId, setItemId] = useState("")

    const [productList, setProductList] = useState([])

    const [message, setMessage] = useState("")

    const [product, setProduct] = useState({
        productId:'',
        productName:'',
        quantity:'',
        price:'',
        brand:'',
        type:'',
    })

   

    useEffect(()=>{
        console.log(shop.menu.map(ele=>ele.productId).includes(itemId), itemId)
        if(shop.menu.map(ele=>ele.productId).includes(itemId)){
            setMessage("This Product Is Already In Menu")
        }
        else{
            setMessage("")
            setProduct({...product,['productId']:itemId})
        }
    },[itemId])

    useEffect(()=>{
        console.log(user)
        if(brand!=="" && type!==""){
            console.log(brand, type)
            axios.get(fetchProductByBrandAndTypeUrl+`?brand=${brand}&type=${type}`,{headers:{
                "x-auth-token":user.token
            }}).
            then((res)=>{console.log(res); setProductList(res.data); setProduct({...product,["brand"]:brand,["type"]:type})}).
            catch((err)=>{console.log(err)})
        }
    },[brand])

    const handleSubmit = (e)=>{
        e.preventDefault()   
        console.log(product)
        // adding menu to product
        axios.put(addProductToMenuUrl+shop.shopId, {"products":[
            product
        ]},{headers:{
            "x-auth-token":user.token
        }}).then((res)=>{props.setShowAddProduct(false); dispatch(shopActions.addProductToMenu(product))}).catch((err)=>{console.log(err)})
    }

    const handleUpdate = (e)=>{
        e.preventDefault()  
        const updatedMenu = shop.menu.map((ele)=>{
            if(ele.productId===itemId){
                return {...ele, ['quantity']:product.quantity, ['price']:product.price}
            }
            else{
                return ele
            }
        })
        console.log(updatedMenu, user)
        //update product in menu
        axios.put(updateProductInMenuUrl+shop.shopId, {"menu":
            updatedMenu
        },{headers:{
            "x-auth-token":user.token
        }}).then((res)=>{props.setShowAddProduct(false); dispatch(shopActions.updateMenu(updatedMenu))}).then(()=>{
            const updatedShops = shops.map((ele)=>{
                if(ele.shopId===shop.shopId){
                    return shop
                }else{
                    return ele
                }
            })
           return updatedShops
        }).then((data)=>{console.log(data);dispatch(shopActions.setShops(data))}).catch((err)=>{console.log(err)})
    }
    return(<>
            <Dialog open={props.showAddProduct} onClose={()=>{props.setShowAddProduct(false)}}>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                    <Stack sx={{width:'500px'}}>
                        <InputLabel id='type-select-label'>Select A Type</InputLabel>
                        <Select
                            required
                            variant='standard'
                            labelId='type-select-label'
                            label='liquorTypes'
                            id="liquorTypes-select"
                            value = {type}
                            onChange={(event)=>{setType(event.target.value); setBrands(liquorTypes.find((ele)=>{return ele.type===event.target.value}).brands)}}
                        >
                            {liquorTypes.map((ele, index)=>{
                                    return <MenuItem key={index} value={ele.type}>{ele.type}</MenuItem>
                                })}
                        </Select>
                        <InputLabel id='brand-select-label'>Select A Brand</InputLabel>
                        <Select
                            required
                            variant='standard'
                            labelId='brand-select-label'
                            label='brands'
                            id="brands-select"
                            value = {brand}
                            onChange={(event)=>{setBrand(event.target.value)}}
                        >
                            {brands.map((ele, index)=>{
                                    return <MenuItem key={index} value={ele}>{ele}</MenuItem>
                                })}
                        </Select>
                        <InputLabel id='product-name-select-label'>Select A Product</InputLabel>
                        <Select
                            required
                            variant='standard'
                            labelId='product-name-select-label'
                            label='productName'
                            id="product-name-select"
                            value={product.productName}
                            onChange={(event)=>{setProduct({...product, ["productName"]:event.target.value})}}
                        >
                            {productList.map((ele, index)=>{
                                    return <MenuItem key={index} value={ele.productName} onClick={()=>{setItemId(ele.productId)}}>{ele.productName}</MenuItem>
                                })}
                        </Select>
                        {message}
                        <TextField required label='Quantity' variant='standard' name='quantity' value={product.quantity} onChange={(event)=>{setProduct({...product, ['quantity']:event.target.value})}}/>
                        <TextField required label='Price' variant='standard' name='price' value={product.price} onChange={(event)=>{setProduct({...product, ['price']:event.target.value})}}/>
                        {message==="This Product Is Already In Menu"? <Button type='submit' variant='contained' color='primary' onClick={handleUpdate}>Update Product</Button>:
                            <Button type='submit' variant='contained' color='primary'>ADD</Button>
                        }
                    </Stack>
                    </form>
                </DialogContent> 
            </Dialog>
    </>)
}

export default AddProduct