import { createContext, useContext, useState } from 'react'

const ElementContext = createContext({
  active: null,
  hovered: null,
  setActive: () => {},
  setHovered: () => {},
})

export const useElement = (id) => {
  const { active, setActive, hovered, setHovered } = useContext(ElementContext)

  let status = 'default'
  if (id && hovered === id) {
    status = 'hovered'
  } else if (id && active === id) {
    status = 'active'
  } else if (active) {
    status = 'inactive'
  }

  return {
    status,
    active: active === id,
    hovered: hovered === id,
    setActive: () => setActive((prev) => (prev === id ? null : id)),
    setHovered: (val) => setHovered(val ? id : null),
  }
}

export const useElementContext = () => {
  return useContext(ElementContext)
}

export const ElementProvider = ({ children }) => {
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)

  return (
    <ElementContext.Provider value={{ active, setActive, hovered, setHovered }}>
      {children}
    </ElementContext.Provider>
  )
}
