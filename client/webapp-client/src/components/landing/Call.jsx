import React, { useCallback, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useUserData } from "../../context/CurrentUserProvider";
import { useRemoteSocket } from "../../context/RemoteSocketProvider";
import { useRtc } from "../../context/RtcConnectionProvider";
import { useSocket } from "../../context/SocketProvider";
import peer from "../../service/peer";

const Call = () => {
  const [email, setEmail] = useState("");
  const [calling, setCalling] = useState(false);
  const [requestedRoom, setRequestedRoom] = useState(null);
  const [callFrom, setCallFrom] = useState(null);
  const [remoteOffer, setRemoteOffer] = useState(null);
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();
  const { user } = useUserData();
  const { setRtcConn } = useRtc();
  const { setRemoteSocketId } = useRemoteSocket();

  const remoteSocketIdRef = useRef(null);
  const remoteOfferRef = useRef(null);
  const callingRef = useRef(false);
  const requestedRoomRef = useRef(null);
  const callFromRef = useRef(null);

  const requestCall = useCallback(
    async (e) => {
      e.preventDefault();
      const currentRoom = Math.floor(Math.random() * 1000); // Generate a new room
      const offer = await peer.getOffer();
      setRoom(currentRoom);
      socket.emit("join:request", {
        email,
        room: currentRoom,
        from: user?.currentEmail,
        offer,
      });
    },
    [email, socket, user]
  );

  const handleJoinAccepted = useCallback(
    ({ ans, room, from }) => {
      peer.setLocalDescription(ans);
      setRtcConn(peer);
      setRemoteSocketId(from);
      navigate(`/room/${room}`);
    },
    [navigate, setRtcConn]
  );

  const handleJoinRequest = useCallback(
    ({ from, requestedRoom, offer, remoteSocket }) => {
      console.log("----------", callingRef.current);
      if (!callingRef.current) {
        remoteSocketIdRef.current = remoteSocket;
        remoteOfferRef.current = offer;
        callingRef.current = true;
        requestedRoomRef.current = requestedRoom;
        callFromRef.current = from;

        setRemoteOffer(offer);
        setCalling(true);
        setRequestedRoom(requestedRoom);
        setRemoteSocketId(remoteSocket);
        setCallFrom(from);
      } else {
        socket.emit("join:busy", { to: remoteSocket }); // Notify the caller if the user is busy
      }
    },
    [socket]
  );

  useEffect(() => {
    socket.on("join:requested", handleJoinRequest);
    socket.on("join:accepted", handleJoinAccepted);

    return () => {
      socket.off("join:requested", handleJoinRequest);
      socket.off("join:accepted", handleJoinAccepted);
    };
  }, [socket, handleJoinRequest, handleJoinAccepted]);

  const handleCallAccepted = useCallback(async () => {
    const ans = await peer.answerCall(remoteOfferRef.current);
    socket.emit("join:accept", { to: remoteSocketIdRef.current, ans });
    setRtcConn(peer);
    navigate(`/room/${requestedRoomRef.current}`);
  }, [navigate, setRtcConn, socket]);

  // const handleNegotiationIncoming = useCallback(
  //   async ({ from, offer }) => {
  //     try {
  //       console.log("Negotiation incoming", offer);
  //       const answer = await peer.answerCall(offer);
  //       socket.emit("peer:nego:done", { to: from, ans: answer });
  //     } catch (error) {
  //       console.error("Error during negotiation:", error);
  //     }
  //   },
  //   [peer, socket]
  // );

  // const handleNegotiationFinal = useCallback(
  //   async ({ ans }) => {
  //     try {
  //       await peer.setLocalDescription(ans);
  //     } catch (error) {
  //       console.error("Error setting local description:", error);
  //     }
  //   },
  //   [peer]
  // );

  // const handleNegotiationNeeded = useCallback(async () => {
  //   if (!remoteSocketIdRef.current) return;
  //   try {
  //     const offer = await peer.getOffer();
  //     socket.emit("peer:nego:needed", {
  //       offer,
  //       to: remoteSocketIdRef.current,
  //     });
  //   } catch (error) {
  //     console.error("Error creating offer:", error);
  //   }
  // }, [peer, remoteSocketIdRef.current, socket]);
  // useEffect(() => {
  //   peer.peer.addEventListener("negotiationneeded", handleNegotiationNeeded);
  //   return () => {
  //     peer.peer.removeEventListener(
  //       "negotiationneeded",
  //       handleNegotiationNeeded
  //     );
  //   };
  // }, [peer, handleNegotiationNeeded]);

  // useEffect(() => {
  //   socket.on("peer:nego:needed", handleNegotiationIncoming);
  //   socket.on("peer:nego:final", handleNegotiationFinal);

  //   return () => {
  //     socket.off("peer:nego:needed", handleNegotiationIncoming);
  //     socket.off("peer:nego:final", handleNegotiationFinal);
  //   };
  // }, [socket, handleNegotiationIncoming, handleNegotiationFinal]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200 p-4">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-snug drop-shadow-md">
          Secure Video Conferencing
        </h1>
        <p className="text-lg text-gray-700 mt-4 drop-shadow-sm">
          Let&apos;s connect and collaborate with ease
        </p>
      </div>

      {user?.currentEmail && !calling && (
        <form
          onSubmit={requestCall}
          className="w-full max-w-lg bg-white p-10 shadow-2xl rounded-xl transform transition duration-300 hover:scale-105"
        >
          <div className="mb-8">
            <label
              htmlFor="toEmail"
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              Enter Email to Call
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <input
                id="toEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 outline-none w-full text-gray-700 focus:ring-0"
                placeholder="example@example.com"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 shadow-lg transition-all duration-300"
          >
            Connect
          </button>
        </form>
      )}

      {calling && (
        <div className="w-full max-w-lg bg-white p-10 shadow-2xl rounded-xl transform transition duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Incoming Call
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Incoming call from <span className="font-semibold">{callFrom}</span>
            ...
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleCallAccepted}
              className="w-1/2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 shadow-lg transition-all duration-300"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Call;
