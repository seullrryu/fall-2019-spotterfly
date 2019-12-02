import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../App.scss";
import setTitle from "../setTitle";
import axios from "axios";
import { Observable } from "rxjs";

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
      lat: "",
      lon: [],
      songs: [],
      songID: [],
      pos: []
    };
    this.getLocation = this.getLocation.bind(this);
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
        songs: res.data.songName,
        songid: res.data.songID
      });
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
        axios.post(url, {
          id: this.state.id,
          name: this.state.user,
          songs: this.state.songid,
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

  logout() {
    this.props.logoutHandler();
  }

  render() {
    return (
      <section className="friends">
        {this.getLocation()}
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
            <h2>{this.state.user}'s Friends </h2>
            <div className="container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png"
                alt=""
                className="container__image"
              />
              <div className="container__text">
                <a href="/">
                  <h3>Friend 1</h3>
                </a>
                <p>Listens to Artist A and Artist B</p>
                <p>Compatibility ♥♥♥♥♡ </p>
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
                <p>Listens to Artist C and Artist D</p>
                <p>Compatibility ♥♥♡♡♡ </p>
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
                <p>Listens to Artist E and Artist F</p>
                <p>Compatibility ♥♥♥♡♡ </p>
              </div>
            </div>
          </div>
        </main>
      </section>
    );
  }
}
export default Friends;
