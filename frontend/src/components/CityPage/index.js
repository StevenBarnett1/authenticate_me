import React, {useState, useEffect} from 'react'
import './CityPage.css'
import mockData from "../../mockData"
const CityPage = () => {
    let [city,setCity] = useState("Oakland")

    return (
        <>
            <h1 id = "city-title">Stays in {city}</h1>
            <div id="stays-container">
                {mockData.map((data)=>(
                    <div className = "individual-container">
                        <img src = {data.image}></img>
                        <div className = "right-side">
                            <div className = "upper-right">
                                {data.name}
                                <div id = "separating-line">___</div>
                            </div>
                            <div className = "lower-right">
                                <div><strong style={{fontSize:'12px'}}>☆{data.rating}</strong></div>
                                <div><strong>${data.price}</strong> / night</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CityPage;
