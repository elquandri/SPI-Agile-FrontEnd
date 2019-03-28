import { Component, State } from "@stencil/core";

@Component({
  tag: "evaluation-list",
  styleUrl: "evaluation-list.scss"
})
export class EvaluationList {
  @State() evaluation : any ={};
  @State() search: any;
  @State() evaluations: any = [];
  @State() dateDebut : String = "";
  @State() dateFin : String = "";
  @State() idPromotion : any = {};
  @State() codeEc : String = " ";
  @State() uniteEnseignement : any = {};
  @State() codeUe : String = "";
  formulaire: HTMLFormElement;
  state = { show: false };

  showModal = () => {
    this.state = { show: true };
  };
  hideModal = () => {
    this.state = { show: false };
  };

  showpopupD(item) {
  this.evaluation = item;
  console.log(item.elementConstitutif);
  this.idPromotion = item.promotion.id;
  this.dateDebut = item.debutReponse;
  this.dateFin = item.finReponse;
  this.codeUe =item.uniteEnseignement.id.codeUe;
    console.log(item.uniteEnseignement);
  if(item.elementConstitutif != null){
    this.codeEc = item.elementConstitutif.id;
  }
  this.uniteEnseignement = item.uniteEnseignement;
    let t1 = document.getElementById("detail");
    t1.classList.toggle("is-active");
  }

  hidepopupD() {
    let t1 = document.getElementById("detail");
    t1.classList.remove("is-active");

  }




  componentDidLoad() {
    document.title = "Evaluation"
  }



  componentWillLoad() {
    let noens = sessionStorage.getItem('noens');
    if(!sessionStorage.getItem('ens')){
      location.href = '/adm/authentification/authentification';
    }
    fetch("http://app-60a2cf65-cf8a-4e77-a835-c8c9d1f98798.cleverapps.io/evaluation/ens/" + noens)
      .then(response => response.json())
      .then(data => {
        this.evaluations = data;
        console.log(this.evaluations)
      });

  }

  filtrer() {

    let filter = this.search.value.toUpperCase();

    let i, td1, td2,td3,td4;
    let tds = document.getElementsByTagName("td");

    for (i = 0; i < tds.length; i += 5) {

      td1 = tds[i].innerText || tds[i].textContent;
      td2 = tds[i + 1].firstChild;
      td2 = td2.innerText || tds[i + 1].textContent;
      td3 = tds[i + 2].innerText || tds[i + 2].textContent;
      td4 = tds[i + 3].innerText || tds[i + 3].textContent;



      if (td1.toUpperCase().indexOf(filter) > -1 || td2.toUpperCase().indexOf(filter) > -1 || td3.toUpperCase().indexOf(filter) > -1 || td4.toUpperCase().indexOf(filter) > -1 ){
      tds[i].parentElement.style.display = "";
      }
      else {
        tds[i].parentElement.style.display = "none";
      }
    }

  }





  render() {
    return (


      <div>
        <section class="hero is-light">
          <div class="hero-body">
            <div class="container">
              <div class="columns">
                <div class="column is-one-half">
                  <h1 class="title">
                    <i class="fas fa-clipboard-list"></i> Evaluation
                  </h1>
                  <h2 class="subtitle">
                    Gestion des evaluations
                  </h2>
                </div>
                <div class="column is-one-third"></div>
                <div class="column is-one-fifth"></div>

              </div>
            </div>
          </div>
        </section>
        <br />
        <div class="container ">
          <div class="columns">

            <div class="column is-one-third">

            </div>
            <div class="column is-one-third">
              <div class="column is-one-fourth"></div>
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    class="input is-info is-rounded"
                    type="text"
                    placeholder="RECHERCHE ... "
                    ref={el => (this.search = el)}
                    onInput={() => this.filtrer()}
                  />
                </div>
                <div class="control">
                  <a
                    class="button is-info is-rounded"
                  >
                    <i class="fas fa-search"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="column is-one-fourth"></div>
            <div class="column is-one-third ajouter">
              <button class="button is-info is-normal" >
                <i class="fas fa-plus-square"></i>
              </button>
            </div>
          </div>
        </div>
        <br />
        <div class="columns">
          <div class="column is-one-fourth">
          </div>
          <div >

            <table class="table box">
              <thead>
              <tr>
                <th class="subtitle"> <strong><center>Sujet</center></strong></th>
                <th class="subtitle"><strong><center>Période</center></strong></th>
                <th class="subtitle" > <strong><center>Début</center></strong></th>
                <th class="subtitle"> <strong><center>Fin</center></strong></th>
                <th class="subtitle"><strong><center>Détail</center></strong></th>


              </tr>
              </thead>
              <tbody>
              {this.evaluations.map(item =>
                <tr>
                  <td>{item.designation}</td>
                  <td>{item.periode}</td>
                  <td>{(item.debutReponse).substr(0,10)}</td>
                  <td>{(item.finReponse).substr(0,10)}</td>
                  <td>
                    <button class="button is-info  is-focused is-tooltip-info tooltip" onClick={() => this.showpopupD(item)}
                             data-tooltip="Plus d'infos" >
                      <i class="fas fa-info-circle"></i>
                    </button>

                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <div class="column is-one-fourth">
          </div>
        </div>

        <div id="detail" class="modal">
          <div class="modal-background"></div>
          <div class="modal-card ">
            <header class="modal-card-head">
              <p class="modal-card-title"><i class="fas fa-info-circle"></i> &nbsp;Détail</p>
              <button class="delete" onClick={this.hidepopupD.bind(this)} aria-label="close"><i
                class="fas fa-times"></i></button>
            </header>
            <section class="modal-card-body">
              <form name="Add">
                <div class="columns is-multiline is-mobile ">
                  <div class="column is-half">
                    <strong class="elqa"> <i class="fas fa-feather-alt"></i> Sujet : </strong> {this.evaluation.designation}
                  </div>
                  <div class="column is-half">
                    <strong class="elqa"> <i class="fas fa-hourglass-half"></i>   Période :  </strong> {this.evaluation.periode}
                  </div>
                  <div class="column is-half">
                    <strong class="elqa"> <i class="fas fa-calendar-week"></i> Début : </strong> {this.dateDebut.substr(0, 10)}
                  </div>
                  <div class="column is-half">
                    <strong class="elqa"> <i class="fas fa-calendar-week"></i> Fin : </strong>  {this.dateFin.substr(0, 10)}
                  </div>
                  <div class="column is-half">
                    <strong class="elqa"> <i class="fas fa-graduation-cap"></i> Formation :</strong> {this.idPromotion.codeFormation}
                  </div>
                  <div class="column is-half">
                    <strong class="elqa"> <i class="fas fa-users"></i> Promotion :  </strong>{this.idPromotion.anneeUniversitaire}
                  </div>
                  <div class="column is-half">
                    <strong class="elqa"> <i class="fas fa-book"></i> Module : </strong>{this.codeUe }
                  </div>
                  <div class="column is-half">
                    <strong class="elqa"> <i class="fas fa-book"></i> Élément : </strong>{this.codeEc}
                  </div>
                  <div class="column is-half">
                    <strong class="elqa"> <i class="fas fa-book-open"></i> Désignation : </strong>{this.uniteEnseignement.designation}
                  </div>
                </div>
              </form>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-dark bt" onClick={this.hidepopupD.bind(this)}>Retour</button>
            </footer>

          </div>

        </div>

      </div>




    );
  }
}
