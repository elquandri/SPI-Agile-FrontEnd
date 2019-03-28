import { Component, State, Prop } from "@stencil/core";
import { RouterHistory, LocationSegments } from "@stencil/router";
import { Formation } from "../../../../global/formation";
import { API_URL, END_POINT } from "../../../../global/constantes";
import { checkStatus } from "../../../../global/utils";

@Component({
  tag: "form-home",
  styleUrl: "form-home.scss"
})
export class FormHome {
  @Prop() history: RouterHistory;
  @State() formations: Formation[] = [];
  bgColors = ["blue", "yellow", "orange", "turquoise"];

  componentWillLoad() {
    fetch(API_URL + END_POINT.ADM.FORMATIONS)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.formations = json || []))
      .catch(error =>
        console.log("Error while loading formations: " + error.message)
      );
  }

  getBgColor(index): string {
    let indexCouleur = Math.floor(index % 4);

    if (Math.ceil(index / 4) % 2 == 0) {
      indexCouleur = 3 - indexCouleur;
    }

    return "box " + this.bgColors[indexCouleur];
  }

  afficherDetailDe(formationAAfficher) {
    let segment: LocationSegments = {
      pathname: "/adm/form/detail",
      state: {
        formation: formationAAfficher
      },
      query: null,
      key: null
    };

    this.history.push(segment);
  }

  render() {
    return (
      <div class="form-home container">
        <h1 class="title">Formations de l'établissement</h1> <br />
        <div class="columns is-mobile is-multiline">
          {this.formations.map((formation, index) => {
            return (
              <div class="column is-3">
                <div
                  class={this.getBgColor(index)}
                  onClick={() => this.afficherDetailDe(formation)}
                >
                  <h1 class="title">{formation.nomFormation}</h1>
                  <h2 class="subtitle">({formation.codeFormation})</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
