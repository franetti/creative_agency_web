import React,{useRef , useEffect,useLayoutEffect} from 'react'
import * as  styles from './scrollItem.module.css'
import * as  styles2 from './projectItem.module.css'
import {Hash} from 'react-feather'
import ScrollItem from "../components/scrollItem"
import {pageData} from "../data"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { uuid } from 'uuidv4';
import Cursor from './cursor'
gsap.registerPlugin(ScrollTrigger);
 
const Index = ({setHeightMain}) => {
    
    let wrapper = useRef()          
    let wrapperContainer = useRef() 
    let containerRef = useRef(null)  
    const tl =   gsap.timeline({
        defaults: {           
          ease: "none",          
        }
      })

    useLayoutEffect( () => 
    {       
        ScrollTrigger.enable(true);  
        tl.restart();         

        const arrLi = wrapper.children[0].children;         
        const widthSpin = wrapper.offsetWidth          
        const widthTranslate = wrapper.offsetWidth / wrapper.children[0].children.length;                    
        const proxy = { skew: 0 };
        const skewSetter = gsap.quickSetter(arrLi, "skewX", "deg");        
        const clamp = gsap.utils.clamp(-20, 20);   
        
        setHeightMain(widthSpin+(wrapperContainer.offsetWidth/1.6))         

        gsap.set(arrLi, {transformOrigin: "center center", force3D: true});
        for(var i=0; i <arrLi.length-1; i++)
        {        
            tl.to(wrapper, {x:-widthTranslate*(i+1)}) 
            
            gsap.from(`.title${i}`, {  
                y:100,   
                skewY:70,                           
                opacity:0,
                ease: "none",                
                stagger:0.1,  
                duration:0.1,                                             
                scrollTrigger: {
                  trigger: arrLi[i],
                  horizontal:true,
                  containerAnimation: tl,
                  start: "left 25%",   
                  end:"left 18%",                    
                  onEnter:({animation}) => {                    
                    animation.restart()                                   
                  },
                  onLeave: ({animation}) => (
                    gsap.to(animation._targets,{opacity:0, stagger:0.1, duration:0.1})                
                  ),
                  onEnterBack: ({animation}) => animation.restart(),
                  onLeaveBack:({animation}) => {
                    gsap.to(animation._targets,{opacity:0, stagger:0.1,duration:0.1})                        
                    animation.pause();                                      
                  }                                                       
                }                
            });              
        }         
        
        gsap.from(`.title${arrLi.length-1}`, {  
            y:100,   
            skewY:70,                           
            opacity:0,
            ease: "none",                
            stagger:0.1,   
            duration:0.1,                                             
            scrollTrigger: {
              trigger: arrLi[arrLi.length-1],
              horizontal:true,
              containerAnimation: tl,
              start: "left 25%",   
              end:"left 18%",                    
              onEnter:({animation}) => animation.restart(),
              onLeave: ({animation}) => (
                gsap.to(animation._targets,{opacity:0, stagger:0.1})                
              ),
              onEnterBack: ({animation}) => animation.restart(),
              onLeaveBack:({animation}) => {
                gsap.to(animation._targets,{opacity:0, stagger:0.1})                        
                animation.pause();                                      
              }                                                       
            }                
        });   

        ScrollTrigger.create({           
            animation:tl, 
            trigger:wrapper,      
            ease:"none",
            fastScrollEnd:true,            
            start:"bottom center",            
            end: () => "+=" + (widthSpin),                        
            pin:true,                
            scrub:0.4,                       
            snap:{
                snapTo:1/(arrLi.length-1),
                duration:0.5
            },       
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -480);                
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                  proxy.skew = skew;
                  gsap.to(proxy, {skew: 0, duration: 0.2, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew)});                 
                }                                       
             }       
        })

        return () => {               
            ScrollTrigger.clearScrollMemory();
            ScrollTrigger.disable(true,false);      
            tl.pause()        
        }
    },[]) 
    
    useEffect( () => {
        const setWrapperTransform = async () => {
            setTimeout( () => {
                document.getElementsByClassName("tl-wrapper")[0].style.removeProperty("transform")
                ScrollTrigger.refresh()
            },900)            
        }

        setWrapperTransform()
    })

    return (
    <>
        <div style={{
            display:"flex",
            alignItems:"center",
            paddingLeft:"20.5vw"
            }}
            ref={el => wrapperContainer = el} 
        >
            <div ref={el => wrapper = el}                     
                style={{
                    height:"60vh",
                    top:"30vh"                                     
                }}
            >                             
                <ul                      
                    style={{
                    display:"flex",                    
                    listStyle:"none",                    
                    height:"100%",
                    color:"ghostwhite"                    
                    }}
                >                    
                    {pageData.map( (project, index) => (
                        <li className={styles.li_item} ref={containerRef} >
                            <ScrollItem key={project.url} project={project} /> 
                            <div style={{position:"absolute", bottom:"18%", left:"-20%", display:"flex",pointerEvents:"none" }}>                               
                                <div style={{display:"flex",fontSize:"8vw"}}>                                                            
                                    { project.title.split("").map(letter => (
                                        <p className={`title${index}`}                                           
                                        >{letter.toUpperCase()}</p>))
                                    }                                                                           
                                </div>
                                
                                <div  className={styles.containerList} >          
                                    <div 
                                        className={`title${index}`} 
                                        style={{
                                        position: "fixed",
                                        flex: "1",
                                        top:"50%",
                                        left: "57vw",    
                                        visibility: "visible",
                                        opacity: "1",
                                        zIndex:"1",
                                        textAlign: "left",
                                        fontSize: "1.1vw" }}                                        
                                    > 
                                        <p className={styles2.infoBlockHead}>
                                            <span style={{display:"flex", alignItems:"center"}}>
                                                <Hash style={{marginRight:"4px"}}/>0{index}
                                            </span>
                                        </p>
                                        <ul>
                                            {project.info.map( element => (
                                                <li key={element} style={{marginBottom:"10px", overflow:"hidden", color:"#999"}} >
                                                    <span style={{display:"block"}}>{element}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>                                     
                                </div> 
                            </div>       
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <Cursor/>
    </>
    )
}

export default Index