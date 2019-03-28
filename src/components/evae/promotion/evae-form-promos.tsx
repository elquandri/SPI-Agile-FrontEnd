import { Component, Prop, State } from "@stencil/core";
import { RouterHistory, MatchResults } from "@stencil/router";
import { Promotion } from "../../../global/promotion";
import { checkStatus } from "../../../global/utils";

@Component({
  tag: "evae-form-promos",
  styleUrl: "evae-promotions.scss"
})
export class EvaeFormPromos {
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  @State() promotions:Promotion[];
  
   
  
  componentWillLoad() {
    if(!sessionStorage.getItem('clé')){
      location.href = '/adm/authentification/authentification';
    }
    return fetch("https://spi.cleverapps.io/formations/"+this.history.location.state.formation.codeFormation+"/promotions")
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.promotions = json || []))
      .catch(error =>
        console.log("Error while loading promotions: " + error.message)
      );
  }


  render() {

    return [




      <div class="bg">

        <div>
          <evae-promtions
            history={this.history}
            formation={this.history.location.state.formation}
            promotions={this.promotions}
          />
        </div>
      </div>
       ];
  }
}
