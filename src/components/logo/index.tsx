import React from 'react'

export const Logo: React.FC = () => {
  return (
    <>
      <div className="select-none hidden dark:block">
        <img
          src="/icons/gg-single.png"
          alt="Shadowy Super Coder"
          width="50"
          height="50"
        />
      </div>
      <div className="select-none dark:hidden">
        <img
          src="/icons/gg-single.png"
          alt="Shadowy Super Coder"
          width="50"
          height="50"
        />
      </div>
    </>
  )
}
