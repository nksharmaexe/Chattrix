import { RiSendPlaneFill } from "react-icons/ri";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/messageThunk";

const SendMessage = () => {

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [message, setMessage] = useState("");

  const sendMessage = (evt)=>{
     if (evt.key === "Enter") {
      handleSendMessage();
    }
  }
  const handleSendMessage = () => {
    dispatch(sendMessageThunk({ receiverId: selectedUser?._id, message }));
    setMessage("");
  };

  return (
    <div className="h-[5rem] w-full p-3 flex gap-2">
      <label className="input w-full input-primary py-3 h-full ">
        <input
          className=""
          onKeyDown={sendMessage}
          type="text"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </label>
      <button
        onClick={handleSendMessage}
          
        
        className="btn btn-outline btn-primary h-full py-2"
      >
        <RiSendPlaneFill className="size-[1.5rem] " />
      </button>
    </div>
  );
};

export default SendMessage;
