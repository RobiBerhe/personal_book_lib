// import BooksList from "./BooksList";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useEffect } from "react";
import { fetchDashboardStats } from "../booksSlice";



const Dashboard  = ()=>{

  const dispatch = useDispatch<AppDispatch>();
  const {dashboardStats,dashboardStatsState}  = useSelector((state: RootState) => state.books);


  useEffect(()=>{
    dispatch(fetchDashboardStats());
  },[dispatch])

  
    return (
      <div className="p-4 space-y-6 bg-white rounded-lg mt-12 shadow">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 rounded shadow">
          <p className="text-sm font-medium">Total Books</p>
          <p className="text-lg font-bold">{dashboardStats.totalBooks}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <p className="text-sm font-medium">Books Read</p>
          <p className="text-lg font-bold">{dashboardStats.totalReadBooks}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <p className="text-sm font-medium">Books Unread</p>
          <p className="text-lg font-bold">{dashboardStats.totalUnreadBooks}</p>
        </div>
      </div>
    </div>
    )
}


export default Dashboard;