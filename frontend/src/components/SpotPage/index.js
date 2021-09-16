import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import {getSpotByPk} from "../../store/spots"
import {useDispatch ,useSelector} from "react-redux"
import {getReviews} from "../../store/reviews"
import Reservation from "../Reservation"
import Reviews from "../Reviews"
import "./Spot.css"

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let SpotPage = () => {
    let {spotId} = useParams()
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getSpotByPk(+spotId))
    },[])

    let spot = useSelector((state)=>state.spots)
    spot = Object.values(spot)[0]

    useEffect(() => {
        if (spot)dispatch(getReviews(spot.id))
    }, [dispatch,spot])

    let reviews = useSelector((state)=>state.reviews)

    reviews = Object.values(reviews)
    reviews = reviews.filter(review=>review.id)

    reviews = reviews.map(review => {
        let createdDate = new Date(review.createdAt)
        let createdMonth = monthNames[createdDate.getMonth()]
        let createdDay = createdDate.getDate()
        let updatedDate = new Date(review.updatedAt)
        let updatedMonth = monthNames[updatedDate.getMonth()]
        let updatedDay = updatedDate.getDate()
        let rating = +review.rating

        return {...review,createdAt:`${createdMonth} ${createdDay}`,updatedAt:`${updatedMonth} ${updatedDay}`,rating}
    })

    let rating
    if(reviews instanceof Array)rating = reviews.reduce((accum,review)=>accum+review.rating,0)/reviews.length
    if(spot)spot.rating = rating.toFixed(1)

    return (
        <div id = "spot-container">
            <h1 id = "spot-title">{spot && spot.name}</h1>
            <div className = 'spot-top-container'>
                <div id = "spot-top-left-container">
                    <div>{spot && spot.rating}</div>
                    <div style = {{color:"grey"}}>Superhost</div>
                    <strong style = {{color:"grey", textDecoration:"underline"}}>{spot && `${spot.city},${spot.state},United States`}</strong>
                </div>
            </div>
            <div id = "spot-image-container">
                <img id = "spot-image" src = {spot && spot.image}></img>
            </div>

            <div id = "spot-bottom-container">
                <div className = "spot-bottom-left">
                    <div id = "spot-description-title">
                        <h2>Hosted by {spot && spot.User.firstName}</h2>
                        <img id = "spot-profile-image" src = {spot && spot.User.image}></img>
                    </div>
                    <div id = "spot-details">
                        <div>
                            <strong>🏠 Entire Home</strong>
                            <p>You’ll have the chalet to yourself.</p>
                        </div>
                        <div>
                            <strong>🚪 Enhanced Clean</strong>
                            <p>This host committed to Airbnb's 5-step enhanced cleaning process.</p>
                        </div>
                        <div>
                            <strong>🏅 {spot && spot.id && spot.User.firstName} is a SuperHost</strong>
                            <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                        </div>
                    </div>
                    <div id = "spot-description">
                        {spot && spot.description}
                    </div>
                    <div id = "spot-items-outer-container">
                        <h2>What this place offers</h2>
                        <div id = "spot-items">
                            <div className = "spot-item">🍳 Kitchen</div>
                            <div className = "spot-item">📶 Wifi</div>
                            <div className = "spot-item">🚗 Free Parking on premises</div>
                            <div className = "spot-item">📺 TV</div>
                            <div className = "spot-item">🛁 Bathtub</div>
                            <div className = "spot-item">📷 Security cameras on premises</div>
                            <div className = "spot-item">🚬🚨 Smoke alarm</div>
                            <div className = "spot-item">🔑 Self check-in</div>
                            <div className = "spot-item">❄️ Air conditioning</div>
                            <div className = "spot-item">🌡️ Heating</div>

                        </div>
                    </div>
                    <div>
                        <Reviews reviews = {reviews}/>
                    </div>
                </div>
                <div id = "spot-bottom-right">
                        <Reservation spot={spot}/>
                </div>
            </div>
        </div>
    )
}

export default SpotPage
