import React from 'react'

function PrimaryButton({ text, children, customCss, ...props }) {
  return (
        <button className={`px-3 py-2 rounded border w-full font-medium bg-green-700 hover:bg-green-800 text-white ${customCss}`} {...props}>{ children || text}</button>
  )
}

export default PrimaryButton
