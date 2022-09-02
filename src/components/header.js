import * as React from "react"
import * as styles from  './header.module.css'
import * as styles2 from  './layout.module.css'
//import PropTypes from "prop-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { Link } from "gatsby"
import logo from "../images/malva.png"
import gsap from 'gsap'
import {useRef,useLayoutEffect,useContext} from 'react'
import useLocalStorage from "use-local-storage";
import {CursorContext} from "../context/cursorContext"

const Header = ({ siteTitle }) =>{
  const [firstNav,setfirstNav] = useLocalStorage("firstNav",true)
  const navbar = useRef()
  const {setRadio,setAnimation} = useContext(CursorContext)     

  useLayoutEffect( () =>
  {          
    if (firstNav) 
    {
      const arrNav = navbar.current.children          
      for(var i=1; i <arrNav.length; i++){   
        gsap.from(arrNav[i],{x:-10, opacity:0, ease:"power3.inOut", delay:1})
      }     
    }
    return(
      setfirstNav(false)
    )
  },[])

  const handleMouseEnter = () => { 
    setAnimation(true)
    setRadio(true)    
  }

  const handleMouseLeave = () => {
    setRadio(false)
    setTimeout(()=>{
      setAnimation(false)
    },300)        
  }

  return (    
      <header
        className={styles.headerContainer}
        ref={navbar}
      >
          <div             
            style={{
            marginLeft:`${window.innerWidth < 1000 ? "40px":"0"}`,
            flex:"0.5",
            display:"flex",
            alignItems:"end",
            justifyContent:"center",
            fontSize:"30px"        
            }}>
              <AniLink 
                style={{display:"flex"}}
                swipe  
                direction="up"
                to="/" 
                duration={1} 
                onMouseEnter={handleMouseEnter}                
                onMouseLeave={handleMouseLeave} > 
                  <img src={logo} alt="" />
              </AniLink>              
          </div>
          <div       
            style={{
            flex:"2",
            display:"flex",
            alignItems:"end",
            pointerEvent:"none"
          }}>
            <div >
                <AniLink swipe  
                  direction="down"  
                  duration={1} 
                  to="/projects" 
                  className={styles.navh1} 
                  onMouseEnter={handleMouseEnter}                
                  onMouseLeave={handleMouseLeave}
                  style={{}} > INDEX </AniLink>
            </div>
          </div>
          <div style={{flex:"1", display:"flex"}} >
            <AniLink to="/" swipe  direction="up" duration={1} className={styles.navh1} style={{display:`${window.innerWidth < 900 ? "none":"flex"}`}} >COLLAB</AniLink>
            <AniLink to="/projects" swipe  direction="down" className={styles.navh1} style={{marginRight:`${window.innerWidth < 1000 ? "40px":"0"}`, display:`${window.innerWidth < 900 ? "none":"flex"}`}}
                >STUDIO</AniLink>
          </div>    
      </header>
    )
} 

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

export default Header
