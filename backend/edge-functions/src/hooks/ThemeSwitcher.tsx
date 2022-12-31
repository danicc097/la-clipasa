import { useState, useEffect } from 'react'
import { Checkbox } from 'semantic-ui-react'

const ThemeSwitcher = () => {
  const [inverted, setInverted] = useState<boolean>(false)

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('*'))
    elements.forEach((element) => {
      if (inverted) {
        element.classList.add('inverted')
      } else {
        element.classList.remove('inverted')
      }
    })
  }, [inverted])

  return (
    <div
      style={{
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <i className="sun icon"></i>
      <Checkbox
        toggle
        onChange={() => {
          setInverted(!inverted)
        }}
      />
      <i className="moon icon"></i>
    </div>
  )
}

export default ThemeSwitcher
