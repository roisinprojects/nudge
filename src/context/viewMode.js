import { createContext, useContext } from 'react'

export const ViewModeContext = createContext('mobile')
export const useViewMode = () => useContext(ViewModeContext)
