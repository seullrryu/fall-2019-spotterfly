import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";
import axios from "axios";
//import SpotifyWebApi from "spotify-web-api-js";
//const spotifyApi = new SpotifyWebApi();

// function ArtistItem(props) {
//   const name = props.obj;
//   const pics = props.pics;
//   var index = props.index;
//   return (
//     <li>
//       <div className="artist-item">
//         <span>{name}</span>
//         <br></br>
//         <img
//           src={pics[index]}
//           width="300"
//           height="300"
//           alt="We don't have the images. Sorry :("
//         />
//         <br></br>
//         <br></br>
//       </div>
//     </li>
//   );
// }

function TracksItem(props) {
  const name = props.obj;
  const pics = props.pics;
  var index = props.index;
  return (
    <li>
      <div className="tracks-item">
        <span>{name}</span>
        <br></br>
        <img
          src={pics[index]}
          width="300"
          height="300"
          alt="We don't have the images. Sorry :("
        />
        <br></br>
        <br></br>
      </div>
    </li>
  );
}

function ArtistItem(props) {
  const name = props.obj;
  const pics = props.pics;
  var index = props.index;
  return (
    <li>
      <div className="artist-item">
        <span>{name}</span>
        <br></br>
        <img
          src={pics[index]}
          width="300"
          height="300"
          alt="We don't have the images. Sorry :("
        />
        <br></br>
        <br></br>
      </div>
    </li>
  );
}
class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      user: "",
      datas: [],
      imagez: [],
      artist: [],
      artistimage: []
    };
  }

  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams = urlParams.toString();
    var fields = urlParams.split("=");
    const id = fields[1];
    const url = `http://localhost:8888/playlistdata/${id}`;
    axios.get(url).then(res => {
      this.setState({
        id: res.data.id,
        user: res.data.displayName,
        datas: res.data.songName,
        imagez: res.data.image,
        artist: res.data.artist,
        artistimage: res.data.artistImage
      });
    });

    /*   var processeddata2 = [];
    this.state.datas.forEach(element => {
      console.log(element);
      spotifyApi.getTrack(element).then(
        function(data) {
          console.log("Artist albums", data);
        },
        function(err) {
          console.error(err);
        }
      );
    });

    this.setState({
      processdatas: processeddata2
    }); */ //this is for parsing songID but it doesnt work
  }

  render() {
    var top_tracks = this.state.datas;
    var top_tracks_pics = this.state.imagez;
    var top_artists = this.state.artist;
    var top_artists_pics = this.state.artistimage;

    return (
      <div className="container">
        <section className="top-artists">
          <nav>
            <div>
              <a href="/">
                <Link to="/">Home</Link>
              </a>
            </div>
            <div>
              <a href={`/artists?user=${this.state.id}`}>
                <Link to="/profile">Profile</Link>
              </a>
            </div>
            <div>
              <a href={`/friends?user=${this.state.id}`}>
                <Link to="/friends">Friends</Link>
              </a>
            </div>
          </nav>
        <br></br>
        <div className="display-box">

          <h2>
            Thanks for logging in {this.state.user}! Your top tracks have been
            imported.
          </h2>
          <p>Your top tracks are: </p>
          <div>
            <ol>
              {/* {this.state.datas.map(function(song, index1) {
                return <li key={index1}>{song}</li>;
              })} */}
              {top_tracks.map((object, i) => {
                return (
                  <TracksItem
                    obj={object}
                    pics={top_tracks_pics}
                    index={i}
                  ></TracksItem>
                );
              })}

              {top_artists.map((object, i) => {
                return (
                  <ArtistItem
                    obj={object}
                    pics={top_artists_pics}
                    index={i}
                  ></ArtistItem>
                );
              })}
            </ol>
          </div>
          {/* <div>
            {this.state.imagez.map(function(song, index) {
              return (
                <div key={index}>
                  <img src={song} alt="" />
                </div>
              );
            })}
          </div> */}
        </div>
      </section>
    );
  }
}
export default Artists;
