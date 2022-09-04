import React,{useRef,useContext} from "react"
import gsap from 'gsap'
import * as  styles from './projectItem.module.css'
import {Hash} from 'react-feather'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {CursorContext} from "../context/cursorContext"


const Title = styled.h1`
    font-family: "Space Grotesk", sans-serif;
    font-size: ${ (props) => (props.fontSize)};
    font-weight: 300;
    text-transform:lowercase;
    z-index: 1;
    line-height: 1.1;  
    text-transform: uppercase;
    cursor:pointer;
    ${(props) => props.animate ? 
        ( "position:absolute; z-index:3; color:black;top:0; clip-path:inset( 0 100% 0 0);" ) 
        :
        ("-webkit-text-stroke: 1px rgba(0,0,0,0.50); color:transparent ")
    }
`

const ProjectItem = ({project, itemIndex}) => {
    
    const {radio, setRadio} = useContext(CursorContext)

    let listItem = useRef(null) 
    let imgItem = useRef(null) 
    let revealTitle = useRef(null) 
    let revealInfo = useRef(null) 
    
    const {url,title, info} = project;

    const parallax = (e) => {
        const tl = gsap.timeline();   
        const x =( window.innerWidth - e.pageX * 5) /100
        const y = (window.innerWidth - e.pageY * 5) /100
        
        tl.to(imgItem.current, {                       
            x:`${x}`,
            y:`${y}`,                       
            ease:"power2.out"
        });
    }

    const handleMouseEnter = () => { 
        setRadio(true)         
        const rotate = Math.random() * (10 - (-10)) + (-10); // random degrees to rotate image    

        const tl = gsap.timeline();
        tl.to(imgItem.current, {            
            opacity:1,                                           
            scaleX:1,                      
            scaleY:1,                        
            transform:`rotate(${rotate}deg)`,             
            ease:"power2.inOut"
        },"sameTime")
        .to(revealTitle.current,{
            duration:0.5,
            clipPath:"inset(0 0% 0 0)", 
            ease:"power3.inOut"           
        },"sameTime")
        .to(revealInfo.current,{
            visibility: "visible",  
            opacity:"1"
        },"sameTime")
        .from(revealInfo.current,{
            y:20,           
            duration:0.5
        },"sameTime")
 
        listItem.current.addEventListener('mousemove',parallax)
    }
   
    const handleMouseLeave = () => {
        setRadio(false)         
        listItem.current.removeEventListener('mousemove',parallax) 

        const tl = gsap.timeline();
        tl.to(imgItem.current, {            
            opacity:0,              
            scaleX:0.7,                      
            scaleY:0.7,    
            duration:0.7,        
            ease:"power2.out"
        },"sameTime")
        .to(revealTitle.current,{
            duration:0.5,
            clipPath:"inset(0 100% 0 0)",
            ease:"power3.out"           
        },"sameTime")
        .to(revealInfo.current,{
            visibility:"hidden",
            opacity:"0"
        },"sameTime")
    }   

    return (  
        <li 
            className={styles.projectItemContainer}                     
            ref={listItem}                                    
        >
            <div 
                className={styles.titleItem}                
                onMouseEnter={handleMouseEnter}                
                onMouseLeave={handleMouseLeave}                                                                  
            >
                <Title 
                    css={css`
                        font-size: 8.5vw;
                        @media (max-width: 800px) {
                            font-size: 13vw;
                        }`}
                >{title}</Title>
                <Title 
                    css={css`
                        font-size: 8.5vw;
                        @media (max-width: 800px) {
                            font-size: 13vw;
                    }`}
                    ref={revealTitle} 
                    animate={true}
                >{title}</Title>
            </div>            
            <img 
                className={styles.menuImg}                 
                src={url}  
                ref={imgItem}  
                alt=""         
            />                    
            <div className={styles.infoBlock} ref={revealInfo} >
                <p className={styles.infoBlockHead}>
                    <span style={{display:"flex", alignItems:"center", color:"black"}}>
                        <Hash style={{marginRight:"4px", color:"black"}}/>0{itemIndex}
                    </span>
                </p>
                {info.map( element => (
                    <p key={element} style={{marginBottom:"10px", overflow:"hidden", color:"#999"}} >
                        <span style={{display:"block"}}>{element}</span>
                    </p>
                ))}
            </div>
        </li>
    );
}
 
export default ProjectItem;