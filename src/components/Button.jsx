import React from 'react'

const Button = ({
    children,
    type = "button",
    bgColor = "",
    textColor = "",
    className = "",
    ...props
}) => {
  return (
    <button type={type} className={`${className} ${bgColor} ${textColor} `} {...props}> 
        {children}
    </button>
  )
}

export default Button