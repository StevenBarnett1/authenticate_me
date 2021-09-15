import {useState} from "react"
import "./LiveAnywhere.css"


const LiveAnywhere = () => {
    let [images,setImages] = useState(["https://a0.muscache.com/im/pictures/2f13349d-879d-43c6-83e3-8e5679291d53.jpg?im_w=480","https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=480","https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480","https://a0.muscache.com/im/pictures/10a638e1-6aff-4313-8033-1275cec83987.jpg?im_w=480"])
    let [labels,setLabels] = useState(["Outdoor Getaways","Unique Stays", "Entire Homes","Pets Allowed"])
    return (
        <>
            <h1>Live anywhere</h1>
            <div id = "live-anywhere-outer-container">
                {images && images.map((image,i)=>(
                    <div className = "live-anywhere-inner-container">
                        <img src = {image}></img>
                        <div>{labels[i]}</div>
                    </div>
                ))}
            </div>
        </>
    )
}


export default LiveAnywhere
