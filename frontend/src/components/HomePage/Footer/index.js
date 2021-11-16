import "./Footer.css"
import {NavLink} from "react-router-dom"
import {AiFillLinkedin} from "react-icons/ai"
import {SiGithub} from "react-icons/si"
const Footer = () => {

    return (
        <div id = "footer-outer">
            <NavLink id = "github-navlink" to = {{pathname:"https://github.com/StevenBarnett1"}} target="_blank"><SiGithub fill = {"black"} style = {{fontSize:"45px"}}/></NavLink>
            <div style = {{fontSize:"33px",fontWeight:"bold"}}>Steven Barnett</div>
            <NavLink to = {{pathname:"https://www.linkedin.com/in/steven-r-barnett/"}} target="_blank"><AiFillLinkedin fill = {"black"} style = {{fontSize:"45px"}}/></NavLink>
        </div>
    )
}

export default Footer;
