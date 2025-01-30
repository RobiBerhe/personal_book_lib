// import BooksList from "./BooksList";



const Dashboard  = ()=>{
    return (
      //   <div>
      //   <h1 className="text-xl lg:text-2xl font-bold mb-4">My Books</h1>
      //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      //     {/* Example Book Cards */}
      //    {/* <BooksList/> */}
      //   </div>
      // </div>
      <div className="p-4 space-y-6 bg-white rounded-lg mt-12 shadow">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 rounded shadow">
          <p className="text-sm font-medium">Total Books</p>
          <p className="text-lg font-bold">{10}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <p className="text-sm font-medium">Books Read</p>
          <p className="text-lg font-bold">{2}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <p className="text-sm font-medium">Books Unread</p>
          <p className="text-lg font-bold">{8}</p>
        </div>
      </div>
    </div>
    )
}


export default Dashboard;