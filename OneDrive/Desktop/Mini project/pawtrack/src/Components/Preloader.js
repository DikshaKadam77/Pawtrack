// Components/Preloader.js
"use client"

import { useEffect, useState } from "react"

const Preloader = () => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Keep preloader for 2.5 seconds
    const timer = setTimeout(() => setShow(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-purple-900 z-50">
      <div className="w-20 h-20 border-4 border-t-purple-400 border-purple-200 rounded-full animate-spin"></div>
      <p className="mt-4 text-purple-200 font-semibold text-lg">Loading...</p>
    </div>
  )
}

export default Preloader
