import { Component, State } from "@stencil/core";

@Component({
  tag: "evae-qualificatif",
  styleUrl: "qualificatif.scss"
})
export class EvaeCouple {
    @State() couple : any ={};
  @State() erreur : String;
  @State() max :String;
  @State() min : String;
  @State() id : number;
  formulaire: HTMLFormElement;
  state = { show: false };

  showModal = () => {
    this.state = { show: true };
  };
  hideModal = () => {
    this.state = { show: false };
  };
  @State()
  coupleQ: any;
  componentDidLoad(){
    document.title = "Couple Qualificatif"
  }

  compare(a, b) {
    const IntA = a.minimal.toUpperCase();
    const IntB = b.minimal.toUpperCase();
    let cmp = 0;
    if (IntA > IntB) {
      cmp = 1;
    } else if (IntA < IntB) {
      cmp = -1;
    }
    return cmp;

  }

  componentWillLoad() {
   
  
      if(!sessionStorage.getItem('clé')){
        location.href = '/adm/authentification/authentification';
      }

    return  fetch("https://spi.cleverapps.io/qualificatifs")
      .then(response => response.json())
      .then(data => {
        this.coupleQ = data;
        this.coupleQ.sort(this.compare);
      });
  }

  showpopupS(item) {
    
    this.couple = item;
    let t1 = document.getElementById("supp");
    t1.classList.toggle("is-active");
  }
  showpopupA() {

    let t1 = document.getElementById("ajout");
    t1.classList.toggle("is-active");
  }

