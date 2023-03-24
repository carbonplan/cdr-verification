import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const ComponentContext = createContext({
  active: null,
  hovered: null,
  setActive: () => {},
  setHovered: () => {},
})

export const useComponent = (id) => {
  const { active, setActive, hovered, setHovered, pathway, pathways } =
    useContext(ComponentContext)
  const data = useMemo(
    () =>
      pathways
        .find((p) => p.pathway_id === pathway)
        .components.find((d) => d.number === id),
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

export const useComponentContext = () => {
  return useContext(ComponentContext)
}

export const ComponentProvider = ({
  pathways,
  pathway,
  onComponentChange,
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
      onComponentChange()
      setActive(...args)
    },
    [onComponentChange]
  )

  return (
    <ComponentContext.Provider
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
    </ComponentContext.Provider>
  )
}
