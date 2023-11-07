import React from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Card from '../courses/Card'

import Hero from '../Hero/Hero'
import NavBar from '../NavBar/NavBar'

function HomePage() {
  const [searchParams] = useSearchParams();
  const sId = parseInt(searchParams.get("sId"));
  

  return (
    <>
    <NavBar/>
    <Hero/>
    <Card sid={sId}/>
    </>
  )
}

export default HomePage