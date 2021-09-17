import React, {useState, useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl';
import {Link, useParams, useHistory, useLocation} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { getSpotFromCity, getSpots } from '../../store/spots'
import { setNavigation } from '../../store/navigation';
import './SpotsPage.css'
const CityPage = () => {
    let {city} = useParams()
    let history = useHistory()
    let location = useLocation()
    useEffect(()=>{
        if(city)dispatch(getSpotFromCity(city))
        else dispatch(getSpots())
    },[city])

    const [cities,setCities] = useState(["San Francisco","San Jose","Oakland","Santa Barbara","Santa Monica","Mammoth Lakes","Sacramento","South Lake Tahoe"])
    const [coordinates,setCoordinates] = useState([[37.7749,-122.4194],[37.3382,-121.8863],[37.8044,-122.2712],[34.4208,-119.6982],[34.0195,-118.4912],[37.6485,-118.9721],[38.5816,-121.4944],[38.9399,-119.9772]])
    let index
    if(city){
        city = city.split("-").join(" ")
        for(let i = 0; i<cities.length;i++){
            if (cities[i] === city){
                index = i
                break
            }
        }
    } else index = Math.floor(cities.length * Math.random())


    let currentCoordinates = coordinates[index]
    let dispatch = useDispatch()

    let spots = Object.values(useSelector((state)=>state.spots))

    let shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }
    spots = shuffleArray(spots)

    let dates
    if(location.state && location.state.dates)dates = location.state.dates

    if(dates){
        spots = spots.filter(spot => {
            if(spot.Bookings.filter(booking => {
                console.log("SPOT BOOKINGS",spot.Bookings)
                if(dates.checkin > booking.checkin && dates.checkin < booking.checkout){//not okay
                    return true
                } else if (dates.checkout > booking.checkin && dates.checkout < booking.checkout){//not okay
                    return true
                } else if (dates.checkin < booking.checkin && dates.checkout > booking.checkout){// not okay
                    return true
                } else {
                    return false
                }
            }).length){
                return false
            }
        })
    }


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


            console.log("LOCATION: ",location.state)
    return (
        <>
        <div id = "city-page-container">
            <div id="stays-container">
                <div id = "stays-inner-container">
                    {city ? (<h1 id = "city-title">Stays in {city}</h1>) : (<h1 id = "city-title">{location.state}</h1>)}
                    {spots instanceof Array && spots.map((spot)=>(
                        <Link key = {spot.id} to={`/spots/${spot.id}`}className = "city-page-individual-container" >
                            <div id = "city-page-image-container">
                                <img className = "city-page-image" src = {spot.image}></img>
                            </div>
                            <div className = "right-side">
                                <div className = "upper-right">
                                    {spot.name}
                                    <div id = "separating-line">___</div>
                                </div>
                                <div className = "lower-right">
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
