import React, {useEffect, useRef,useContext,useLayoutEffect} from "react"
import PropTypes from "prop-types"
import * as styles from "./layout.module.css"
import Helmet from 'react-helmet' //para head
import Header from "./header"
import Footer from "./footer"
import gsap from "gsap"



const Layout = ({children }) => {  
    
  const cleanLS = () => {
      localStorage.removeItem('firstLoading');
      localStorage.removeItem('firstNav');      
  }

  useEffect(() => {  
    window.scrollTo(0,0)
    window.addEventListener("beforeunload", cleanLS);
    return () => {      
      window.removeEventListener("beforeunload", cleanLS);
    }      
  },[])
  

  return (   
    <div style={{backgroundColor:"#f5f5f5"}} >
      <Helmet>
        <title>Creative Agency</title>
        {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap" rel="preload" as="font" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&display=swap" rel="preload" as="font" crossorigin></link> */}
      </Helmet>               
      <Header siteTitle={ `Title`}/>        
      <main style={{fontFamily:"NHaasGrotesk"}}>       
        {children}
      </main>
      <Footer/>                        
    </div>       
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
