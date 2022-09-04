import * as React from "react"
import { useRef,useLayoutEffect, useContext,useState} from "react";
import Layout from "../components/layout"
import Index from "../components/index"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Transition } from "../components/transition";
import { useEffect } from "react";
import CursorManager from "../context/cursorContext"
gsap.registerPlugin(ScrollTrigger);

const IndexPage = () => 
{   
  let titleHero = useRef() 
  let hero = useRef()
  const tl = gsap.timeline()  
  const [heightMain, setHeightMain] = useState(null);
  const [heightHero, setHeightHero] = useState(null);

  useLayoutEffect(() => {
    setHeightHero(hero.current.offsetHeight)
  },[])
  
  useEffect( () => 
  {
    ScrollTrigger.enable(true);    
    let proxy = { skew: 0 },
    skewSetter = gsap.quickSetter(titleHero, "skewY", "deg"), 
    clamp = gsap.utils.clamp(-20, 20); 
    gsap.set(titleHero, {transformOrigin: "left center", force3D: true, opacity:1});
    tl.from(titleHero,{ y:50, opacity:0, duration:0.5, delay:0.3});

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / 1500);        
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {skew: 0, duration: 0.1, ease: "power3.inOut", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});
        }
      }
    });        
    
    hero.current.style.width = window.innerWidth < 800 ? "90%":"50%" ;

    return () => {
        ScrollTrigger.disable();    
        ScrollTrigger.clearScrollMemory();
      }
  },[])

  return (       
    <>    
      <Layout  >  
        <CursorManager>   
        <div style={{ backgroundColor:"#171717", color:"#c4ced3 !important" , height:`${heightMain+heightHero}px`}}>
            <div
                ref={hero}
                style={{
                    // width:`${window.innerWidth < 800 ? "90%":"50%" }`,                       
                    margin:"auto",
                    paddingTop:"28vh",
                    paddingLeft:"2.9vw"
                }}
            >
              <p 
                ref={el => titleHero = el}
                style={{
                    // fontSize:"16rem",
                    fontSize:"13.7vw",
                    color:"#c4ced3"                         
                }}
              >
                WE’RE<br/>JUST<br/>ANOTH<br/>ER<br/>DESIGN<br/>
                STUDIO<br/>DRIVEN<br/>TO<br/>CREATE<br/>COOL<br/>WORK.          
              </p>
            </div>  
            <Index setHeightMain={setHeightMain}/>
          </div>         
         <Transition timeline={tl} color={"#f5f5f5"}/> 
         </CursorManager>  
      </Layout>    
    </>      
  )
}

export default IndexPage
