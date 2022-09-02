import React,{useRef,useContext,useState, useLayoutEffect} from 'react'
import * as  styles from './scrollItem.module.css'
import {CursorContext} from "../context/cursorContext"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
    
function ScrollItem({project}) 
{    
    const {url,title, info} = project;
    const [maskedRadius, setMaskedRadius] = useState(0)
    const [clipMask, setClipMask] = useState({x:0,y:0})
    const containerRef = useRef(null)    
    const {setVisibility} = useContext(CursorContext)   
    
    const tl = gsap.timeline({
        defaults: {           
          ease: "none"
        }
    })

    useLayoutEffect(() => {         
        
        if(containerRef.current)
        {   
            tl.from(containerRef.current, {yPercent:100, duration:0.5, skewY:10})
            ScrollTrigger.create({           
                animation:tl, 
                trigger:containerRef.current,      
                ease:"power3",                          
                start:"top 80%",                                                      
            })     
        }

        const getCoordinates = (mouse) => {
            const posX = mouse.offsetX 
            const posY = mouse.offsetY 
            setClipMask({
                x:(posX/containerRef.current.clientWidth)*100 ,
                y:(posY/containerRef.current.clientHeight)*100 
            })
        }
    
        const refreshAnimation = (event) => {
            window.requestAnimationFrame(() => getCoordinates(event))
        }
        
        containerRef.current.addEventListener("mousemove", refreshAnimation )
        
        return () => {                       
            ScrollTrigger.disable(true,true)
            tl.kill()          
            containerRef.current.removeEventListener("mousemove", refreshAnimation)
        }
    },[])
    
    return (
        <div 
            style={{ 
            height:"110%",
            width:"29rem",
            margin:"auto",
            overflow:"hidden",            
            cursor:"grab"
            }}
            className={styles.galleryitemwrapper}
        >
            <div 
                className={styles.galleryitem} 
                ref={containerRef} 
                onMouseEnter={() => {
                    setVisibility(false)
                    setMaskedRadius(30)
                }}
                onMouseLeave={() => {
                    setVisibility(true)
                    setMaskedRadius(0)
                }}
            >            
                <div
                    className={styles.galleryitemimage+ " " +styles.sepia }               
                    style={{ backgroundImage:`url(${url})` }}                                   
                ></div>
                <div
                    className={styles.galleryitemimage }
                    style={{
                        backgroundImage:`url(${url})`,
                        clipPath:`circle(${maskedRadius}% at ${clipMask.x}% ${clipMask.y}%)`
                    }}
                ></div>
            </div>            
        </div> 
    )
}

export default ScrollItem