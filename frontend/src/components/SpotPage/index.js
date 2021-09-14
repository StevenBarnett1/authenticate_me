import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import {getSpotByPk} from "../../store/spots"
import {useDispatch ,useSelector} from "react-redux"
import usersReducer, { getUserByPk } from "../../store/users"

let SpotPage = () => {
    let {spotId} = useParams()
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getSpotByPk(+spotId))
    },[])
    let spot = useSelector(state=>state.spots)
    return (
        <>
            <h1>{spot.name}</h1>
            <div className = 'spot-top-container'>
                <div>Superhost</div>
                <div>{`${spot.city},${spot.state},United States`}</div>
            </div>
            <img src = {spot.image}></img>
            <div id ="spot-host">
                {spot.id && spot.User.firstName}
            </div>
            <div id = "spot-details">
                <div>
                    <strong>Entire Home</strong>
                    <p>You’ll have the chalet to yourself.</p>
                </div>
                <div>
                    <strong>Enhanced Clean</strong>
                    <p>This host committed to Airbnb's 5-step enhanced cleaning process.</p>
                </div>
                <div>
                    <strong>{spot.id && spot.User.firstName} is a SuperHost</strong>
                    <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                </div>
            </div>
            <div id = "spot-description">
                {spot.description}
            </div>
        </>
    )
}

export default SpotPage
