import React, { useCallback, useEffect, useState } from "react";

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

  // ####################################################################################################################

  const handleNegotiationNeeded = useCallback(async () => {
    console.log("--------------NEGO-NEEDED");
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId]);

  const handleIceCandidate = useCallback(
    async (event) => {
      console.log("ICE-CANDIDATE--------------");
      if (event.candidate) {
        console.log("ICE-REQUESTED-------------");
        // signalingChannel.send({ "new-ice-candidate": event.candidate });
        socket.emit("new:ice-candidate", {
          candidate: event.candidate,
          to: remoteSocketId,
        });
      }
    },
    [remoteSocketId]
  );
  useEffect(() => {
    if (peer?.peer?.currentLocalDescription?.type == "offer") {
      peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
    }

    return () => {
      peer.peer.removeEventListener(
        "negotiationneeded",
        handleNegotiationNeeded
      );
    };
  }, []);

  // ####################################################################################################################

  const handleNegotiationIncoming = useCallback(
    async ({ from, offer }) => {
      try {
        console.log("-------------------------NEGO-RECEIVED");
        const answer = await peer.answerCall(offer);
        socket.emit("peer:nego:done", { to: from, ans: answer });
      } catch (error) {
        console.error("Error during negotiation:", error);
      }
    },
    [peer, socket]
  );
  const handleNegotiationFinal = useCallback(async ({ ans }) => {
    try {
      console.log("------------NEGOTIATION-FINAL");
      await peer.setLocalDescription(ans);
    } catch (error) {
      console.error("Error setting local description:", error);
    }
  }, []);

  useEffect(() => {
    socket.on("peer:nego:needed", handleNegotiationIncoming);
    socket.on("peer:nego:final", handleNegotiationFinal);
    socket.on("new:ice-candidate", handlenewIceCandidate);

    return () => {
      socket.off("peer:nego:needed", handleNegotiationIncoming);
      socket.off("peer:nego:final", handleNegotiationFinal);
    };
  }, [socket, handleNegotiationIncoming, handleNegotiationFinal]);

  // ####################################################################################################################

  const initializeMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { max: 24 },
        },
      });
      setMyStream(stream);

      stream.getTracks().forEach((track) => {
        peer.peer.addTrack(track, stream);
        if (track.kind === "video") {
          peer.setBandwidthConstraints(track);
        }
      });
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }, [peer]);

  useEffect(() => {
    initializeMediaStream();
  }, [initializeMediaStream, myStream]);

  // ####################################################################################################################
  const handlenewIceCandidate = useCallback(async ({ candidate }) => {
    try {
      await peer.peer.addIceCandidate(candidate);
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  }, []);

  const handleTracks = useCallback(async (ev) => {
    const remoteStream = ev.streams;
    console.log("GOT TRACKS!!");
    setRemoteStream(remoteStream[0]);
  }, []);
  useEffect(() => {
    peer.peer.addEventListener("track", handleTracks);

    peer.peer.addEventListener("icecandidate", handleIceCandidate);

    return () => {
      peer.peer.removeEventListener("track", handleTracks);
      peer.peer.removeEventListener("icecandidate", handleIceCandidate);
    };
  }, []);

  // ####################################################################################################################

  useEffect(() => {
    const handleConnectionStateChange = () => {
      if (peer.peer.connectionState === "connected") {
        peer.setupQualityMonitoring();
      }
    };

    if (peer?.peer) {
      peer.peer.addEventListener(
        "connectionstatechange",
        handleConnectionStateChange
      );
      return () => {
        peer.peer.removeEventListener(
          "connectionstatechange",
          handleConnectionStateChange
        );
      };
    }
  }, [peer]);

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
                width="50%"
                height="50%"
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
                width="50%"
                height="50%"
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
