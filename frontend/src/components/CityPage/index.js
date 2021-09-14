import React, {useState, useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl';
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
    let spots = Object.values(useSelector((state)=>state.spots))
    city = city.split("-").join(" ")

    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmVuYmFybmV0dDEiLCJhIjoiY2t0a2w1bDh1MW13cjJvbnh2Nm4xeHg4ZSJ9.tfF8CCQtdVQSCHxliRtaQQ';

    const mapContainer = useRef(null);
        const map = useRef(null);
        const [lng, setLng] = useState(-121.88);
        const [lat, setLat] = useState(37.33);
        const [zoom, setZoom] = useState(9);

        useEffect(() => {
            if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoom
            });
        });
        useEffect(() => {
            if (!map.current) return; // wait for map to initialize
            map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
            });
            });
            
    return (
        <>
        <div id = "city-page-container">
            <div id="stays-container">
            <h1 id = "city-title">Stays in {city}</h1>
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
            <div>
                <div ref={mapContainer} className="map-container" ></div>
            </div>
            </div>
        </>
    )
}

export default CityPage;
