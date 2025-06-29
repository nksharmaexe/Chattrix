import { setSelectedUser } from "../../store/slice/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const User = ({ userDetails }) => {

  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.userReducer);
  const {onlineUsers} = useSelector((state) => state.socketReducer);
  // const isUserOnline = onlineUsers?.includes(userDetails?._id)
  const isUserOnline = onlineUsers?.includes(String(userDetails?._id));


  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  };

  

  return (
    <>
      <div
        onClick={handleUserClick}
        className={`flex items-center  p-2 hover:bg-white/10 cursor-pointer rounded-lg "} `}
      >
        {/* ${userDetails?._id === selectedUser?._id && "bg-white/10 */}
        <div className={`avatar ${isUserOnline && "avatar-online"}`}>
          <div className="w-12 rounded-full">
            <img src={userDetails?.avtar} />
          </div>
        </div>
        <div className="pl-2">
          <h2 className="line-clamp-1">{userDetails?.fullname}</h2>
          <p className="text-xs">@{userDetails?.username}</p>
        </div>
      </div>
    </>
  );
};

export default User;
