import { Component, State, Method, Prop } from "@stencil/core";
import { Formation } from "../../../global/formation";
import { END_POINT } from "../../../global/constantes";
import { checkStatus } from "../../../global/utils";
import { RouterHistory, LocationSegments } from "@stencil/router";



// la liste des fomartions ( avec Willload)
// rechercher une formation par nom ou bien par code  ( fonction : filtrer)
// chaque nom de formation contient un lien vers ses promotions  

@Component({
  tag: "evae-formations",
  styleUrl: "evae-formations.scss"
})



export class EvaeFormations {




  @Prop() history: RouterHistory;
  @State() search: any;
  formations: Formation[] = [];

  @Method()

  componentDidLoad() {
    document.title = "LES FORMATIONS"
  }

  ShowPromotions(el) {


    let segment: LocationSegments = {
      pathname: "/evae/formations/promotions",
      state: {
        formation: el
      },
      query: null,
      key: null
    };

    this.history.push(segment);

  }


  filtrer() {

    // search by name and code

    let filter = this.search.value.toUpperCase();

    let i, td1, td2;
    let tds = document.getElementsByTagName("td");

    for (i = 0; i < tds.length; i += 2) {
      td1 = tds[i].innerText || tds[i].textContent;
      td2 = tds[i + 1].firstChild;
      td2 = td2.innerText || tds[i + 1].textContent;

      console.log(td2)

      if (td1.toUpperCase().indexOf(filter) > -1 || td2.toUpperCase().indexOf(filter) > -1) {
        tds[i].parentElement.style.display = "";
      }
      else {
        tds[i].parentElement.style.display = "none";
      }
    }


  }


  componentWillLoad() {
    if (!sessionStorage.getItem('clé')) {
      location.href = '/adm/authentification/authentification';
    }
    return fetch("https://spi.cleverapps.io/" + END_POINT.ADM.FORMATIONS)
      .then(response => checkStatus(response))
      .then(response => response.json())
      .then(json => (this.formations = json || []))
      .catch(error =>
        console.log("Error while loading formations: " + error.message)
      );
  }

  render() {

    return [


      <div class="formations bg">


        <br /><br />

        <div class="columns">
          <div class="column is-one-fifth"> </div>
          <div class="column is-one-third">
            <span class="title"> <i class="fas fa-university"></i> &nbsp;La liste des formations </span>
          </div>
          <div class="column is-one-fifth"></div>
          <div>
            <div class="column is-one-fifth">
              <stencil-route-link url="/home">
                <button class="button is-info is-medium"><i
                  class="fas fa-arrow-alt-circle-left"></i> &nbsp;RETOUR
                    </button>
              </stencil-route-link>
            </div>
          </div>
        </div>

        <br />
        <div class="container">


          <div class="columns is-centered">
            <div class="column is-4">
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
          </div>
        </div>,

             <br />
        <br />
        <div class="columns">
          <div class="column is-one-fifth" />
          <div class="column">
            <div class="box">
              <table class="table is-striped is-fullwidth is-hoverable" id="MyTab">


                <tr>
                  <th class="subtitle"><b>Code</b></th>
                  <th class="subtitle"> <center> <b> 
                     <center>Formation</center>
                    </b></center> </th>
                </tr>

                {
                  this.formations.map((el) => {
                    return (
                      <tr>
                        <td> {el.codeFormation}</td>
                        <td>

                          <button onClick={() => { this.ShowPromotions(el) }}
                            class="button is-text" >{el.nomFormation}</button>

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
      </div>

    ]
  }

}
