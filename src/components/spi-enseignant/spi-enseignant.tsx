import { Component } from "@stencil/core";

@Component({
  tag: "spi-enseignant",
  styleUrl: "spi-enseignant.scss"
})
export class SpiHome {

  componentWillLoad() {
    console.log(sessionStorage.getItem('noens'))
    if(!sessionStorage.getItem('ens')){
      location.href = '/adm/authentification/authentification';
    }
  }
  render() {
    return [
      <adm-header />,

      <section class="hero  is-fullheight home">
        <div class="hero-body">
          <div class="container">
            <h1 class="title first">
              <span class="icon">
     <i class="fas fa-cogs"></i>
       </span>
              SPI-STENCIL
            </h1>
            <h2 class="subtitle first">
              Gestion des candidatures UBO
            </h2>
          </div>
        </div>
      </section>

    ];}
}
