import {useState} from "react"
import {Link} from "react-router-dom"
import "./ThingsToDo.css"
const ThingsToDo = () => {
    let [images,setImages] = useState(["https://a0.muscache.com/im/pictures/ad109d56-2421-40cd-98e6-e114160dc85b.jpg?im_w=480","https://a0.muscache.com/im/pictures/0ce799cb-7553-4369-be9e-d0011e0ef636.jpg?im_w=480","https://a0.muscache.com/im/pictures/3c2676df-0874-45a3-a82f-bbf57ccde1cc.jpg?im_w=480"])
    let [labels,setLabels] = useState(["Experiences","Online Experiences", "Outdoor Collection"])
    return (
        <>
            <h1>Discover things to do</h1>
            <div id = "ttd-outer-container">
                {images && images.map((image,i)=>(
                    <Link to = {{pathname:"/spots",state:labels[i]}} key = {image} className = "ttd-inner-container" style = {{textDecoration:"none"}}>
                        <img src = {image}></img>
                        <div className="photo-labels">{labels[i]}</div>
                    </Link>
                ))}
            </div>
        </>
    )
}


export default ThingsToDo