  showpopupM(item) {
    
    this.couple = item;
    let t1 = document.getElementById("modif");
    t1.classList.toggle("is-active");
  }
  hidepopupS() {
    let t1 = document.getElementById("supp");
    t1.classList.remove("is-active");

  }
  hidepopupA() {
    let t1 = document.getElementById("ajout");
    t1.classList.remove("is-active");

  }
  hidepopupM() {
    let t1 = document.getElementById("modif");
    t1.classList.remove("is-active");

  }
  hidepopupE() {
    let t1 = document.getElementById("err");
    t1.classList.remove("is-active");

  }
  addCouple(e) {

      e.preventDefault();
     const minimal = this.min;
     const maximal = this.max;

      const monCouple = {
        minimal,
        maximal
      };
     

      fetch("https://spi.cleverapps.io/qualificatifs", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(monCouple)
      }).then(() => {location.href='/evae/coupleQ';
      })
  }
  UpdateCouple(e) {

    e.preventDefault();
    const idQualificatif = this.couple.idQualificatif;
    const minimal = this.couple.minimal;
    const maximal = this.couple.maximal;


    const monCouple = {
      idQualificatif,
      minimal,
      maximal
    };
    

    fetch("https://spi.cleverapps.io/qualificatifs", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(monCouple)
    }).then(() => {location.href='/evae/coupleQ';
    })
  }

  deleteFormation(item) {
    
    return fetch("https://spi.cleverapps.io/qualificatifs", {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item),
    }).then(response => {
      if(response.status == 200){
        location.href='/evae/coupleQ';
      }
      if (response.status == 500) {
        this.hidepopupS();
        setTimeout(function(){ let t1 = document.getElementById("err");
          t1.classList.toggle("is-active"); }, 200);
      }
    }
    );

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
                    <i class="fas fa-clipboard-list"></i> Qualificatif
                  </h1>
                  <h2 class="subtitle">
                  Gestion des qualificatifs
                  </h2>
                </div>
                <div class="column is-one-third"></div>
                <div class="column is-one-fifth"></div>
                <div>
                  <br/>
                  <stencil-route-link url="/home">
                    <button class="button is-info is-medium"><i
                      class="fas fa-arrow-alt-circle-left"></i> &nbsp;RETOUR
                    </button>
                  </stencil-route-link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br/>
        <div class="container ">
          <div class="columns">

            {/*  || La liste des etudiants */}
            <div class="column is-one-third">

            </div>



            <div class="column is-1 head" ></div>
            <div class="column">
              <button class="button is-info is-normal " onClick={() => this.showpopupA()}>
                <i class="fas fa-plus-square"></i>
              </button>
            </div>
          </div>
        </div>
        <br/>
        <div class ="columns">
          <div class="column is-one-fourth">
          </div>
          <div >

            <table class="table box">
              <thead>
              <tr>
                <th class="subtitle" > <center><strong>Valeur Minimale</strong></center></th>
                <th class="subtitle">  <center><strong>Valeur Maximale</strong></center></th>
                <th class="subtitle"> <center><strong>Action</strong></center></th>
              </tr>
              </thead>
              <tbody>
              {this.coupleQ.map(item =>
                <tr>
                  <td>{item.minimal}</td>
                  <td>{item.maximal}</td>
                  <td>
                    <button class="button is-danger  is-normal is-focused is-tooltip-info tooltip"
                            onClick={() => this.showpopupS(item)} data-tooltip="Plus d'infos">
                      <i class="fas fa-trash"></i>
                    </button>
                    &nbsp;  &nbsp;   &nbsp;
                    <button class="button is-info is-normal is-focused is-tooltip-info tooltip"
                            onClick={() => this.showpopupM(item)} data-tooltip="Plus d'infos">
                      <i class="far fa-edit"></i>
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




        <div id="supp" class="modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title"><i class="fas fa-check"></i>&nbsp;Confirmation de suppression</p>
              <button class="delete" onClick={this.hidepopupS.bind(this)} aria-label="close"><i
                class="fas fa-times"></i>
              </button>
            </header>
            <section class="modal-card-body">

                    <div class="columns is-mobile is-centered confirmation">
                      <strong id="upper">êtes-vous sûr de vouloir supprimer ce qualificatif ?</strong>
                    </div>

            </section>
            <footer class="modal-card-foot">
              <button class="button is-danger  " onClick={() => this.deleteFormation(this.couple)}
                      >Confirmer
              </button>
              <button class="button " onClick={this.hidepopupS.bind(this)}>Annuler</button>
            </footer>


          </div>

        </div>

        <div id="ajout" class="modal">
          <div class="modal-background"></div>
              <div class="modal-card">
                  <header class="modal-card-head">
                    <p class="modal-card-title"><i class="fas fa-pen"></i> &nbsp;Nouveau qualificatif</p>
                    <button class="delete" onClick={this.hidepopupA.bind(this)} aria-label="close"><i
                      class="fas fa-times"></i> </button>
                  </header>
                <section class="modal-card-body">
                  <form name="Add">
                  <div class="columns is-multiline is-mobile ">
                    <div class="column is-half">
                      <label class="label"> Valeur Maximale <span class="red"> * </span> </label>
                      <p class="control has-icons-left has-icons-right">
                        <input type="text" placeholder="Maximale " class="input is-info is-rounded is-medium"
                               required
                               onInput={(e: any) => (this.max = e.target.value)}/>
                        <span class="icon is-small is-left">
      <i class="fas fa-signature"></i>
    </span>
                      </p>
                    </div>
                    <div class="column is-half">
                      <label class="label"> Valeur Minimale <span class="red"> * </span> </label>
                      <p class="control has-icons-left has-icons-right">
                        <input type="text" placeholder=" Minimale " class="input is-info is-rounded is-medium"
                               required
                               onInput={(e: any) => (this.min = e.target.value)}/>
                        <span class="icon is-small is-left">
      <i class="fas fa-signature"></i>
    </span>
                      </p>
                    </div>
                  </div>
                  </form>
                </section>
                <footer class="modal-card-foot">
                  <button class="button is-success  " onClick={this.addCouple.bind(this)}
                          type="submit">Ajouter
                  </button>
                  <button class="button " onClick={this.hidepopupA.bind(this)}>Annuler</button>
                </footer>

          </div>

        </div>

        <div id="modif" class="modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title"><i class="fas fa-pen"></i> Modification d'un qualificatif</p>
              <button class="delete" onClick={this.hidepopupM.bind(this)} aria-label="close"><i
                class="fas fa-times"></i> </button>
            </header>
            <section class="modal-card-body">
                  <form ref={el => (this.formulaire = el)} name="update">
                    <div class="columns is-multiline is-mobile ">
                      <div class="column is-half">
                        <label class="label"> Valeur Minimale <span class="red"> * </span> </label>
                        <p class="control has-icons-left has-icons-right">
                          <input type="text"  class="input is-info is-rounded is-medium"
                                 required value={this.couple.minimal}
                                 onInput={(e: any) => (this.couple.minimal = e.target.value)}/>
                          <span class="icon is-small is-left">
      <i class="fas fa-signature"></i>
    </span>
                        </p>
                      </div>
                      <div class="column is-half">
                        <label class="label"> Valeur Maximale <span class="red"> * </span> </label>
                        <p class="control has-icons-left has-icons-right">
                          <input type="text" class="input is-info is-rounded is-medium"
                                 required value={this.couple.maximal}
                                 onInput={(e: any) => (this.couple.maximal = e.target.value)}/>
                          <span class="icon is-small is-left">
      <i class="fas fa-signature"></i>
    </span>
                        </p>
                      </div>
                    </div>
                  </form>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success  " onClick={this.UpdateCouple.bind(this)}
                      type="submit">Confirmer
              </button>
              <button class="button "  onClick={this.hidepopupM.bind(this)}>Annuler</button>
            </footer>

          </div>

        </div>

        <div id="err" class="modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title red" ><i class="fas fa-exclamation-triangle"></i>  &nbsp; Erreur </p>
              <button class="delete" onClick={this.hidepopupE.bind(this)} aria-label="close"><i
                class="fas fa-times"></i>
              </button>
            </header>
            <section class="modal-card-body">

                    <div class="columns is-mobile is-centered confirmation">
                      <strong id="upper"> Le qualificatif est déjà utilisé dans une évaluation. Vous ne pouvez pas le supprimer </strong>
                    </div>
            </section>

            <footer class="modal-card-foot">
              <button class="button is-dark bt" onClick={this.hidepopupE.bind(this)}>OK</button>
            </footer>

          </div>

        </div>
      </div>




    );}
}
