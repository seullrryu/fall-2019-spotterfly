<<<<<<< HEAD
import React, { Component } from 'react';
import './App.css';
=======
import React from "react";
import "./App.css";
>>>>>>> 73e9362f3bc1e2edbf664d1bdf3cbf7db0126996

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
      // topArtists: { artists: 'Not Checked', artistProfile: ''},
      // topTracks: {albums: 'Not Checked'}
    }
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

  // getTopArtists(){
  //   spotifyApi.getMyTopArtists()
  //     .then((response) => {
  //       this.setState({
  //         topArtists: { 
  //             artists: response.name, 
  //             artistProfile: response.images[0].url
  //           }
  //       });
  //     })
  // }

  render() {
    return (
    <div className="App">
      <section class="login">
        <h1>SPOTTERFLY</h1>
        <p1>Share your playlists with people near you with similar tastes.</p1>
        <p>Discover new music.</p>
        <a href="http://localhost:8888/login">
          <button id="login-button">
            <b>LOG IN WITH SPOTIFY</b>
          </button>
        </a>
      </section>
<<<<<<< HEAD
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
        <footer>Copyright © Seulmin Ryu, Yena Park, Alexander Goldman, Zhongheng Sun 2019</footer>
      </div>
    );
  }
=======
      <footer>
        Copyright © Seulmin Ryu, Yena Park, Alexander Goldman, Zhongheng Sun
        2019
      </footer>
    </div>
  );
>>>>>>> 73e9362f3bc1e2edbf664d1bdf3cbf7db0126996
}

export default App;


//       <footer>Copyright © Seulmin Ryu, Yena Park, Alexander Goldman, Zhongheng Sun 2019</footer>
//     </div>
//   );

//   //return (
//       <div className="App">
//         <a href='http://localhost:8888' > Login to Spotify </a>
//         <div>
//           Now Playing: { this.state.nowPlaying.name }
//         </div>
//         <div>
//           <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
//         </div>
//         { this.state.loggedIn &&
//           <button onClick={() => this.getNowPlaying()}>
//             Check Now Playing
//           </button>
//         }
//       </div>
//     );
//   }
// }

// function App() {
//   return (
//     <div className="App">
//       <section class="login">
//         <h1>SPOTTERFLY</h1> 
//         <p>Share your playlists with people near you with similar tastes.</p>
//         <p>Discover new music.</p>
//         <a href="http://localhost:8888/login"><button id="login-button"><b>LOG IN WITH SPOTIFY</b></button></a>
//       </section>
//       <div>
//           Now Playing: { this.state.nowPlaying.name }
//         </div>
//         <div>
//           <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
//         </div>
//         { this.state.loggedIn &&
//           <button onClick={() => this.getNowPlaying()}>
//             Check Now Playing
//           </button>
//         }
//       </div>

//       <footer>Copyright © Seulmin Ryu, Yena Park, Alexander Goldman, Zhongheng Sun 2019</footer>
//     </div>
//   );
// }

// export default App;
