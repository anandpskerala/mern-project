import React from 'react'

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="relative w-24 h-24">
        {/* Glowing ring */}
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-transparent border-blue-500 shadow-xl"></div>
        {/* Core pulse */}
        <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md animate-pulse"></div>
        {/* Inner circle */}
        <div className="absolute inset-8 bg-black rounded-full"></div>
      </div>
    </div>
  )
}
