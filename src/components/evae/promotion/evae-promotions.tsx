import { Component, State, Method, Prop } from "@stencil/core";
import { Promotion } from "../../../global/promotion";
import { Formation } from "../../../global/formation";
import { RouterHistory, LocationSegments } from "@stencil/router";





@Component({
  tag: "evae-promtions",
  styleUrl: "evae-promotions.scss"
})


export class EvaePromotions {

  @State() search: any;
  @Prop() promotions: Promotion[] = [];
  @Prop() formation: Formation;
  @Prop() history: RouterHistory;

  @Method()


  retour() {
    this.history.replace("/evae/formations")
  }
  ShowEtudiants(el) {

    let segment: LocationSegments = {
      pathname: "/evae/promotions/etudiants",
      state: {
        Data: {
          codeFormation: this.formation.codeFormation,
          annee_anniv: el.id.anneeUniversitaire,
          nomFormation: this.formation.nomFormation
        }
      },
      query: null,
      key: null
    };

    this.history.push(segment);

  }

  filtrer() {

    // search by name and code

    let filter = this.search.value.toUpperCase();

    let i, td1, td2, td3;
    let tds = document.getElementsByTagName("td");

    for (i = 0; i < tds.length; i += 3) {

      td1 = tds[i].innerText || tds[i].textContent;
      td2 = tds[i + 1].firstChild;
      td2 = td2.innerText || tds[i + 1].textContent;
      td3 = tds[i + 2].innerText || tds[i + 2].textContent;

      if (td1.toUpperCase().indexOf(filter) > -1 || td2.toUpperCase().indexOf(filter) > -1 || td3.toUpperCase().indexOf(filter) > -1) {
        tds[i].parentElement.style.display = "";
      }
      else {
        tds[i].parentElement.style.display = "none";
      }
    }


  }



  render() {
    return (
      <div class="promotions">


        {/* Header */}

        <section class="hero is-light">
          <div class="hero-body">
            <div class="container">
              <div class="columns">
                <div class="column is-one-half">
                  <h1 class="title">
                    <i class="fas fa-graduation-cap"></i> {this.formation.codeFormation}
                  </h1>
                  <h2 class="subtitle">
                    {this.formation.nomFormation}
                  </h2>
                </div>
                <div class="column is-one-third"></div>
                <div class="column is-one-fifth"></div>
                <div>
                  <br />
                  <button class="button is-info is-medium" onClick={() => { this.retour() }}>
                    <i class="fas fa-arrow-alt-circle-left"></i> &nbsp;RETOUR
                </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br></br>
        <div class="container">
          <div class="columns">
            <div class="column is-one-sixth"></div>
            <div class="column is-one-third">
              <h1 class="promo"> <i class="far fa-list-alt"></i> &nbsp;La liste des promotions </h1>
            </div>
            <div class="column is-one-sixth"></div>
            <div class="column is-one-third">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    class="input is-info is-rounded"
                    type="text"
                    placeholder="RECHERCHE ..."
                    ref={el => (this.search = el)}
                    onInput={() => this.filtrer()}
                  />
                </div>
                <div class="control">
                  <a
                    class="button is-info is-rounded"
                  >
                    Rechercher &nbsp; <i class="fas fa-search"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="column is-one-sixth"></div>
          </div>
        </div>




        {/* table des promotions */}

        <br />

        <div class="columns">
          <div class="column is-one-fifth" />
          <div class="column">

            <div class="box"> 
              <table class="table  is-striped is-fullwidth is-hoverable"  >


                <tr>
                  <th class="subtitle"><b>
                    <center> Année</center>
                    </b></th>
                  <th class="subtitle"> 
                  <center> <b>Promotion</b></center> </th>
                  <th class="subtitle"><b>
                   <center> Responsable </center>
                    </b></th>
                </tr>

                {
                  this.promotions.map((el) => {
                    return (
                      <tr>

                        <td>

                          <button class="button is-text" onClick={() => {
                            this.ShowEtudiants(el)
                          }}>
                            {el.id.anneeUniversitaire}
                          </button>

                        </td>
                        <td>  {el.siglePromotion}</td>
                        <td>
                          {el.enseignant ? el.enseignant.nom + " " + el.enseignant.prenom : ""}

                        </td>
                      </tr>
                    )
                  })

                }

              </table>
            </div>
          </div>
          <div class="column is-one-fifth" />
        </div>


        <br />
      </div>
    )
  }

}
