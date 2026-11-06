import { createContext, useEffect, useState } from "react";

const NotifyContext = createContext()

export default NotifyContext


export const NotifyContextProvider = (props) => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!message) return

    const id = setTimeout(() => setMessage(''), 5000)
    return () => clearTimeout(id)
  }, [message])

  return (
    <NotifyContext.Provider value={{ message, notify: setMessage }}>
      {props.children}
    </NotifyContext.Provider>
  )
}