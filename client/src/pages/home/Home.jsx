import { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeSocket,
  setOnlineUsers,
} from "../../store/slice/socket/socketSlice";
import { setNewMessage } from "../../store/slice/message/messageSlice";
import { getOtherUsersThunk } from "../../store/slice/user/userThunk";

function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated, userProfile, selectedUser } = useSelector((state) => state.userReducer);
  const { socket } = useSelector((state) => state.socketReducer);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));
    dispatch(getOtherUsersThunk());
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => dispatch(setOnlineUsers(onlineUsers)));
    socket.on("newMessage", (newMessage) => dispatch(setNewMessage(newMessage)));

    return () => socket.close();
  }, [socket]);

  const showChat = !!selectedUser;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div className={`w-full md:w-1/3 ${isMobile && showChat ? "hidden" : ""}`}>
        <UserSidebar />
      </div>

      {/* Chat */}
      <div className={`w-full md:w-2/2 ${isMobile && !showChat ? "hidden" : ""}`}>
        <MessageContainer isMobile={isMobile} />
      </div>
    </div>
  );
}

export default Home;

