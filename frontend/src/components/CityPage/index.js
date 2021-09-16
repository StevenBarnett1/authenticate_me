import React, {useState, useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl';
import {Link, useParams} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { getSpotFromCity } from '../../store/spots'
import './CityPage.css'
const CityPage = () => {
    let {city} = useParams()
    const [cities,setCities] = useState(["San Francisco","San Jose","Oakland","Santa Barbara","Santa Monica","Mammoth Lakes","Sacramento","South Lake Tahoe"])
    const [coordinates,setCoordinates] = useState([[37.7749,-122.4194],[37.3382,-121.8863],[37.8044,-122.2712],[34.4208,-119.6982],[34.0195,-118.4912],[37.6485,-118.9721],[38.5816,-121.4944],[38.9399,-119.9772]])
    let index
    for(let i = 0; i<cities.length;i++){
        if (cities[i] === city.split("-").join(" ")){
            index = i
            break
        }
    }
    let currentCoordinates = coordinates[index]
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getSpotFromCity(city))
    },[])
    let spots = Object.values(useSelector((state)=>state.spots))
    city = city.split("-").join(" ")

    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmVuYmFybmV0dDEiLCJhIjoiY2t0a2w1bDh1MW13cjJvbnh2Nm4xeHg4ZSJ9.tfF8CCQtdVQSCHxliRtaQQ';

    const mapContainer = useRef(null);
        const map = useRef(null);
        const [lng, setLng] = useState(currentCoordinates[1]);
        const [lat, setLat] = useState(currentCoordinates[0]);
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

            console.log("FGDFGDFGFDGDFGFDGFDGFDGDFGDFGDFGDFFDGDFG", spots)
    return (
        <>
        <div id = "city-page-container">
            <div id="stays-container">
                <div id = "stays-inner-container">
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
                                    {/* <div><strong style={{fontSize:'14px'}}>☆{spot.rating}</strong></div> */}
                                    <div><strong>${spot.price}</strong> / night</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div id = "map-outer-container">
                <div ref={mapContainer} className="map-inner-container" />
                </div>
            </div>
        </>
    )
}

export default CityPage;
