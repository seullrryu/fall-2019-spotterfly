import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";
import setTitle from "../setTitle";
import axios from "axios";
import { Observable } from "rxjs";

function Users(props) {
  const name = props.obj;
  const songs = props.songs;
  var users = props.users;
  var index = users.indexOf(name);
  const id = props.userID;
  var address = "http://localhost:3000/artists?user=" + id[index];
  const artists = props.artists; 

  if (songs && songs.length > 0) {
    if (artists && artists.length > 0) {
      return (
        <section>
          <span>
            <a id="to-others" href={address}>
              {name}
            </a>
          </span>
          <p>Songs you both listen to:</p>
          <ol>
            {songs.map(song => (
              <li>{song}</li>
            ))}
          </ol>
          <p>Artists you both listen to:</p>
          <ol>
            {artists.map(song => (
              <li>{song}</li>
            ))}
          </ol>
        </section>
      );
    }
    else {
      return (
        <section>
          <span>
            <a id="to-others" href={address}>
              {name}
            </a>
          </span>
          <p>Songs you both listen to:</p>
          <ol>
            {songs.map(song => (
              <li>{song}</li>
            ))}
          </ol>
          <p>No overlapping artists.</p>
        </section>
      );
    }
  }
  else {
    if (artists && artists.length > 0) {
      return (
        <section>
          <span>
            <a id="to-others" href={address}>
              {name}
            </a>
          </span>
          <p>No overlapping songs.</p>
          <p>Artists you both listen to:</p>
          <ol>
            {artists.map(song => (
              <li>{song}</li>
            ))}
          </ol>
        </section>
      );
    }
    else {
      return (
        <section>
          <span>
            <a id="to-others" href={address}>
              {name}
            </a>
          </span>
          <p>No overlapping songs.</p>
          <p>No overlapping artists.</p>
        </section>
      );
    }
  }
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
      artists: [],
      otherUsers: {
        username: [],
        location: {},
        userID: [],
        songs: {},
        songIDs: {},
        artists:{},
        nearMe: [],
        matchedSongs: {},
        matchedArtists:{}
      }
    };
    this.getLocation = this.getLocation.bind(this);
    this.toRad = this.toRad.bind(this);
    this.compareSongs = this.compareSongs.bind(this);
    this.compareLocation = this.compareLocation.bind(this);
    this.computeDistanceBetween = this.computeDistanceBetween.bind(this);
    this.setMyState = this.setMyState.bind(this);
    this.compareArtists = this.compareArtists.bind(this); 
  }

  setMyState(){
    var urlParams = new URLSearchParams(window.location.search);
    urlParams = urlParams.toString();
    var fields = urlParams.split("=");
    const id = fields[1];

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

      //for testing overlap
      // song_array.push("Six Weeks","A Good Day");
      // res.data.songID.push("060WwU9cva7KOpMhZAJjT6","11tT1T2BSELuCaMHMLLIrw");

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

  }


  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams = urlParams.toString();
    var fields = urlParams.split("=");

    //My stuff
    this.setMyState();
    //console.log("my state 1: " + this.state.user);

    
    //other user data stuff
    var userdatas = "http://localhost:8888/userdata/";
    axios.get(userdatas).then(res => {
      console.log("res:" + res);
      var username = [];
      var locationDict = {};
      var userID = [];
      var songDict = {};
      var songID_Dict = [];
      console.log("my state loop: " + this.state.user);
      var artists_Dict = {}; 
      for (var i = 0; i < res.data.length; i++) {
        username.push(res.data[i].name);
        userID.push(res.data[i].userID);
        locationDict[res.data[i].name] = res.data[i].LonLat;
        songDict[res.data[i].name] = res.data[i].songName;
        songID_Dict[res.data[i].name] = res.data[i].songs;
        artists_Dict[res.data[i].name] = res.data[i].artists;
      }
      //console.log("my state 2: " + this.state.user);

      //Getting my location
      //If I exist in the locations dictionary, set state to the array of [longitude, latitude] of where I am
      if (this.state.user in locationDict) {
        this.setState({
          LonLat: locationDict[this.state.user]
        });
      }

      this.setState(prevState => ({
        otherUsers: {
          ...prevState.otherUsers,
          username: username,
          location: locationDict,
          userID: userID,
          songs: songDict,
          songIDs: songID_Dict,
          artists: artists_Dict
        }
      }));

      var list_of_close_users = this.compareLocation();
      var matched_song_names = this.compareSongs(list_of_close_users);
      var matched_artists_names = this.compareArtists(list_of_close_users); 
      console.log("list header: " + list_of_close_users);
      console.log("matches header:" + Object.keys(matched_song_names));
      console.log("my state 3: " + this.state.user);

      this.setState(prevState => ({
        otherUsers: {
          ...prevState.otherUsers,
          nearMe: list_of_close_users,
          matchedSongs: matched_song_names,
          matchedArtists: matched_artists_names
        }
      }));
      //console.log("matched songs: " + this.state.matchedSongs);
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
    })
      .subscribe
      //    position => console.log(position),
      //   e => console.error(e)
      ();
  }

  getLocation() {
    var urlParams = new URLSearchParams(window.location.search);
    urlParams = urlParams.toString();
    var fields = urlParams.split("=");
    const id = fields[1];
    const url = `http://localhost:8888/userdata/${id}`;
    if ("geolocation" in navigator) {
      console.log("geolocation available");
      //console.log(this.state.id);

      navigator.geolocation.getCurrentPosition(position => {
        const pos = [];
        pos.push(position.coords.longitude);
        pos.push(position.coords.latitude);
        axios.post(url, {
          id: this.state.id,
          name: this.state.user,
          songs: this.state.songIDs,
          songNames: this.state.songs,
          artists: this.state.artists,
          location: pos
        });

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

  compareLocation() {
    var list_of_users = this.state.otherUsers.username;
    var dict_of_user_locations = this.state.otherUsers.location;
    var list_of_close_users = [];
    var lat1 = this.state.LonLat[1];
    var lon1 = this.state.LonLat[0];
    console.log("my lat: " + lat1 + ", my lon: " + lon1);

    for (let i = 0; i < Object.keys(dict_of_user_locations).length; i++) {
      var name = list_of_users[i];
      var lat2 = dict_of_user_locations[name][1];
      var lon2 = dict_of_user_locations[name][0];
      console.log(name + "'s lat: " + lat2 + "," + name + "'s lon " + lon2);
      var distance = this.computeDistanceBetween(lat1, lon1, lat2, lon2);
      console.log("distance: " + distance);
      if (name !== this.state.user && distance < Number.MAX_SAFE_INTEGER) {
        list_of_close_users.push(name);
      }
    }
    //console.log(list_of_close_users);
    return list_of_close_users;
  }

  computeDistanceBetween(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  toRad(value) {
    return (value * Math.PI) / 180;
  }

  compareSongs(list_of_close_users) {
    var my_songs = this.state.songIDs;
    var my_song_names = this.state.songs;
    var matched_songs = {};
    var matched_song_names = {};
    console.log("list of nearby users: " + list_of_close_users);
    console.log("my songs: " + my_songs);
    console.log("my song names: " + my_song_names);

    for (var i = 0; i < list_of_close_users.length; i++) {
      var name = list_of_close_users[i];
      var their_songs = this.state.otherUsers.songIDs[name];
      var their_song_names = this.state.otherUsers.songs[name];
      console.log(name + "'s' songs: " + their_songs);
      console.log(name + "'s' song names: " + their_song_names);
      // eslint-disable-next-line
      matched_songs[name] = my_songs.filter(x => their_songs.includes(x));
      // eslint-disable-next-line
      matched_song_names[name] = my_song_names.filter(y =>
        their_song_names.includes(y)
      );
      if (matched_songs[name].length === 0) {
        console.log("you and " + name + " have no overlapping songs");
      } else {
        var matched_song_names_string = matched_song_names[name].join(", ");
        console.log(
          "you and " + name + " both listen to " + matched_song_names_string
        );
      }
    }
    return matched_song_names;
  }

  compareArtists(list_of_close_users) {
    var my_artists = this.state.artists;
    var matched_artists = {};
    console.log("my artists: " + my_artists);

    for (var i = 0; i < list_of_close_users.length; i++) {
      var name = list_of_close_users[i];
      var their_artists = this.state.otherUsers.artists[name];
      console.log(name + "'s' artists: " + their_artists);

      // eslint-disable-next-line
      matched_artists[name] = my_artists.filter(x => their_artists.includes(x));
     
      if (matched_artists[name].length === 0) {
        console.log("you and " + name + " have no overlapping artists");
      } else {
        var matched_artists_names_string = matched_artists[name].join(", ");
        console.log(
          "you and " + name + " both listen to " + matched_artists_names_string
        );
      }
    }
    return matched_artists;
  }

  
  logout() {
    this.props.logoutHandler();
  }

  render() {
    //var list_of_close_users = this.compareLocation();
    var list_of_close_users = this.state.otherUsers.nearMe;
    return (
      <section className="friends">
        <div class="App-background3">
          {this.getLocation()}
          <nav>
            <div>
              <a href={`http://localhost:8888/login`}>
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
                  const url = "https://www.spotify.com/en/logout/";
                  const spotifyLogoutWindow = window.open(
                    url,
                    "Spotify Logout",
                    "width=700,height=500,top=40,left=40"
                  );
                  setTimeout(() => spotifyLogoutWindow.close(), 1000);
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
            <h2>Other users near {this.state.user} with similar tastes </h2>
            <article id="users">
              {list_of_close_users.map((object, i) => {
                return (
                  <Users
                    obj={object}
                    songs={this.state.otherUsers.matchedSongs[object]}
                    userID={this.state.otherUsers.userID}
                    users={this.state.otherUsers.username}
                    artists={this.state.otherUsers.matchedArtists[object]}
                  ></Users>
                );
              })}
            </article>
          </main>
        </div>
      </section>
    );
  }
}
export default Friends;