import React, {useState, useEffect, useCallback, useMemo} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
// import './NavigationBar.css'
import {Link} from 'react-router-dom'
import Slideshow from '../components/slider/slider'

function HomePage() {
  return (
	  <div>
        <Slideshow/>
    </div>
  )
}

export default HomePage