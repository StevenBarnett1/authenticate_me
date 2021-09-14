import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getSpotFromCity } from '../../store/spots'
import './CityPage.css'
import mockData from "../../mockData"
const CityPage = ({city}) => {
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getSpotFromCity(city))
    },[])
    let spots = useSelector((state)=>state.spots)

    return (
        <>
            <h1 id = "city-title">Stays in {city.toUppercase()}</h1>
            <div id="stays-container">
                {spots.map((spot)=>(
                    <div className = "city-page-individual-container">
                        <img className = "city-page-image" src = {spot.image}></img>
                        <div className = "right-side">
                            <div className = "upper-right">
                                {spot.name}
                                <div id = "separating-line">___</div>
                            </div>
                            <div className = "lower-right">
                                <div><strong style={{fontSize:'14px'}}>☆{spot.rating}</strong></div>
                                <div><strong>${spot.price}</strong> / night</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CityPage;
