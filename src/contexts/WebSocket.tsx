import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {AUTH} from "../config/constant";
import {formatMessage} from "./utils";

export enum WSEvent {
  UPDATE_STATE = "UPDATE_STATE",
  ERROR = "ERROR"
}

export type WSData = {
  event: WSEvent,
  data: Record<string, any>
}

type WebSocketContextInterface = { data: WSData | null, }

const WebSocketContext = createContext(null as WebSocketContextInterface | null);

const retryCount = 3
const retryInterval = 3000

const url = typeof window !== "undefined" ? `${window.location.href.replace('http', 'ws')}websockets` : ""
const token = typeof window !== "undefined" ? sessionStorage.getItem(AUTH) : "token"

export const WebSocketProvider = ({children}: PropsWithChildren) => {
  const [data, setData] = useState(null as WSData | null)
  const [retry, setRetry] = useState(retryCount)
  const [readyState, setReadyState] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && !readyState && token) {
      const ws = new WebSocket(`${url}?client=web&token=${token}`)
      ws.onopen = () => {
        setReadyState(true)
        ws.onmessage = (event) => setData(formatMessage(event.data))
        setRetry(retryCount)
      }

      ws.onclose = () => {
        setReadyState(false)
        if (retry > 0) {
          setTimeout(() => setRetry(retry - 1), retryInterval)
        } else {
          setTimeout(() => setRetry(retryCount), retryInterval * 20)
        }
      }
    }
  }, [retry])

  return <WebSocketContext.Provider value={{data}}>
    {children}
  </WebSocketContext.Provider>;
};

export const useWebSocket = () => useContext(WebSocketContext)!;
