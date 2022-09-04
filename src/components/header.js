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

const Header = () =>{
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

    navbar.current.children.style.marginLeft = window.innerWidth < 1000 ? "40px":"0";

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
          <div className={styles.logo} >
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
            <AniLink to="/" swipe  direction="up" duration={1} className={styles.navh1 + " " +styles.navh1Hide}>COLLAB</AniLink>
            <AniLink to="/projects" swipe  direction="down" className={styles.navh1 + " " +styles.navh1Hide + " " + styles.navh1Margin}>STUDIO</AniLink>
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
