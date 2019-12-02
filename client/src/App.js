import React, { Component } from "react";
// import { BrowserRouter as Link } from 'react-router-dom';
import Login from "./components/Login.js";
// import Profile from "./components/Profile.js";
import "./App.scss";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      next: false,
      params: params,
      loggedIn: token ? true : false,
      user: { username: "Not Checked", image: null },
      nowPlaying: { name: "Not Checked", albumArt: "" },
      topArtists: { artists: "Not Checked", artistsPic: "" }, //, artistProfile: ''}
      topTracks: { tracks: "Not Checked", tracksPic: "" },
      location: { latitude: "Loading", longitude: "Loading" }
    };

    if (token) {
      spotifyApi.setAccessToken(token);
    }
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      console.log(response);
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  }

  getTopArtists() {
    spotifyApi
      .getMyTopArtists({ limit: 10, time_range: "long_term" })
      .then(response => {
        console.log(response);
        var arr = [];
        var picArray = [];
        response.items.forEach(function(p) {
          arr.push(p.name);
          picArray.push(p.images[0].url);
        });
        this.setState({
          topArtists: {
            artists: arr.join(),
            artistsPic: picArray.join()
          },
          next: true
        });
      });
    this.getUser();
    this.getTopTracks();
  }

  getTopTracks() {
    spotifyApi
      .getMyTopTracks({ limit: 10, time_range: "long_term" })
      .then(response => {
        var arr = [];
        var picArray = [];
        response.items.forEach(function(p) {
          console.log(p);
          arr.push(p.name);
          picArray.push(p.album.images[0].url);
        });
        this.setState({
          topTracks: {
            tracks: arr.join("`"),
            tracksPic: picArray.join(",")
          }
        });
      });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        this.setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      );
    }
  }

  getUser() {
    spotifyApi.getMe().then(
      response => {
        let username, image;
        if (response.display_name != null) {
          username = response.display_name;
        } else {
          username = response.id;
        }
        if (response.images.length === 0) {
          image = null;
        } else {
          image = response.images[0].url;
        }
        this.setState({ user: { username: username, image: image } });
      },
      err => {
        this.handleError(err);
      }
    );
  }

  handleError(err) {
    switch (err.status) {
      case 401:
        console.log("Log in Expired");
        this.setState({ loggedIn: false, error: 401 });
        break;
      default:
        console.log("Error " + err.status);
    }
  }

  render() {
    // if (this.state.loggedIn === true) {
    //   if (this.state.next) {
    //     return (
    //       <Profile
    //         userinfo={this.state.user}
    //         artists={this.state.topArtists.artists}
    //         pics={this.state.topArtists.artistsPic}
    //         tracks={this.state.topTracks.tracks}
    //         tracksPic={this.state.topTracks.tracksPic}
    //       ></Profile>
    //     );
    //   } else {
    //     return (
    //       <section class="Loggedin">
    //         <h2>Hey there, thanks for logging in! </h2>
    //         <div>
    //           <button onClick={() => this.getTopArtists()}>
    //             <b>Click Here to Get Your Top Artists.</b>
    //           </button>
    //         </div>
    //       </section>
    //     );
    //   }
    // } 
    // else {
      return (
        <div className="App">
          <div class="App-background">
            <Login></Login>
            <footer>
              Copyright © Seulmin Ryu, Yena Park, Alexander Goldman, Zhongheng
              Sun 2019
            </footer>
          </div>
        </div>
      );
    }
  }

export default App;
