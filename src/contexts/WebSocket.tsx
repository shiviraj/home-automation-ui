import {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {AUTH, BFF_URL} from "../config/constant";
import {formatMessage} from "./utils";

export enum WSEvent {
  UPDATE_STATE = "UPDATE_STATE",
  ERROR = "ERROR"
}

export type WSData = {
  event: WSEvent,
  data: Record<string, any>
}

type WebSocketContextInterface = {
  send: (payload: WSData) => void,
  data: WSData | null,
  readyState: boolean
}

const WebSocketContext = createContext(null as WebSocketContextInterface | null);

const funRef = (_payload: WSData): void => {
}

const retryCount = 3
const retryInterval = 3000

const url = `${BFF_URL.replace('http', 'ws')}/websockets`
// TODO removed default value of token
const token = typeof window !== "undefined" ? sessionStorage.getItem(AUTH) || "token" : "token"

export const WebSocketProvider = ({children}: PropsWithChildren) => {
  const [data, setData] = useState(null as WSData | null)
  const [send, setSend] = useState(() => funRef)
  const [retry, setRetry] = useState(retryCount)
  const [readyState, setReadyState] = useState(false)

  useEffect(() => {
    if (!readyState && token) {
      const ws = new WebSocket(`${url}?client=web&token=${token}`)
      ws.onopen = () => {
        setReadyState(true)
        setSend(() => (payload: WSData) => ws.send(JSON.stringify(payload)))
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

  return <WebSocketContext.Provider value={{send, data, readyState}}>
    {children}
  </WebSocketContext.Provider>;
};

export const useWebSocket = () => useContext(WebSocketContext)!;
