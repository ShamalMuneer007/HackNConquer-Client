import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import profileIcon from "/profile-icon.png";
import { useEffect, useState } from "react";
import UserProfile from "../user/modal/UserProfile";
import {
  FaBell,
  FaChevronUp,
  FaCode,
  FaList,
  FaMagnifyingGlass,
  FaMessage,
  FaTrophy,
  FaUsers,
} from "react-icons/fa6";
import { useDebounce } from "@/hooks/useDebounce";
import instance from "@/config/axiosConfig";
import { USER_SERVICE_URL } from "@/constants/service_urls";
import IUserData from "@/interfaces/IUserData";
import { toast } from "react-toastify";
import SearchOutput from "./SearchOutput";
import Chat from "../chat/Chat";
import { IoMdClose } from "react-icons/io";
import {
  FaChevronCircleUp,
  FaHome,
  FaTasks,
  FaUserFriends,
} from "react-icons/fa";
function UserNavbar() {
  const activeNavLinkStyle =
    "text-primary underline bg-gray-800/20 rounded p-3  underline-offset-8";
  const notActiveLinkstyle = "text-white p-3";
  const { user } = useSelector((state: any) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchModal, setSearchModal] = useState(false);

  const [searchResultData, setSearchResultData] = useState<IUserData[] | null>(
    null
  );
  const [modalInfo, setModalInfo] = useState<IUserData | null>(null);
  const [messageModal, setMessageModal] = useState(false);
  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await instance.get(
          `${USER_SERVICE_URL}/search?username=${searchKeyword}`
        );
        console.log("User search response data : ", response.data);
        setSearchResultData(response.data);
      } catch (error: any) {
        toast.dismiss();
        console.error(error);
        if (error && error.response && error.response.data) {
          toast.error("Something went wrong while doing search");
        } else {
          toast.error(error.message);
        }
      }
    };
    if (searchKeyword) {
      console.log("Searching for:", debouncedSearchKeyword);
      fetchSearchData();
    } else {
      setSearchResultData(null);
    }
  }, [debouncedSearchKeyword]);
  const searchInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeyword(event.target.value);
  };
  useEffect(() => {
    if (!showModal || !user) setModalInfo(null);
  }, [showModal, user]);
  return (
    <div>
      {modalInfo && showModal && (
        <UserProfile userInfo={modalInfo} setShowModal={setShowModal} />
      )}
      {showSidebar && (
        <div className="flex w-screen h-screen backdrop-blur-sm lg:hidden z-50 items-start justify-center  bg-black/30 left-0 fixed top-0">
          <div className="w-screen pb-7 bg-dark-100/90 rounded-b-3xl border-b-2 border-b-primary">
            <div className="mx-5 mt-0.5 flex justify-between items-center">
              {" "}
              <Link to={"/"} className="">
                <Logo className="w-36" />
              </Link>
              <button
                onClick={() => setShowSidebar(false)}
                className="active:text-primary"
              >
                <FaChevronUp />
              </button>
            </div>
            <div className="flex flex-col px-3">
              <NavLink
                onClick={() => setShowSidebar(false)}
                to="/"
                end
                className={({ isActive }) =>
                  `transition-color duration-300 flex items-center hover:bg-gray-800/20  ${
                    isActive ? activeNavLinkStyle : notActiveLinkstyle
                  }`
                }
              >
                <FaHome className="mr-2" />
                Home
              </NavLink>
              <NavLink
                to="/problems"
                end
                onClick={() => setShowSidebar(false)}
                className={({ isActive }) =>
                  `transition-color duration-300 flex items-center hover:bg-gray-800/20 ${
                    isActive || window.location.pathname.startsWith("/problems")
                      ? activeNavLinkStyle
                      : notActiveLinkstyle
                  }`
                }
              >
                <FaCode className="mr-2" />
                Problems
              </NavLink>
              <NavLink
                to="/categories"
                end
                onClick={() => setShowSidebar(false)}
                className={({ isActive }) =>
                  `transition-color duration-300 flex items-center hover:bg-gray-800/20  ${
                    isActive ||
                    window.location.pathname.startsWith("/categories")
                      ? activeNavLinkStyle
                      : notActiveLinkstyle
                  }`
                }
              >
                <FaList className="mr-2" />
                Categories
              </NavLink>
              <NavLink
                to="/leaderboard"
                end
                onClick={() => setShowSidebar(false)}
                className={({ isActive }) =>
                  `transition-color duration-300 flex items-center hover:bg-gray-800/20 ${
                    isActive ? activeNavLinkStyle : notActiveLinkstyle
                  }`
                }
              >
                <FaTrophy className="mr-2" />
                Leaderboards
              </NavLink>
              <NavLink
                to="/friends"
                end
                onClick={() => setShowSidebar(false)}
                className={({ isActive }) =>
                  `transition-color duration-300 flex items-center hover:bg-gray-800/20  ${
                    isActive || window.location.pathname.startsWith("/friends")
                      ? activeNavLinkStyle
                      : notActiveLinkstyle
                  }`
                }
              >
                <FaUserFriends className="mr-2" />
                Friends
              </NavLink>
              <NavLink
                to="/clan"
                end
                onClick={() => setShowSidebar(false)}
                className={({ isActive }) =>
                  `transition-color duration-300 flex items-center hover:bg-gray-800/20  ${
                    isActive ? activeNavLinkStyle : notActiveLinkstyle
                  }`
                }
              >
                <FaUsers className="mr-2" />
                Clan
              </NavLink>
              <NavLink
                to="/notifications"
                end
                onClick={() => setShowSidebar(false)}
                className={({ isActive }) =>
                  `transition-color duration-300 flex items-center hover:bg-gray-800/20  ${
                    isActive ? activeNavLinkStyle : notActiveLinkstyle
                  }`
                }
              >
                <FaBell className="mr-2" />
                Notifications
              </NavLink>
              {user ? (
                <div className="flex items-center justify-center mt-2">
                  <img
                    src={user.profileImage ? user.profileImage : profileIcon}
                    className="rounded-full mr-2"
                    referrerPolicy="no-referrer"
                    width={"30px"}
                    height={"30px"}
                  />
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setModalInfo(user);
                    }}
                    className="text-white hover:text-red-500 transition-colors flex items-center gap-3"
                  >
                    {user.username}
                    {/* Logout */}
                  </button>
                </div>
              ) : (
                <div className="flex justify-end items-center me-5 w-full text-white gap-4">
                  <Link
                    className="hover:text-primary transition-colors"
                    to={"/login"}
                  >
                    Login
                  </Link>
                  <div className="text-xs text-gray-700">OR</div>
                  <Link
                    className="hover:text-primary transition-colors"
                    to={"/signup"}
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex w-screen backdrop-blur-md lg:hidden z-20 items-center py-3 px-5 bg-gray-900/50 left-0 h-16 fixed top-0">
        <div className="text-white flex items-center text-2xl font-bold">
          <Link to={"/"} className="w-36">
            <Logo />
          </Link>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex gap-6">
            <button className="text-white">
              <FaMagnifyingGlass />
            </button>
            <div
              className="text-white active:text-primary"
              onClick={() => setShowSidebar(true)}
            >
              {" "}
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h16a1 1 0 100-2H4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden text-sm w-screen backdrop-blur-md lg:flex z-50 items-center py-3 px-20 bg-gray-900/50 left-0 h-16 fixed top-0">
        {/* <div className="text-white  flex items-center"> */}
        <Link to={"/"} className="w-[20%] pt-2 me-20">
          <Logo />
        </Link>
        {/* </div> */}

        <div className="flex text-white w-full justify-start gap-5">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `transition-color duration-300 hover:bg-gray-800/20  ${
                isActive ? activeNavLinkStyle : notActiveLinkstyle
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/problems"
            end
            className={({ isActive }) =>
              `transition-color duration-300 hover:bg-gray-800/20 ${
                isActive || window.location.pathname.startsWith("/problems")
                  ? activeNavLinkStyle
                  : notActiveLinkstyle
              }`
            }
          >
            Problems
          </NavLink>
          <NavLink
            to="/categories"
            end
            className={({ isActive }) =>
              `transition-color duration-300 hover:bg-gray-800/20  ${
                isActive || window.location.pathname.startsWith("/categories")
                  ? activeNavLinkStyle
                  : notActiveLinkstyle
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/leaderboard"
            end
            className={({ isActive }) =>
              `transition-color duration-300 hover:bg-gray-800/20 ${
                isActive ? activeNavLinkStyle : notActiveLinkstyle
              }`
            }
          >
            Leaderboards
          </NavLink>
          <NavLink
            to="/friends"
            end
            className={({ isActive }) =>
              `transition-color duration-300 hover:bg-gray-800/20  ${
                isActive || window.location.pathname.startsWith("/friends")
                  ? activeNavLinkStyle
                  : notActiveLinkstyle
              }`
            }
          >
            Friends
          </NavLink>
          <NavLink
            to="/clan"
            end
            className={({ isActive }) =>
              `transition-color duration-300 hover:bg-gray-800/20  ${
                isActive ? activeNavLinkStyle : notActiveLinkstyle
              }`
            }
          >
            Clan
          </NavLink>

          {user && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaMagnifyingGlass className="text-gray-300" />
              </div>
              <input
                className="block w-full h-10 pl-10 pr-3 py-2 border focus:border-none bg-transparent rounded-md text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-offset-primary focus:ring-primary placeholder:text-gray-400/60"
                placeholder="Search..."
                value={searchKeyword}
                onChange={searchInputChangeHandler}
              />
              {searchKeyword && (
                <>
                  <div className="absolute w-full top-[100%]">
                    <SearchOutput
                      setUserInfo={setModalInfo}
                      searchDatas={searchResultData}
                      setShowProfileModal={setShowModal}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className=" flex justify-start">
          {user ? (
            <div className="flex items-center gap-10">
              <Link
                to={"/notifications"}
                className="border rounded-full p-2 hover:border-primary hover:text-primary transition-colors text-white"
              >
                <FaBell />
              </Link>
              <button
                onClick={() => {
                  setShowModal(true);
                  setModalInfo(user);
                }}
                className="text-white hover:text-red-500 transition-colors flex items-center gap-3"
              >
                {user.username}
                {/* Logout */}
                <img
                  src={user.profileImage ? user.profileImage : profileIcon}
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  width={"35px"}
                  height={"35px"}
                />
              </button>
            </div>
          ) : (
            <div className="flex text-white gap-4">
              <Link
                className="hover:text-primary transition-colors"
                to={"/login"}
              >
                Login
              </Link>
              <div> | </div>
              <Link
                className="hover:text-primary transition-colors"
                to={"/signup"}
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
      {user && (
        <button
          onClick={() => setMessageModal((modal) => !modal)}
          className={`fixed ${
            messageModal
              ? "top-6 md:top-auto md:bottom-7 md:border md:border-white"
              : "bottom-7 border border-white"
          }  rounded-full z-40 bg-dark-300 p-4 text-center flex items-center justify-center right-10 text-white`}
        >
          {!messageModal ? <FaMessage /> : <IoMdClose />}
        </button>
      )}
      {user && messageModal && (
        <div className="fixed md:bottom-10 md:right-24 z-30">
          {" "}
          <Chat />{" "}
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default UserNavbar;
