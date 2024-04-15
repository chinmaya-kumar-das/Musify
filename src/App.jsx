import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState(" ");
  const [tracks, setTracks] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const getTracks = async () => {
    setIsLoading(true)
    let data = await fetch(
      `https://v1.nocodeapi.com/chinmayakumar/spotify/pEuwvJyxEzLVjfLv/search?q=${keyword===" "?"trending hindi today":keyword}&type=track`
    );
    let convertedData = await data.json();
    // console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items);
    setIsLoading(false)
  };
  useEffect(()=>{
    getTracks();
  },{})
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getTracks();
    }
  };
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Musify
          </a>

          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              value={keyword}
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
              onKeyPress={handleKeyPress}
              className="form-control me-2 w-75"
              type="search"
              placeholder='Search by Artist, Album, Playlist, Track....... '
              aria-label="Search"
            />
            <button
              onClick={getTracks}
              className="btn btn-outline-success"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          {tracks.map((element) => {
            return (
              <div key={element.id} className="col col-lg-3 col-md-6 py-2">
                <div className="card ">
                  <img
                    src={element.album.images[0].url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <p className="card-text">
                      Artist:{element.album.artists[0].name}
                    </p>
                    <p className="card-text">
                      Release Date:{element.album.release_date}
                    </p>
                    <audio
                      src={element.preview_url}
                      controls
                      className="w-100"
                    ></audio>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={`row ${isloading ? "":"d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-dark text-light text-center py-3">© 2024 Musify. All Rights Reserved.</footer>

    </>
  );
}

export default App;
