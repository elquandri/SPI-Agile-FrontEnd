import { Component } from "@stencil/core";


@Component({
  tag: "spi-home",
  styleUrl: "spi-home.scss",
  shadow: true,
})
//  <h2 class="subtitle">Pour continuer veuillez-vous identifier.</h2>

export class SpiHome {

  componentDidLoad(){
    document.title = "Home"
  }
  componentWillLoad() {
    if(!sessionStorage.getItem('clé')){
      location.href = '/adm/authentification/authentification';
    }
  }

  render() {
    return [

      <div class="spi-home" id="spi-home">
        <div class="container is-large has-text-centered">
          <h1 class="title is-bold">Bienvenue sur l'interface du SPI !</h1>

        </div>
        <br/>
        <div class="container">
        <div class="columns is-multiline is-mobile">
          <div class="column is-one-third">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <center> <img src="/assets/formation.png" alt="Placeholder image" height="120" width="120"/> </center>
                    </figure>
                  </div>
                </div>

                <div class="content">
                  <center> <stencil-route-link url='/evae/formations'>
                    <button class="button is-danger">
                      FORMATION
                      <i class="graduation-cap"></i>
                    </button>
                  </stencil-route-link>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-one-third">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <center> <img src="/assets/satisfaction.png" alt="Placeholder image" height="120" width="120"/> </center>
                    </figure>
                  </div>
                </div>

                <div class="content">
                  <center> <stencil-route-link url='/evae/coupleQ'>
                    <button class="button is-danger">
                      <span>  QUALIFICATIF </span>
                    </button>
                  </stencil-route-link>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-one-third">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <center><img src="/assets/request.png" alt="Placeholder image" height="120" width="120"/>
                      </center>
                    </figure>
                  </div>
                </div>

                <div class="content">
                  <center>
                    <stencil-route-link url='/evae/question'>
                      <class className="button is-danger">
                        <span>  QUESTION </span>
                      </class>
                    </stencil-route-link>
                  </center>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      </div>
    ];
  }
}
