// import React from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import BottomNav from './components/BottomNav';
// import UserHeader from './components/UserHeader';
// import PickupStatusTabs from '../pages/User/other/PickupStatusTabs';

// const WasteBankLayout = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-[#f8faf5] flex flex-col">
//       {/* Fixed Header */}
//       <div className="fixed top-0 left-0 right-0 z-40 bg-[#f8faf5]">
//         <UserHeader
//           onNotificationClick={() => navigate('/notifications')}
//           onCartClick={() => navigate('/marketplace')}
//         />
//       </div>
//       {/* Responsive Layout */}
//       <div className="flex flex-1 pt-[76px] pb-20 w-full max-w-[1600px] mx-auto">
//         {/* Main Content */}
//         <div className="flex-1 w-full px-2 sm:px-6 max-w-3xl mx-auto items-start">
//           <Outlet />
//         </div>
//         {/* Desktop-only Pickup Status Tabs */}
//         <div className="hidden lg:block flex-shrink-0 pl-6 pr-8 pt-2 w-[380px]">
//           <PickupStatusTabs />
//         </div>
//       </div>
//       <BottomNav />
//     </div>
//   );
// };

// export default WasteBankLayout;

// import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import BottomNav from "./components/BottomNav";
// import UserHeader from "./components/UserHeader";
// import PickupStatusTabs from "../pages/User/other/PickupStatusTabs";
// import WasteBank from "../pages/WasteBank/WasteBank";

// const WasteBankLayout = () => {
//   const navigate = useNavigate();

//   return <div className="min-h-screen bg-[#f8faf5] flex flex-col">
//     <WasteBank/>
//   </div>;
// };

// export default WasteBankLayout;
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/components/Sidebar";
import Topbar from "../pages/components/Topbar";
import WasteBank from "../pages/WasteBank/WasteBank";
import BottomNav from "../pages/components/BottomNav";
import UserHeader from "./components/UserHeader";
const WasteBankLayout = () => (
  <div className="min-h-screen bg-light">
    <div className="fixed top-0 left-0 right-0 z-40 bg-[#f8faf5]">
      <Topbar />
    </div>
    <div className="flex-1 w-full px-2 sm:px-6 max-w-3xl mx-auto items-start">
      <Outlet />
    </div>
    <BottomNav />
  </div>
);

export default WasteBankLayout;

