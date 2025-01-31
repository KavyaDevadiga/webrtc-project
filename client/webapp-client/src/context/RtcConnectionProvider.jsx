import React, { createContext, useContext, useState } from "react";

const RtcConnContext = createContext(null);

export const useRtc = () => {
  const rtc = useContext(RtcConnContext);
  return rtc;
};

export const RtcConnProvider = (props) => {
  const [rtcConn, setRtcConn] = useState(null);
  return (
    <RtcConnContext.Provider value={{ rtcConn, setRtcConn }}>
      {props.children}
    </RtcConnContext.Provider>
  );
};
