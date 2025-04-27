const Navbar = () => {
  return (
    <div>
      <div
        className="bg-dark text-white px-4 py-3 d-flex align-items-center justify-content-between"
        style={{
          width: "100%",
          height: "80px",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          gap: "20px",
        }}
      >
        <h3 className="fst-bold ">MovieMania</h3>
        <input
          className="w-50"
          type="text"
          placeholder="Search Movies,Webseries,TvShows..."
        />
        <div className="d-flex gap-3">
          <a className="text-warning text-decoration-none">WatchList</a>

          <a href="#" className="text-warning text-decoration-none">
            Sign in
          </a>
          <a href="#" className="text-warning text-decoration-none">
            Eng
          </a>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
