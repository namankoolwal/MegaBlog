import React from 'react'
import megablog from '../assets/megablog.png'

function Logo({width = '50px'}) {
  return (
    <div className={`md:w-${width}`}>
      <h3 className='hidden md:inline font-semibold md:font-bold text-sm md:text-base'>MegaBlog</h3>
      <h3 className='md:hidden font-bold text-sm'>MB</h3>
      {/* <img src={megablog} alt="" srcset="" width="10"/> */}
    </div>
  )
}

export default Logo
