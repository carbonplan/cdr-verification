import { createContext, useContext, useState } from 'react'

const ElementContext = createContext({
  active: null,
  setActive: () => {},
})

export const useElement = (id) => {
  const { active, setActive } = useContext(ElementContext)

  return {
    active: active === id,
    setActive: () => setActive((prev) => (prev === id ? null : id)),
  }
}

export const ElementProvider = ({ children }) => {
  const [active, setActive] = useState(null)

  return (
    <ElementContext.Provider value={{ active, setActive }}>
      {children}
    </ElementContext.Provider>
  )
}
