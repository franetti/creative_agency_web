import React, {useState, useContext, useEffect,useLayoutEffect} from "react"
import {CursorContext} from "../context/cursorContext"

const Cursor = () => {

    const {radio,animation,visibility} = useContext(CursorContext)    
    const [cursor, setCursor] = useState({x:null, y:null})
    
    useLayoutEffect( () => {
        const handlerCoordinates = (e) => {
            setCursor({
                x:e.clientX - 15,
                y:e.clientY - 15 
            })
        }

        window.addEventListener('mousemove', handlerCoordinates)
        return () => (
            window.removeEventListener('mousemove', handlerCoordinates)
        )   
    },[])

    return (     
        visibility ? 
        (    
            animation ?     
            (
                radio 
                ? (
                    <div style={{
                        borderRadius:"100%",      
                        border: "1px solid #ff4d00",   
                        opacity: "0.9",                
                        width:"60px",
                        height:"60px",
                        transform:"scale(3)",
                        position: "fixed",                
                        zIndex:"10",                        
                        pointerEvents:"none",
                        left:cursor.x + "px",
                        top:cursor.y + "px",  
                        transition:"transform 0.2s",                              
                    }}>
                    </div>
                )
                : (
                    <div style={{
                        borderRadius:"100%",
                        border: "3px solid #ff4d00",  
                        opacity: "0.9",                
                        width:"30px",
                        height:"30px",
                        position: "fixed", 
                        transform:"scale(1)",
                        zIndex:"10",
                        pointerEvents:"none",
                        left:cursor.x + "px",
                        top:cursor.y + "px",  
                        transition:"transform 0.4s"                               
                    }}>
                    </div>
                )  
            )
            : (
                <div
                    style={{
                        borderRadius:"100%",  
                        width: "50px",
                        height: "50px",
                        transformOrigin: "center",
                        position: "fixed", 
                        left:cursor.x -5 + "px",
                        top:cursor.y -5+ "px",
                        backgroundColor: "#ff4d00", 
                        pointerEvents:"none",
                        //cursor:"pointer",
                        transition:"width 0.25s ease-in-out, height 0.25s ease-in-out",
                        zIndex:"10",
                        backgroundBlendMode:'darken'
                    }}
                ></div>
            )             
        )
        : (
            <div
                style={{
                    width:"0",
                    height:"0",                
                    transformOrigin:"center"
                }}
            ></div>
        )             
    );
}
 
export default Cursor;