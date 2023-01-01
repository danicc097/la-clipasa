import { useState, useEffect, useRef } from 'react'

// https://stackoverflow.com/questions/54560790/detect-click-outside-react-component-using-hooks
export default function useOnClickOutside() {
  const [isComponentVisible, setIsComponentVisible] = useState(false)
  const ref = useRef<any>(null)

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsComponentVisible(false)
    }
  }

  // FIXME ref.current.contains not a function
  const handleClickOutside = (event: Event) => {
    if (ref?.current?.contains && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true)
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true)
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref, isComponentVisible, setIsComponentVisible }
}
