import React from 'react'
import HeroHome from './HeroHome'
import { MarqueeStrip } from './MarqueeStrip'
import Awards from './Awards'
import Stats from './Stats'
import Pricing from './Pricing'
import Education from './Education'
import OpenAccount from '../OpenAccount'

function HomePage() {
  return (
    <>
    <HeroHome/>
    <MarqueeStrip/>
    <Awards/>
    <Stats/>
    <Pricing/>
    <Education/>
    <OpenAccount/>
    </>
  )
}

export default HomePage