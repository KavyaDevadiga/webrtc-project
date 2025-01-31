import React, { useCallback, useEffect, useRef, useState } from "react";

import ReactPlayer from "react-player";
import { useRemoteSocket } from "../../context/RemoteSocketProvider";
import { useRtc } from "../../context/RtcConnectionProvider";
import { useSocket } from "../../context/SocketProvider";

const Room = () => {
  const socket = useSocket();
  const { rtcConn: peer } = useRtc();
  const { remoteSocketId } = useRemoteSocket();
  // const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const myStreamRef = useRef(null);

  // Initialize local media stream
  const initializeMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      myStreamRef.current = stream;

      myStream.getTracks().forEach((track) => {
        peer.peer.addTrack(track, stream);
      });
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }, [myStream, peer]);

  // Handle incoming negotiation offer
  const handleNegotiationIncoming = useCallback(
    async ({ from, offer }) => {
      try {
        const answer = await peer.answerCall(offer);
        socket.emit("peer:nego:done", { to: from, ans: answer });
      } catch (error) {
        console.error("Error during negotiation:", error);
      }
    },
    [peer, socket]
  );

  // Handle negotiation finalization
  const handleNegotiationFinal = useCallback(
    async ({ ans }) => {
      try {
        await peer.setLocalDescription(ans);
      } catch (error) {
        console.error("Error setting local description:", error);
      }
    },
    [peer]
  );

  // Trigger negotiation when needed
  const handleNegotiationNeeded = useCallback(async () => {
    console.log("remoteSocket--------------", remoteSocketId);
    if (!remoteSocketId) return;
    try {
      const offer = await peer.getOffer();
      socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  }, [peer, remoteSocketId, socket]);

  // Handle track events for remote stream
  useEffect(() => {
    const handleTrackEvent = (event) => {
      setRemoteStream(event.streams[0]);
    };

    peer.peer.addEventListener("track", handleTrackEvent);
    return () => {
      peer.peer.removeEventListener("track", handleTrackEvent);
    };
  }, [peer]);

  // Attach negotiationneeded event listener
  useEffect(() => {
    console.log("--------------", peer);
    peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
    return () => {
      peer.peer.removeEventListener(
        "negotiationneeded",
        handleNegotiationNeeded
      );
    };
  }, [handleNegotiationNeeded, peer]);

  // Set up socket event listeners
  useEffect(() => {
    socket.on("peer:nego:needed", handleNegotiationIncoming);
    socket.on("peer:nego:final", handleNegotiationFinal);

    return () => {
      socket.off("peer:nego:needed", handleNegotiationIncoming);
      socket.off("peer:nego:final", handleNegotiationFinal);
    };
  }, [socket, handleNegotiationIncoming, handleNegotiationFinal]);

  // Initialize media stream on component mount
  useEffect(() => {
    initializeMediaStream();
  }, [initializeMediaStream]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 text-gray-800">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-5xl font-extrabold text-blue-700 text-center mb-6">
          Room Page
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {myStream && (
            <div className="bg-gray-50 shadow-inner rounded-lg p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                My Stream
              </h2>
              <ReactPlayer
                playing
                muted
                url={myStream}
                width="100%"
                height="100%"
                className="rounded-lg"
              />
            </div>
          )}
          {remoteStream && (
            <div className="bg-gray-50 shadow-inner rounded-lg p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Remote Stream
              </h2>
              <ReactPlayer
                playing
                url={remoteStream}
                width="100%"
                height="100%"
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
