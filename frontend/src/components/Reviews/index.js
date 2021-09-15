import { useDispatch, useSelector } from "react-redux"
import { getUserByPk } from "../../store/users"
const Reviews = ({spot}) => {
    let dispatch = useDispatch()

    useEffect(() => {
        
        dispatch(getUserByPk())
    }, [])
    return (
        <>
            <div id = "spot-overall-review"></div>
            <div id = "reviews-container">
                {spot && spot.Reviews.map(review => (
                    <div></div>
                ))}
            </div>
        </>
    )
}




export default Reviews
