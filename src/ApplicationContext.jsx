
import { createContext, useContext, useEffect, useState } from 'react'

export const ApplicationContext = createContext(undefined)

export const ApplicationContextProvider = ({ children }): JSX.Element => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)

  const values = {
    token,
    setToken,
    error,
    setError,
    page,
    setPage
  }

  return (
    <ApplicationContext.Provider value={values}>
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext)
  if (context === undefined) {
    throw new Error('useApplicationContext must be within an ApplicationContextProvider')
  }

  return context
}
