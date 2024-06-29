import React from 'react'
import { Link } from 'react-router-dom'

const Span = (props) => {
  return (
    <div className='span'>
        <span class="span-text">{props.text}</span>
        <Link to={props.linkTo}><span class="span-link">{props.link}</span></Link>
    </div>
  )
}

export default Span