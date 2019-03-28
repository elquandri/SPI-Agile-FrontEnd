import { Component, Prop } from "@stencil/core";
import { RouterHistory } from "@stencil/router";



@Component({
  tag: "adm-header",
  styleUrl: "adm-header.scss"
})
export class AdmHeader {
  @Prop() history: RouterHistory;
  burger!: any;
  menu!: any;
 

  toggleBurger() {
    this.burger.classList.toggle("is-active");
    this.menu.classList.toggle("is-active");
  }

  search() {
    //console.log("hello")
    // Supprimer des données de sessionStorage
    if (sessionStorage.getItem('clé')) {
      sessionStorage.removeItem('clé');

      // Supprimer toutes les données de sessionStorage
      sessionStorage.clear();
      //console.log(sessionStorage.getItem("clé"))
      location.href = '/adm/authentification/authentification';
    }
    else if (sessionStorage.getItem('ens')) {
      sessionStorage.removeItem('ens');

      // Supprimer toutes les données de sessionStorage
      sessionStorage.clear();
      //console.log(sessionStorage.getItem("clé"))
      location.href = '/adm/authentification/authentification';
    }


  }

  goBack(): any {
    console.log("hello2")

  }

  render() {
    return (
      <div class="adm-header">
        <nav
          class="navbar has-shadow"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="container">
            <div class="navbar-brand">
              <span class="navbar-item">
                <span>
                  <i class="fas fa-certificate styletxt" />
                </span>{" "}
                <strong class="logo">SPI-EVA</strong>
              </span>


           

            
              <span class="navbar-item">
                <stencil-route-link url='/home'>
                  {sessionStorage.getItem('clé')? <span class="blanche title"> <i class="fas fa-home"></i> Accueil </span> :""} 
                </stencil-route-link>
              </span>

              <span class="navbar-item">
                <stencil-route-link url='/evae/formations'>
                 {sessionStorage.getItem('clé')?<span class="blanche title"> <i class="fas fa-graduation-cap"></i> Formation </span>:""}
                </stencil-route-link>
              </span>

              <span class="navbar-item">
                <stencil-route-link url='/evae/coupleQ'>
                     {sessionStorage.getItem('clé')? <span class="blanche title">
                      <i class="fas fa-star-half-alt"></i> 
                      Qualificatif
                      </span>:""}  
                </stencil-route-link>
              </span>
              
              <span class="navbar-item">
                <stencil-route-link url='/evae/question'>
                 
                   {sessionStorage.getItem('clé')? <span class="blanche title"> <i class="fas fa-question"></i>  Question  </span>:""}
                  
                </stencil-route-link>
              </span>
              


              <a
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbar-content"
                onClick={() => this.toggleBurger()}
                ref={el => (this.burger = el)}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>

           

           
     

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="field is-grouped">

                  <p class="control">
                    <a class="button is-info"
                      onClick={() => this.search()}>
                      <span class="icon">
                        <i class="fas fa-sign-out-alt"></i>
                      </span>
                      <span>Déconnexion</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
