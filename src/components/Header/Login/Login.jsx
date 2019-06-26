import React from "react";
import { API_URL, API_KEY_3 } from "../../../api/api";

// `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
// `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`
// `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY_3}`

export default class Login extends React.Component {
  sendPromises = () => {
    fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then( response => response.json())
      .then( data => {
        fetch( `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: "Ketino",
              password: "Рщрудуещ",
              request_token: data.request_token
            })
          }
        )
        .then(response => response.json())
        .then(data => {
          fetch(
            `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({
                request_token: data.request_token
              })
            }
          )
            .then(response => response.json())
            .then(data => {
              console.log("session", data);
            });
        })
      });
  }

  render() {
    return (
      <div>  
        <button
          className="btn btn-success"
          type="button"
          onClick={this.sendPromises}
        >
          Login </button>        
      </div>
    );
  }
}