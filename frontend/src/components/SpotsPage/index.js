import React, {useState, useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl';
import {Link, useParams, useHistory, useLocation} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { getSpotFromCity, getSpots, randomizeSpots } from '../../store/spots'
import { setNavigation } from '../../store/navigation';
import './SpotsPage.css'
/* eslint import/no-webpack-loader-syntax: off */
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
mapboxgl.workerClass = MapboxWorker
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

const SpotsPage = () => {
    let {city} = useParams()
    let history = useHistory()
    let location = useLocation()
    useEffect(()=>{
        if(city)dispatch(getSpotFromCity(city))
        else dispatch(randomizeSpots())
    },[city])
    const [title,setTitle] = useState("")
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
    } else {
        index = Math.floor(cities.length * Math.random())
    }

    let spots = Object.values(useSelector((state)=>state.spots))

    let dates
    if(location.state && location.state.dates)dates = location.state.dates
    if(dates){
        spots = spots.filter(spot => {
            if(spot.Bookings.filter(booking => {
                const bookingCheckin = new Date(booking.checkin)
                const bookingCheckout = new Date(booking.checkout)
                const dateCheckin = new Date(dates.checkin)
                const dateCheckout = new Date(dates.checkout)

                if(dateCheckin > bookingCheckin && dateCheckin < bookingCheckout){//not okay
                    return true
                } else if (dateCheckout > bookingCheckin && dateCheckout < bookingCheckout){//not okay
                    return true
                } else if (dateCheckin < bookingCheckin && dateCheckout > bookingCheckout){// not okay
                    return true
                } else {
                    return false
                }
            }).length){
                return false
            }
           else {
               return true
           }
        })
    }

    let currentCoordinates = coordinates[index]
    let dispatch = useDispatch()

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

            useEffect(()=>{
                if(!city && !dates && !location.state){
                    setTitle("All Available Stays")
                }
                else if(city && dates){
                    setTitle(`Available Stays in ${city} from ${monthNames[dates.checkin.getMonth()]} ${dates.checkin.getDate()} - ${monthNames[dates.checkout.getMonth()]} ${dates.checkout.getDate()}`)
                } else if (city){
                    setTitle(`Available Stays in ${city}`)
                } else if (dates){
                    setTitle(`Available Stays ${monthNames[dates.checkin.getMonth()]} ${dates.checkin.getDate()} - ${monthNames[dates.checkout.getMonth()]} ${dates.checkout.getDate()}`)
                } else if (location.state){
                    setTitle(location.state)
                }
            },[city,dates,location])


    return (
        <>
        <div id = "spots-page-container">
            <div id="stays-container">
                <div id = "stays-inner-container">
                    <h1 id = "spots-title">{title}</h1>
                    {spots instanceof Array && spots.map((spot)=>(
                        <Link key = {spot.id} to={`/spots/${spot.id}`}className = "spots-page-individual-container" >
                            <div id = "spots-page-image-container">
                                <img className = "spots-page-image" src = {spot.image}></img>
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

export default SpotsPage;
