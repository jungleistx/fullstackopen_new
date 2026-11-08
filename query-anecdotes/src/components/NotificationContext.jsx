import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext()

export default NotificationContext


export const NotificationContextProvider = (props) => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!message) return

    const id = setTimeout(() => setMessage(''), 5000)
    return () => clearTimeout(id)
  }, [message])

  return (
    <NotificationContext.Provider value={{ message, notify: setMessage }}>
      {props.children}
    </NotificationContext.Provider>
  )
}