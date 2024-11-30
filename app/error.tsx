"use client";

import React from 'react'

const GlobalError = ({error} : {error: Error}) => {
  return (
    <div>{error.message}</div>
  )
}

export default GlobalError