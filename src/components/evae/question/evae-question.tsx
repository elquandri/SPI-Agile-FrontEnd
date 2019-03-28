import { Component, State } from "@stencil/core";

@Component({
  tag: "evae-question",
  styleUrl: "evae-question.scss"
})
export class EaveQuestion {
  @State() intitule: string;
  @State() idEns: number;
  @State() idQual: number;
  @State() errorMsg:any;
  @State() type: string;
  @State() question: any = {};
  @State() qualificatif: any = {};
  @State() enseignant: any = {};
  @State() erreur: String;
  @State() max: String;
  @State() min: String;
  @State() id: number;
  @State() search: any;
  @State() enseignants: any = [];
  @State() qualificatifs: any = [];
  formulaire: HTMLFormElement;
  state = { show: false };

  showModal = () => {
    this.state = { show: true };
  };
  hideModal = () => {
    this.state = { show: false };
  };
  @State()
  questions: any = [];

  componentDidLoad() {
    document.title = "Questions standards"
  }



  componentWillLoad() {

    if (!sessionStorage.getItem('clé')) {
      location.href = '/adm/authentification/authentification';
    }

    fetch("https://spi.cleverapps.io/Questions")
      .then(response => response.json())
      .then(data => {
        this.questions = data;
        this.questions.sort(this.compare);
      });
  
    fetch("https://spi.cleverapps.io/enseignant/getAllEnseignant")
      .then(response => response.json())
      .then(data => {
        this.enseignants = data;

      });
    fetch("https://spi.cleverapps.io/qualificatifs")
      .then(response => response.json())
      .then(data => {
        this.qualificatifs = data;
      });
  }
  compare(a, b) {
    const IntA = a.intitule.toUpperCase();
    const IntB = b.intitule.toUpperCase();
    let cmp = 0;
    if (IntA > IntB) {
      cmp = 1;
    } else if (IntA < IntB) {
      cmp = -1;
    }
    return cmp;

  }

  filtrer() {

    let filter = this.search.value.toUpperCase();

    let i, td1, td2;
    let tds = document.getElementsByTagName("td");

    for (i = 0; i < tds.length; i += 3) {

      td1 = tds[i].innerText || tds[i].textContent;
      td2 = tds[i + 1].innerText || tds[i + 1].textContent;



      if (td1.toUpperCase().indexOf(filter) > -1 || td2.toUpperCase().indexOf(filter) > -1) {
        tds[i].parentElement.style.display = "";
      }
      else {
        tds[i].parentElement.style.display = "none";
      }
    }

  }



  showpopupS(item) {
    
    this.question = item;
    let t1 = document.getElementById("supp");
    t1.classList.toggle("is-active");
  }
  showpopupA() {

    let t1 = document.getElementById("ajout");
    t1.classList.toggle("is-active");
  }

  showpopupM(item) {
    
    this.question = item;
   
    this.qualificatif = item.qualificatif;
    this.idQual=item.qualificatif.idQualificatif;
    this.enseignant = this.question.enseignant;
    let t1 = document.getElementById("modif");
    t1.classList.toggle("is-active");
  }

  hidepopupS() {
    let t1 = document.getElementById("supp");
    t1.classList.remove("is-active");

  }
  hidepopupA() {
    this.errorMsg="";
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
  hidepopupF() {
    let t1 = document.getElementById("fixation");
    t1.classList.remove("is-active");

  }
  addquestion(e) {
    e.preventDefault();
    const intitule = this.intitule;
    const type = "QUS";
    const qualificatif = { idQualificatif: this.idQual };


    const maQuestion = {
      intitule,
      type,
      qualificatif
    };
    
    if(this.qualificatifs!=null) {

      fetch("https://spi.cleverapps.io/Questions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(maQuestion)
    })
    .then(response => {
      if (response.status == 500) {
        this.errorMsg=<span class="errorMsg"> <i class="fas fa-exclamation-triangle"></i> Veuillez remplir tous les champs</span>
      } else{
        location.href = '/evae/question';
      }
    }
    )
  }

  }

  

  selected(event){
      this.idQual=event.target.value;
  }



  UpdateCouple(e) {

    e.preventDefault();
    const idQuestion = this.question.idQuestion;
    const intitule = this.question.intitule;
    const type = "QUS";
    const qualificatif = { idQualificatif: this.idQual };
    const enseignant = this.question.enseignant;
    const maQuestion = {
      idQuestion,
      intitule,
      type,
      enseignant,
      qualificatif
    };
    console.log(JSON.stringify(maQuestion));

    fetch("https://spi.cleverapps.io/Questions", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(maQuestion)
    }).then(response => {
      if (response.status == 200) {
        location.href = '/evae/question';
      }
       /*if (response.status == 500) {
        setTimeout(function () {
          let t1 = document.getElementById("fixation");
          t1.classList.toggle("is-active");
        }, 200);
      }*/
      
    }
    );

