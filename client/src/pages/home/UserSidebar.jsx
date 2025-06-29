import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  getProfileThunk,
  logoutUserThunk,
} from "../../store/slice/user/userThunk";
import { IoLogOutOutline } from "react-icons/io5";

const UserSidebar = () => {
  const [searchVal, setSearchVal] = useState("");
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const { otherUsers, userProfile, screenLoading } = useSelector(
    (state) => state.userReducer
  );

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (!searchVal) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter((user) => {
          return (
            user?.username.toLowerCase().includes(searchVal.toLowerCase()) ||
            user?.fullname.toLowerCase().includes(searchVal.toLowerCase())
          );
        })
      );
    }
  }, [searchVal, otherUsers]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProfileThunk()); // ✅ fetch current user info
      await dispatch(getOtherUsersThunk()); // ✅ fetch all other users
    };

    fetchData();
  }, [dispatch]);

  // if (screenLoading || !userProfile) {
  //   return <span class=" max-w-[20rem] w-full h-screen flex flex-col  border-r-white/10 bg-[#191E24] loading loading-dots loading-sm"></span>;
  // }
  return (
    <div className="sm:max-w-[20rem] w-full h-screen flex flex-col  border-r-white/10 bg-[#191E24]">
      <div className="flex items-center p-3 ">
        <img
          src="images/meetme.png"
          width={"13%"}
          alt="logo"
          className="mr-2"
        />
        <h1 className="text-2xl">Chattrix</h1>
      </div>
      <div className="p-3 pt-0">
        <label className="input"  style={{width: "100%"}}>
          <input
            onChange={(e) => setSearchVal(e.target.value)}
            type="search"
            required
            placeholder="Search"
           
          />
          <FaSearch className="size-5" />
        </label>
      </div>
      <div className="h-full flex flex-col px-3  overflow-y-auto ">
        {users?.map((userDetails) => {
          return <User key={userDetails?._id} userDetails={userDetails} />;
        })}
      </div>
      <div className="h-[5rem] border-t border-t-white/10 p-3">
        <div className="avatar flex justify-between items-center">
          <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2 ">
            <img src={userProfile?.avtar} />
          </div>
          <h2>{userProfile?.fullname}</h2>
          <button
            onClick={handleLogout}
            className="btn btn-active btn-primary btn-sm"
          >
            <IoLogOutOutline className="size-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
