import { Component, Prop } from "@stencil/core";
import { RouterHistory, MatchResults } from "@stencil/router";


@Component({
  tag: "add-etud-form",
  styleUrl: "evae-etudiant-add.scss"
})
export class EvaeFormEtudiants {

 

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;


  componentWillLoad() {
    if(!sessionStorage.getItem('clé')){
      location.href = '/adm/authentification/authentification';
    }
  }

  render() {

    return (
      <div class="bg">
        <div class="container">
        <br></br>
           <div class="columns">
           <div class="column is-one-sixth"></div>
           <evae-etudiant-add
            history={this.history}
            Data={this.history.location.state.Data}
          />

          <div class="column is-one-sixth"></div>
           </div>
           
        </div>
          

        </div>
    );

  }
}
