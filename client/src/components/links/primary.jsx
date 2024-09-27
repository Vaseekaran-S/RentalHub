import React from 'react'
import { Link } from 'react-router-dom'

function PrimaryLink({ link, text, customCss }) {
  return (
    <>
      <Link to={link} className={`px-3 py-1 rounded border bg-green-700 font-medium text-white ${customCss}`}>{text}</Link>
    </>
  )
}

export default PrimaryLink
