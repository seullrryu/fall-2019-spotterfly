import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";
import setTitle from "../setTitle";
import axios from "axios";
import { Observable } from "rxjs";

function Users(props) {
  const name = props.obj;
  const songs = props.songs;
  // var index = props.index;
  return (
    <li>
      <span>{name}</span>
      <p>Songs they listen to:</p>
      <ol>
        {songs.map(song => (
          <li>{song}</li>
        ))}
      </ol>
    </li>
  );
}

//decorator design pattern
@setTitle(props => {
  //if(!props.user) return 'Loading friends...'
  return "Your Friends";
})
class Friends extends Component {
  //check for Geolocation support
  // if (navigator.geolocation) {
  //   console.log('Geolocation is supported!');
  // }
  // else {
  //   console.log('Geolocation is not supported for this Browser/OS.');
  // }
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      user: "",
      LonLat: [],
      songs: [],
      songIDs: [],
      otherUsers: {
        username: [],
        location: {},
        userID: [],
        songs: {},
        songIDs:{}
      }
    };
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams = urlParams.toString();
    var fields = urlParams.split("=");
    const id = fields[1];

    //My stuff
    const url = `http://localhost:8888/playlistdata/${id}`;
    axios.get(url).then(res => {
      var song_array = [];
      var artist_array = [];

      var i;
      //Just get the top 10 songs
      if (res.data.songName.length >= 10) {
        for (i = 0; i < 10; i++) {
          song_array.push(res.data.songName[i]);
        }
      } else {
        for (i = 0; i < res.data.songName.length; i++) {
          song_array.push(res.data.songName[i]);
        }
      }

      var j;
      // Just get the top 10 Artists
      if (res.data.artist.length >= 10) {
        for (j = 0; j < 10; j++) {
          artist_array.push(res.data.artist[j]);
        }
      } else {
        for (j = 0; j < res.data.artist.length; j++) {
          artist_array.push(res.data.artist[j]);
        }
      }
      this.setState({
        id: res.data.id,
        user: res.data.displayName,
        songs: song_array,
        songIDs: res.data.songID,
        artists: artist_array
      });
    });

    //other user data stuff
    var userdatas = "http://localhost:8888/userdata/";
    axios.get(userdatas).then(res => {
      var username = [];
      var locationDict = {};
      var userID = [];
      var songDict = {};
      var songID_Dict= [];
      for (var i = 0; i < res.data.length; i++) {
        username.push(res.data[i].name);
        userID.push(res.data[i].userID);
        locationDict[res.data[i].name] = res.data[i].LonLat;
        songDict[res.data[i].name] = res.data[i].songName;
        songID_Dict[res.data[i].name] = res.data[i].songs;
      }

      //Getting my location 
      //If I exist in the locations dictionary, set state to the array of [longitude, latitude] of where I am
      if (this.state.user in locationDict) {
        this.setState({
          LonLat: locationDict[this.state.user]
        })
      }
      
      this.setState(prevState => ({
        otherUsers: {
          ...prevState.otherUsers,
          username: username,
          location: locationDict,
          userID: userID,
          songs: songDict,
          songIDs:songID_Dict
        }
      }));
      console.log(this.state);
    });

    function geolocationObservable(options) {
      return new Observable(observer => {
        const id = navigator.geolocation.watchPosition(
          position => {
            observer.next(position);
          },
          error => {
            observer.error(error);
          },
          options
        );

        return () => {
          navigator.geolocation.clearWatch(id);
        };
      });
    }

    geolocationObservable({
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    }).subscribe(
      position => console.log(position),
      e => console.error(e)
    );
  }

  getLocation() {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams = urlParams.toString();
    var fields = urlParams.split("=");
    const id = fields[1];
    const url = `http://localhost:8888/userdata/${id}`;
    if ("geolocation" in navigator) {
      console.log("geolocation available");
      console.log(this.state.id);

      navigator.geolocation.getCurrentPosition(position => {
        const pos = [];
        pos.push(position.coords.longitude);
        pos.push(position.coords.latitude);
        if (this.state.id !== "") {
          axios.post(url, {
            id: this.state.id,
            name: this.state.user,
            songs: this.state.songid,
            songNames: this.state.songs,
            location: pos
          });
        }
        this.setState({
          lat: position.coords.latititude,
          lon: position.coords.longitude
        });

        // document.getElementById('latitude').textContent = lat;
        // document.getElementById('longitude').textContent = lon;
      });
    } else {
      console.log("geolocation not available");
    }
  }

  compare(){
    var list_of_users = this.state.otherUsers.username;
    var my_songs = this.state.songIDs
    //my_songs.push("15IWqq4MaJ09ZQZgzcbn4p");
    console.log("list of users: " + list_of_users);
    console.log("my songs: " + my_songs);

    for(let i = 0; i < list_of_users.length; i++){
      var name = list_of_users[i];
      var their_songs = this.state.otherUsers.songIDs[name];
      console.log(name + "'s' songs: " + their_songs);
      var matched_songs = my_songs.filter(x => their_songs.includes(x));
      console.log(matched_songs);
      if (matched_songs.length === 0){
        console.log("you and " + name + " have no overlapping songs");
      }else{
        const matched_songs_string = matched_songs.join(", ");
        console.log("you and " + name + " both listen to " + matched_songs_string);
      } 
    }
  }

  logout() {
    this.props.logoutHandler();
  }

  render() {
    var list_of_users = this.state.otherUsers.username;
    return (
      <section className="friends">
        {this.getLocation()}
        {this.compare()}
        <nav>
          <div>
            <a href="/">
              <Link to="/">
                <img
                  id="home-icon"
                  src="/icons/home.png"
                  width="50"
                  height="50"
                  alt="Home"
                ></img>
              </Link>
            </a>
          </div>
          <div>
            <a href={`/artists?user=${this.state.id}`}>
              <Link to="/profile">
                <img
                  id="profile-icon"
                  src="/icons/profile.png"
                  width="50"
                  height="50"
                  alt="Profile"
                ></img>
              </Link>
            </a>
          </div>
          <div>
            <a href={`/friends?user=${this.state.id}`}>
              <Link to="/friends">
                <img
                  id="friends-icon"
                  src="/icons/friends.png"
                  width="50"
                  height="50"
                  alt="Friends"
                ></img>
              </Link>
            </a>
          </div>
          <div id="logout">
            <a
              role="button"
              onClick={() => {
                this.logout();
              }}
              href="/"
            >
              <img
                id="logout-icon"
                src="/icons/logout.png"
                width="50"
                height="50"
                alt="Log Out"
              ></img>
            </a>
          </div>
        </nav>

        <main>
          <div className="friendinfo">
            <h2>Other users near {this.state.user} </h2>
            {list_of_users.map((object, i) => {
              return (
                <Users
                  obj={object}
                  songs={this.state.otherUsers.songs[object]}
                  index={i}
                ></Users>
              );
            })}
            {/* <div className="container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png"
                alt=""
                className="container__image"
              />
              <div className="container__text">
                <a href="/">
                  <h3>Friend 1</h3>
                </a>
                <button id="compatible">
                  Click to find out your Compatibility!
                </button>
              </div>
            </div>
            <div className="container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png"
                alt=""
                className="container__image"
              />
              <div className="container__text">
                <a href="/">
                  <h3>Friend 2</h3>
                </a>
                <button id="compatible">
                  Click to find out your Compatibility!
                </button>
              </div>
            </div>
            <div className="container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png"
                alt=""
                className="container__image"
              />
              <div className="container__text">
                <a href="/">
                  <h3>Friend 3</h3>
                </a>
                <button id="compatible">
                  Click to find out your Compatibility!
                </button>
              </div>
            </div> */}
          </div>
        </main>
      </section>
    );
  }
}
export default Friends;
