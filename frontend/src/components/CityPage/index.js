import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { getSpotFromCity } from '../../store/spots'
import './CityPage.css'
import mockData from "../../mockData"
const CityPage = () => {
    let {city} = useParams()

    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getSpotFromCity(city))
    },[])
    let spots = useSelector((state)=>state.spots)
    city = city.split("-").join(" ")
    return (
        <>
            <h1 id = "city-title">Stays in {city.toUpperCase()}</h1>
            <div id="stays-container">
                {spots instanceof Array && spots.map((spot)=>(
                    <Link key = {spot.id} to={`/spots/${spot.id}`}className = "city-page-individual-container" >
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
                    </Link>
                ))}
            </div>
        </>
    )
}

export default CityPage;
