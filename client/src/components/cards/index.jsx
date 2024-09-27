import React from 'react'

function PrimaryCard({ customCss, children }) {
  return (
    <div className={`border rounded p-4 ${customCss}`}>
      {children}
    </div>
  )
}

export default PrimaryCard
