import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import {getSpotByPk} from "../../store/spots"
import {useDispatch ,useSelector} from "react-redux"
import { getUserByPk } from "../../store/users"

let Spots = () => {
    let [spot,setSpot] = useState("")
    let {spotId} = useParams()
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getSpotByPk(+spotId))
    },[])

    return (
        <>
            <h1>{spot.name}</h1>
            <div className = 'spot-top-container'>
                <div>{`${spot.city},${spot.state},United States`}</div>
            </div>
            <img src = {spot.image}></img>
            <div id = "spot-details">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    )
}

export default Spots
