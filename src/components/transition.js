import React,{useRef, useLayoutEffect, useState} from 'react'
import { useEffect } from 'react';
import useLocalStorage from "use-local-storage";
import * as  styles from './footer.module.css'
import gsap from 'gsap'
import { Repeat } from 'react-feather';


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
    
export const Transition = ({timeline,color }) => {

    const [firstLoading,setFirstLoading] = useLocalStorage("firstLoading",true)    
    //const [firstLoading,setFirstLoading] = useState(true);
    const trans = useRef(null);
    const asterisk = useRef(null);

    useLayoutEffect( () => 
    {      
      disableScroll()                  
      if(firstLoading)
      {                                  
        gsap.fromTo(asterisk.current,{
          rotation: 0,          
        },{
          rotation: 360,          
          repeat: -1,
          duration: 3,
          transformOrigin:"center 33%",
          ease: "linear"
        },0)                

        timeline.fromTo(asterisk.current,{
          scale: 20,
          delay:1,
          x:"30vw",
          y:"-20vw"
        },{
          x:"0vw",
          y:"0vw",
          scale: 1,
          duration: 2,
          ease: "power3.inOut"
        }) 

        timeline.to(trans.current,{                       
              duration:1.5,                
              yPercent:-100,
              ease:"power4.inOut",               
        })                                   
        
        setTimeout(()=>{
          enableScroll()             
          },3200)  
      }  
      else
      { 
        gsap.fromTo(asterisk.current,{
          rotation: 0,          
        },{
          rotation: 360,          
          repeat: -1,
          duration: 3,
          transformOrigin:"center 33%",
          ease: "linear"
        },0)                

        trans.current.style.display = 'none';

        setTimeout(()=>{
          enableScroll()             
          },1000)  
      }       
      
 

      return(
        setFirstLoading(false)
      )
    },[])


  return (
    <>
      <div
          ref={trans}
          style={{
              position:"absolute",
              zIndex: "500",
              backgroundColor:`${color}`,
              top:"0",
              width:"100%",
              height: "120vh",         
              display:"flex"
          }}
      ></div>
      <div className={styles.asteriskContainer} ref={asterisk}> 
        <span  className={styles.asterisk}>&#42;</span>
      </div>
    </>
  )
}
