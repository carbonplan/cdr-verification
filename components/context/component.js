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

export const useComponent = (component_id) => {
  const { active, setActive, hovered, setHovered, pathway, pathways } =
    useContext(ComponentContext)
  const data = useMemo(
    () =>
      pathways
        .find((p) => p.pathway_id === pathway)
        .components.find((d) => d.component_id === component_id),
    [component_id, pathway]
  )

  let status = 'default'
  if (component_id && hovered === component_id) {
    status = 'hovered'
  } else if (component_id && active === component_id) {
    status = 'active'
  } else if (active) {
    status = 'inactive'
  }

  return {
    status,
    data,
    active: active === component_id,
    hovered: hovered === component_id,
    setActive: () =>
      setActive((prev) => (prev === component_id ? null : component_id)),
    setHovered: (val) => setHovered(val ? component_id : null),
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
