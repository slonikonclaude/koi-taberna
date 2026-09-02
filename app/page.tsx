import { About } from '@/components/sections/About'
import { Amenities } from '@/components/sections/Amenities'
import { Gallery } from '@/components/sections/Gallery'
import { Hero } from '@/components/sections/Hero'
import { Popular } from '@/components/sections/Popular'
import { ReserveCta } from '@/components/sections/ReserveCta'
import { Reviews } from '@/components/sections/Reviews'
import { Visit } from '@/components/sections/Visit'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Popular />
      <Amenities />
      <Reviews />
      <Gallery />
      <Visit />
      <ReserveCta />
    </>
  )
}
