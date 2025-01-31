import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import { UserProvider, useUserData } from "./context/CurrentUserProvider";

import Call from "./components/landing/Call";
import Landing from "./components/landing/Landing";
import Room from "./components/landing/Room";
import { RemoteSocketProvider } from "./context/RemoteSocketProvider";
import { RtcConnProvider } from "./context/RtcConnectionProvider";
import { SocketProvider } from "./context/SocketProvider";

function App() {
  const RequireAuth = ({ children }) => {
    const { user } = useUserData();
    if (!user) {
      return <Navigate to="/landing" replace />;
    }
    return children;
  };
  const ProtectedRoute = ({ element }) => <RequireAuth>{element}</RequireAuth>;
  return (
    <>
      <SocketProvider>
        <UserProvider>
          <RtcConnProvider>
            <RemoteSocketProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/landing" replace />} />
                <Route path="/landing" element={<Landing />} />
                <Route
                  path="/call"
                  element={<ProtectedRoute element={<Call />} />}
                />
                <Route
                  path="/room/:roomId"
                  element={<ProtectedRoute element={<Room />} />}
                />
              </Routes>
            </RemoteSocketProvider>
          </RtcConnProvider>
        </UserProvider>
      </SocketProvider>
    </>
  );
}

export default App;
