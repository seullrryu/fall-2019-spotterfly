
import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      topArtists: { artists: 'Not Checked' },
      //, artistProfile: ''}
      topTracks: { tracks : 'Not Checked' }
    };
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

  getTopArtists(){
    spotifyApi.getMyTopArtists({limit: 20})
      .then((response) => {
        var arr = [];
        response.items.forEach(function(p){
          arr.push(p.name);
        });
        this.setState({
          topArtists: { 
              artists: arr.join(', ')
            }
        });
      });
  }

  getTopTracks(){
    spotifyApi.getMyTopTracks()
      .then((response) => {
        var arr = [];
        response.items.forEach(function(p){
          arr.push(p.name);
        });
        this.setState({
          topTracks: { 
              tracks: arr.join(', ')
            }
        });
      })
  }

  render() {
    return (
    <div className="App">
      <section class="login">
        <h1>SPOTTERFLY</h1>
        <p1>Share your playlists with people near you with similar tastes.</p1>
        <p>Discover new music.</p>
        <a href='http://localhost:8888/login'>
          <button id="login-button">
            <b>LOG IN WITH SPOTIFY</b>
          </button>
        </a>
      </section>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }

        <div>
          Top Artists: { this.state.topArtists.artists }
        </div>
        { this.state.loggedIn && 
          <button onClick={() => this.getTopArtists()}>
            Check Top Artists
          </button>
        }

        <div>
          Top Tracks: { this.state.topTracks.tracks }
        </div>
        { this.state.loggedIn && 
          <button onClick={() => this.getTopTracks()}>
            Check Top Tracks
          </button>
        }

        <footer>Copyright © Seulmin Ryu, Yena Park, Alexander Goldman, Zhongheng Sun 2019</footer>
      </div>
    );
  }
}

export default App;