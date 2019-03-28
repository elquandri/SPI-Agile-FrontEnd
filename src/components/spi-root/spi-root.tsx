import { Component } from "@stencil/core";
//import { MatchResults as _ } from "@stencil/router"; // _ = !"declared but never read"

@Component({
  tag: "spi-root",
  styleUrl: "spi-root.scss"
})
export class SpiRoot {


  render() {
    return (
      <div>

        {
          sessionStorage.getItem('clé')?<adm-header />:""


        }
        {
          sessionStorage.getItem('ens')?<adm-header />:""


        }

        <main>
          <stencil-router id="main-router">
            <stencil-route-switch scrollTopOffset={0}>


              <stencil-route url="/evae/etudiant" component="spi-etudiant-add"  />
              <stencil-route url="/" component="authentification-authen" exact={true} />

              <stencil-route url="/adm" component="adm-root" exact={true} />
              <stencil-route url="/adm/home" component="adm-home" exact={true} />
              <stencil-route url="/adm/ens" component="ens-home" exact={true} />
              <stencil-route url="/adm/ens/add" component="ens-add" exact={true} />
              <stencil-route url="/adm/ens/search" component="ens-search" exact={true} />
              <stencil-route url="/adm/ens/detail/:noEnseignant" component="ens-detail" />
              <stencil-route url="/adm/form" component="form-home" exact={true} />
              <stencil-route url="/adm/form/detail" component="form-detail" />
              <stencil-route url="/adm/form/add" component="form-add" exact={true} />
              <stencil-route url="/adm/form/search" component="form-search" exact={true} />
              <stencil-route url="/adm/promo" component="promo-home" exact={true} />
              <stencil-route url="/adm/promo/detail" component="promo-detail" />
              <stencil-route url="/adm/promo/add" component="promo-add" exact={true} />
              <stencil-route url="/adm/promo/search" component="promo-search" exact={true} />
                
              <stencil-route url="/evae/formations" component="evae-formations" exact={true} />
              <stencil-route url="/evae/etudiants/add" component="add-etud-form" exact={true} />
              <stencil-route url="/evae/formations/promotions" component="evae-form-promos" exact={true} />
              <stencil-route url="/evae/promotions/etudiants" component="evae-form-etudiants" exact={true} />
              <stencil-route url="/evae/coupleQ" component="evae-couple-qualificatif" exact={true} />
              <stencil-route url="/evae/question" component="evae-question" exact={true} />
              <stencil-route url="/evaluation" component="evaluation-list" exact={true} />
                













                { /* TESTS abdelhak */}



              <stencil-route url="/adm/authentification/authentification" component="authentification-authen" exact={true} />
              <stencil-route url="/role/enseignants" component="spi-enseignant" exact={true} />
              <stencil-route url="/home" component="spi-home" exact={true} />
              <stencil-route component="page-not-found" />








            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
