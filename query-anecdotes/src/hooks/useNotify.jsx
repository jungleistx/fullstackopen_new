import { useContext } from "react";
import NotifyContext from "../components/NotifyContext";


const useNotify = () => useContext(NotifyContext)

export default useNotify