    //.then(() => {location.href='/evae/question';
    // })
  }

  deleteQuestion(item) {
    
    return fetch("https://spi.cleverapps.io/Questions", {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item),
    }).then(response => {
      if (response.status == 200) {
        location.href = '/evae/question';
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
                    <i class="fas fa-clipboard-list"></i> Question standard
                  </h1>
                  <h2 class="subtitle">
                    Gestion des questions standards
                  </h2>
                </div>
                <div class="column is-one-third"></div>
                <div class="column is-one-fifth"></div>
                <div>
                  <br />
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
              <button class="button is-info is-normal" onClick={() => this.showpopupA()}>
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
                  <th class="subtitle"> <strong><center>Question</center></strong></th>
                  <th class="subtitle" > <strong><center>Réponse</center></strong></th>
                  <th class="subtitle"> <strong><center>Action</center></strong></th>

                </tr>
              </thead>
              <tbody>
                {this.questions.map(item =>
                  <tr>
                    <td>{item.intitule}</td>
                    <td>{item.qualificatif.minimal}  /  {item.qualificatif.maximal}</td>
                    <td>
                      <button class="button is-danger  is-focused is-tooltip-info tooltip"
                        onClick={() => this.showpopupS(item)} data-tooltip="Plus d'infos">
                        <i class="fas fa-trash"></i>
                    </button>
                      &nbsp;&nbsp;&nbsp;
                      <button class="button is-info  is-focused is-tooltip-info tooltip"
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
                <strong id="upper">êtes-vous sûr de vouloir supprimer cette question standard ?</strong>
              </div>

            </section>
            <footer class="modal-card-foot">
              <button class="button is-danger  " onClick={() => this.deleteQuestion(this.question)}
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
              <p class="modal-card-title"><i class="fas fa-pen"></i> &nbsp;Nouvelle Question Standard</p>
              <button class="delete" onClick={this.hidepopupA.bind(this)} aria-label="close"><i
                class="fas fa-times"></i></button>
            </header>
            <section class="modal-card-body">
              <form name="Add">
                <div >
                  <div>
                    <label class="label"> Question <span class="red"> * </span> </label>
                    <p class="control has-icons-left has-icons-right">
                      <input type="text"   placeholder="Question " class="input is-info is-rounded is-medium"
                        required
                        onInput={(e: any) => (this.intitule = e.target.value)} />
                      <span class="icon is-small is-left">
                        <i class="fas fa-feather-alt"></i>
                      </span>
                    </p>
                  </div>
                <br/>
                  <div>
                    <label class="label"> Réponse <span class="red"> * </span> </label>
                    <p class="control has-icons-left has-icons-right">
                      <div class="select is-info is-rounded is-medium">
                        <select  required aria-required="true"  class="is-rounded is-info" onInput={(event) => this.selected(event)}>
                        <option></option>
                          {this.qualificatifs.map(item =>
                            <option value={item.idQualificatif}>{item.minimal} / {item.maximal}</option>
                          )}
                        </select>
                      </div>
                      <span class="icon is-small is-left">
                        <i class="fas fa-list-ol"></i>
                      </span>
                    </p>
                  </div>
                </div>
              </form>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success  " onClick={this.addquestion.bind(this)}
                type="submit">Ajouter
                  </button>
              <button class="button " onClick={this.hidepopupA.bind(this)}>Annuler</button>
              {this.errorMsg}
            </footer>

          </div>

        </div>

        <div id="modif" class="modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title"><i class="fas fa-pen"></i> Modification d'une question standard </p>
              <button class="delete" onClick={this.hidepopupM.bind(this)} aria-label="close"><i
                class="fas fa-times"></i> </button>
            </header>
            <section class="modal-card-body">
              <form ref={el => (this.formulaire = el)} name="update">
                <div >
                  <div >
                    <label class="label"> Question <span class="red"> * </span> </label>
                    <p class="control has-icons-left has-icons-right">
                      <input type="text" class="input is-info is-rounded is-medium"
                        required value={this.question.intitule}
                        onInput={(e: any) => (this.question.intitule = e.target.value)} />
                      <span class="icon is-small is-left">
                        <i class="fas fa-feather-alt"></i>
                      </span>
                    </p>
                  </div>

                  <br/>
                  <div>
                    <label class="label"> Réponse <span class="red"> * </span> </label>
                    <p class="control has-icons-left has-icons-right">
                      <div class="select is-info is-rounded is-medium">
                        <select  class="is-rounded is-info" 
                          onInput={(event) => this.selected(event)}>
                          {this.qualificatifs.map(item =>
                            <option  selected={this.qualificatif.idQualificatif == item.idQualificatif}  value={item.idQualificatif}>{item.minimal} / {item.maximal}</option>
                          )}
                        </select>
                      </div>
                      <span class="icon is-small is-left">
                        <i class="fas fa-list-ol"></i>
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
              <button class="button " onClick={this.hidepopupM.bind(this)}>Annuler</button>
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
                <strong id="upper"> La question standard est utilisée dans une évaluation, Vous ne pouvez pas la supprimer </strong>
              </div>
            </section>

            <footer class="modal-card-foot">
              <button class="button is-dark bt" onClick={this.hidepopupE.bind(this)}>OK</button>
            </footer>

          </div>

        </div>

      </div>




    );
  }
}
