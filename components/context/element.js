import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import pathways from '../../data/pathways.json'

const ElementContext = createContext({
  active: null,
  hovered: null,
  setActive: () => {},
  setHovered: () => {},
})

export const useElement = (id) => {
  const { active, setActive, hovered, setHovered, pathway } =
    useContext(ElementContext)
  const data = useMemo(
    () =>
      pathways
        .find((p) => p.pathway_name === pathway)
        .elements.find((d) => d.element === id),
    [id, pathway]
  )

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
    data,
    active: active === id,
    hovered: hovered === id,
    setActive: () => setActive((prev) => (prev === id ? null : id)),
    setHovered: (val) => setHovered(val ? id : null),
  }
}

export const useElementContext = () => {
  return useContext(ElementContext)
}

export const ElementProvider = ({ pathway, children }) => {
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    setActive(null)
    setHovered(null)
  }, [pathway])

  return (
    <ElementContext.Provider
      value={{ pathway, active, setActive, hovered, setHovered }}
    >
      {children}
    </ElementContext.Provider>
  )
}
