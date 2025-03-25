import {useState, useEffect} from 'react'

const useDropDown = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropDown = e => {
    e.stopPropagation()
    setIsOpen(prev => !prev)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    isOpen
      ? document.addEventListener('click', closeDropdown)
      : document.removeEventListener('click', closeDropdown)

    return () => {
      document.removeEventListener('click', closeDropdown)
    }
  }, [isOpen])

  return {isOpen, closeDropdown, toggleDropDown}
}

export default useDropDown
