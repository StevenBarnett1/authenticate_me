import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import {getSpotByPk} from "../../store/spots"
import {useDispatch ,useSelector} from "react-redux"

let Spots = () => {
    let {id} = useParams()
    let spots = useSelector((state)=>state.spots)
    let spot = spots.find(spot => spot.id === +id)
    
    return (
        <>
            <h1>{spot.name}</h1>
            <div className = 'spot-top-container'>
                <div>{}</div>
                <div></div>
            </div>
        </>
    )
}

export default Spots
