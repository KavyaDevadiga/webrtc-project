import React, { createContext, useContext, useState } from "react";

const RemotSocketContext = createContext(null);

export const useRemoteSocket = () => {
  const rtc = useContext(RemotSocketContext);
  return rtc;
};

export const RemoteSocketProvider = (props) => {
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  return (
    <RemotSocketContext.Provider value={{ remoteSocketId, setRemoteSocketId }}>
      {props.children}
    </RemotSocketContext.Provider>
  );
};
