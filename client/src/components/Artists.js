import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";
import setTitle from "../setTitle";
import axios from "axios";

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

//decorator design pattern
@setTitle((props) => {
    //if(!props.user) return 'Loading friends...'
    return "Your Profile"
})
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
      var song_array = [];
      var song_image_array = []; 
      var artist_array = [];
      var artist_image_array = []; 
     
      var i; 
       //Just get the top 10 songs
      if (res.data.songName.length >= 10) {
        for (i = 0; i < 10; i++) {
          song_array.push(res.data.songName[i]); 
          song_image_array.push(res.data.image[i]);
        }
      }
      else {
        for (i = 0; i < res.data.songName.length; i++) {
          song_array.push(res.data.songName[i]); 
          song_image_array.push(res.data.image[i]);
        }
      }

      var j; 
      // Just get the top 10 Artists 
      if (res.data.artist.length >= 10) {
        for (j = 0; j < 10; j++) {
          artist_array.push(res.data.artist[j]); 
          artist_image_array.push(res.data.artistImage[j]);
        }
      }
      else {
        for (j = 0; j < res.data.artist.length; j++) {
          artist_array.push(res.data.artist[j]); 
          artist_image_array.push(res.data.artistImage[j]);        
        }
      }
      
      this.setState({
        id: res.data.id,
        user: res.data.displayName,
        datas: song_array,
        imagez: song_image_array,
        artist: artist_array,
        artistimage: artist_image_array
      });
    });
  }

  logout() {
    this.props.logoutHandler(); 
  };
  
  render() {
    var top_tracks = this.state.datas;
    var top_tracks_pics = this.state.imagez;
    var top_artists = this.state.artist;
    var top_artists_pics = this.state.artistimage;

    return (
      <section className="profile">
        <nav>
          <div>
            <a href="/">
              <Link to="/"><img id="home-icon" src="/icons/home.png" width="50" height="50" alt="Home"></img></Link>
            </a>
          </div>
          <div>
            <a href={`/artists?user=${this.state.id}`}>
              <Link to="/profile"><img id="profile-icon" src="/icons/profile.png" width="50" height="50" alt="Profile"></img></Link>
            </a>
          </div>
          <div>
            <a href={`/friends?user=${this.state.id}`}>
              <Link to="/friends"><img id="friends-icon" src="/icons/friends.png" width="50" height="50" alt="Friends"></img></Link>
            </a>
          </div>
          <div id="logout">
            <a role="button" onClick={() => {this.logout()}} href="/" >
              <img id="logout-icon" src="/icons/logout.png" width="50" height="50" alt="Log Out"></img>
            </a>
          </div>
        </nav>

        <br></br>
        <main>
          <h2>
            Thanks for logging in {this.state.user}! Your top tracks have been
            imported.
          </h2>
          <article id="top">
              <div className="items">
                <ol>
                  <p className="labels">Top Tracks</p>
                  {top_tracks.map((object, i) => {
                    return (
                      <TracksItem
                        obj={object}
                        pics={top_tracks_pics}
                        index={i}
                      ></TracksItem>
                    );
                  })}
                </ol>
              </div>
              
              <div className="items"> 
                <ol>
                  <p className="labels">Top Artists</p>
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
            </article> 
        </main>
      </section>
    );
  }
}
export default Artists;
