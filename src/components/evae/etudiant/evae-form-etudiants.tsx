import { Component, Prop, State } from "@stencil/core";
import { RouterHistory, MatchResults } from "@stencil/router";
import { checkStatus } from "../../../global/utils";
import { Etudiant } from "../../../global/etudiant";

@Component({
  tag: "evae-form-etudiants",
  styleUrl: "evae-etudiant.scss"
})
export class EvaeFormEtudiants {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  @State() etudiants:Etudiant[];
  

 

  componentWillLoad() {

    if(!sessionStorage.getItem('clé')){
      location.href = '/adm/authentification/authentification';
    }

    return fetch("https://spi.cleverapps.io/etudiants/promotion/"+
    this.history.location.state.Data.codeFormation+
    "/"+
    this.history.location.state.Data.annee_anniv
    )
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.etudiants = json || []))
      .catch(error =>
        console.log("Error while loading promotions: " + error.message)
      );
  }


  render() {

    return (
      <div class="bg">

        <div>
          <evae-etudiants
            history={this.history}
            formation={this.history.location.state.Data}
            etudiants={this.etudiants}
          />
        </div>
      </div>
    );
  }
}
