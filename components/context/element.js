import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const ElementContext = createContext({
  active: null,
  hovered: null,
  setActive: () => {},
  setHovered: () => {},
})

export const useElement = (id) => {
  const { active, setActive, hovered, setHovered, pathway, pathways } =
    useContext(ElementContext)
  const data = useMemo(
    () =>
      pathways
        .find((p) => p.pathway_id === pathway)
        .elements.find((d) => d.number === id),
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

export const ElementProvider = ({
  pathways,
  pathway,
  onElementChange,
  children,
}) => {
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    setActive(null)
    setHovered(null)
  }, [pathway])

  const handleActiveChange = useCallback(
    (...args) => {
      onElementChange()
      setActive(...args)
    },
    [onElementChange]
  )

  return (
    <ElementContext.Provider
      value={{
        pathways,
        pathway,
        active,
        setActive: handleActiveChange,
        hovered,
        setHovered,
      }}
    >
      {children}
    </ElementContext.Provider>
  )
}
