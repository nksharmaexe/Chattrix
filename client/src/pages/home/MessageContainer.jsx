import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/messageThunk";
import SendMessage from "./SendMessage";
import WelcomeAnimation from "./WelcomeAnimation";
import { FiArrowLeft } from "react-icons/fi";


const MessageContainer = ({ isMobile }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (!selectedUser?._id) return;
    dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
  }, [selectedUser]);

  const handleBack = () => {
    dispatch({ type: "user/setSelectedUser", payload: null });
  };

  if (!selectedUser) {
    return (
      <div className="h-screen w-full flex p-5 items-center justify-center text-2xl font-bold">
        <WelcomeAnimation />
        <img src="images/Messaging-bro.svg" className="md:w-[55%]" alt="image" />
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">

      <div className="w-full border-b flex items-center border-b-white/10">
      {isMobile && (

    <FiArrowLeft  onClick={handleBack}  className="text-2xl cursor-pointer" />
)}

        <User userDetails={selectedUser} />
      </div>

      <div className="h-full overflow-y-auto p-3">
        {messages?.map((messageDetails, index) => {
          const currentDate = new Date(messageDetails.createdAt).toDateString();
          const prevDate =
            index > 0
              ? new Date(messages[index - 1].createdAt).toDateString()
              : null;
          const showDate = currentDate !== prevDate;

          return (
            <React.Fragment key={messageDetails?._id}>
              {showDate && (
                <div className="text-center my-4 text-gray-400 text-sm relative">
                  <span className="bg-[#0d1117] px-3 relative z-10">
                    {currentDate}
                  </span>
                </div>
              )}
              <Message messageDetails={messageDetails} />
            </React.Fragment>
          );
        })}
      </div>

      <SendMessage />
    </div>
  );
};

export default MessageContainer;

