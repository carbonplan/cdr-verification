import { useRouter } from 'next/router'
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
  const { archival, active, setActive, hovered, setHovered, pathway } =
    useContext(ComponentContext)
  const data = useMemo(
    () => pathway.components.find((d) => d.component_id === component_id),
    [component_id, pathway]
  )
  const router = useRouter()

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
    onClick: (e) => {
      e.stopPropagation()

      if ((e.metaKey || e.ctrlKey) && !archival) {
        router.push(
          `/research/cdr-verification/docs/components/${component_id}`
        )
        return
      }

      setActive((prev) => (prev === component_id ? null : component_id))
    },
    setHovered: (val) => setHovered(val ? component_id : null),
  }
}

export const useComponentContext = () => {
  return useContext(ComponentContext)
}

export const ComponentProvider = ({
  archival,
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
        archival,
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
