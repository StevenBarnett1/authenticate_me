import {useState} from "react"
import "./ThingsToDo.css"
const ThingsToDo = () => {
    let [images,setImages] = useState(["https://a0.muscache.com/im/pictures/ad109d56-2421-40cd-98e6-e114160dc85b.jpg?im_w=480","https://a0.muscache.com/im/pictures/0ce799cb-7553-4369-be9e-d0011e0ef636.jpg?im_w=480","https://a0.muscache.com/im/pictures/3c2676df-0874-45a3-a82f-bbf57ccde1cc.jpg?im_w=480"])
    let [labels,setLabels] = useState(["Experiences","Online Experiences", "Outdoor Collection"])
    return (
        <>
            <h1>Discover things to do</h1>
            <div id = "ttd-outer-container">
                {images && images.map((image,i)=>(
                    <div to = "/spots" key = {image} className = "ttd-inner-container">
                        <img src = {image}></img>
                        <div className="photo-labels">{labels[i]}</div>
                    </div>
                ))}
            </div>
        </>
    )
}


export default ThingsToDo
