import React from 'react'

export const Logo: React.FC = () => {
  return (
    <>
      <div className="select-none hidden dark:block">
        <img
          src="/icons/logo.png"
          alt="Aurory"
          width="50"
          height="50"
        />
      </div>
      <div className="select-none dark:hidden">
        <img
          src="/icons/logo.png"
          alt="Aurory"
          width="50"
          height="50"
        />
      </div>
    </>
  )
}
