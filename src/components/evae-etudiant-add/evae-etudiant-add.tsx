import { Component, Prop, State } from "@stencil/core";
import { CONTRAINTES_VALIDATION } from "../../global/constantes";
import { RouterHistory , LocationSegments} from "@stencil/router";



@Component({
  tag: "evae-etudiant-add",
  styleUrl: "evae-etudiant-add.scss"
})
export class EvaeEtudiantAdd {

  @State() nom: string;
  @State() noEtudiant: string;
  @State() prenom: string;
  @State() sexe: string;
  @State() paysOrigine: string;
  @State() nationalite: string;
  @State() dateNaissance: Date;
  @State() lieuNaissance: string;
  @State() mobile: string;
  @State() telephone: string;
  @State() email: string;
  @State() emailUbo: string;
  @State() ville: string;
  @State() codePostal: string;
  @State() adresse: string;
  @State() universiteOrigine: string;
  @State() groupeTP: number;
  @State() groupeAnglais: number;
  @State() idPromo: any = {};
  @State() promotion: any = {};
  @Prop() etudiant: any = {};
  @State() pays: any = [];
  @State() promotions: any = [];
  @State() nationalities: any = [];
  @State() univ: any = [];
  @Prop() history: RouterHistory;
  formulaire: HTMLFormElement;
  @Prop() Data: any = {}; //   codeFormation:anneeUniversitaire // codeFormation
  state = { show: false };

  showModal = () => {
    this.state = { show: true };
  };
  hideModal = () => {
    this.state = { show: false };
  };


  componentWillLoad() {
    if(!sessionStorage.getItem('clé')){
      location.href = '/adm/authentification/authentification';
    }
    fetch("https://app-2739eadb-7a9f-4aac-81a4-7d931d63f417.cleverapps.io/promotions")
      .then(response => response.json())
      .then(data => {
        
        this.promotions = data; 
      });
    fetch("../../assets/pays.json")
      .then(response => response.json())
      .then(data => {
        this.pays = data || [];
      });

    fetch("https://app-2739eadb-7a9f-4aac-81a4-7d931d63f417.cleverapps.io/cgrefcodes/UNIVERSITE")
      .then(response => response.json())
      .then(data => {
        this.univ = data || []; 
      });

  }
  showpopupS(e) {
    e.preventDefault();
    let t1 = document.getElementById("supp");
    t1.classList.toggle("is-active");
  }
  hidepopupS() {
    let t1 = document.getElementById("supp");
    t1.classList.remove("is-active");

  }

  retour(e){
    e.preventDefault();
    let segment: LocationSegments = {
      pathname: "/evae/promotions/etudiants",
      state: {
        Data: {
           codeFormation:this.Data.codeFormation,
           annee_anniv:this.Data.anneeUniversitaire,
           nomFormation:this.Data.nomFormation
        }
      },
      query: null,
      key: null
    };
    this.history.push(segment);
    
  }

  addEtudiant(e) {
    if (this.formulaire.checkValidity()) {
      e.preventDefault();
      const noEtudiant = this.noEtudiant;
      const promotion = { id: this.Data };
      const adresse = this.adresse;
      const nationalite = this.nationalite;
      const paysOrigine = this.paysOrigine;
      const dateNaissance = this.dateNaissance;
      const lieuNaissance = this.lieuNaissance;
      const universiteOrigine = this.universiteOrigine;
      const nom = this.nom;
      const prenom = this.prenom;
      const email = this.email;
      const emailUbo = this.emailUbo + "@univ-brest.fr";
      const telephone = this.telephone;
      const mobile = this.mobile;
      const sexe = this.sexe;
      const ville = this.ville;
      const codePostal = this.codePostal;
      const groupeAnglais = this.groupeAnglais;
      const groupeTP = this.groupeTP;


      const monEtudiant = {
        noEtudiant,
        adresse,
        sexe,
        nom,
        prenom,
        universiteOrigine,
        email,
        telephone,
        paysOrigine,
        promotion,
        mobile,
        emailUbo,
        nationalite,
        dateNaissance,
        lieuNaissance,
        codePostal,
        ville,
        groupeAnglais,
        groupeTP,

      };

      fetch("http://spidosi.cleverapps.io/etudiants", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify(monEtudiant)
      }).then(() => {
      this.retour(e);
      })

    } else {
      this.formulaire.reportValidity();
    }
  }


  handleValidity(e, texteContrainte): void {
    let element: HTMLInputElement = e.target;
    texteContrainte.replace("tt", "");

    if (!element.checkValidity() && element.value != "") {
      element.classList.add("is-danger");
      element.title = texteContrainte;
    } else {
      element.classList.remove("is-danger");
      element.title = "";
      this.handleInput(e);
    }
  }
  handleInput(e) {
    let element = e.target;

    let field = element.dataset["field"];

    this.etudiant[field] = element.value;
  }

  goBack(): any {
    //this.history.push("/adm", {});
  }




  render() {
    return (
      <div >
        <form ref={el => (this.formulaire = el)}>
          <div class="columns">
            <div class="column is-one-third"></div>
            <div class="column is-one-third">
              <h1 class="title is-3 en"> <i class="fas fa-user-graduate"></i> Ajouter un étudiant </h1>
            </div>
            <div class="column is-one-sixth"></div>
             <div class="column is-one-sixth">
             <br></br>
             <button  class="button is-info is-medium" onClick={(e) => this.showpopupS(e)} >
                         <i class="fas fa-arrow-alt-circle-left"></i> &nbsp;RETOUR 
                </button>
             </div>
          </div>

          <br></br>
          <div class="columns is-multiline is-mobile box">
            <div class="column is-half">
              <label class="label"> Code étudiant <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <input type="text" placeholder="Code étudiant " class="input is-info is-rounded is-medium" required maxlength="8"
                  onInput={(e: any) => (this.noEtudiant = e.target.value)} />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label"> Civilité <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <div class="select is-info is-rounded is-medium">
                  <select
                    required aria-required="true" class="is-rounded is-info"
                    onInput={(e: any) => { (this.sexe = e.target.value) }} >
                    <option> </option>
                    <option value="H">Monsieur</option>
                    <option value="F">Madame</option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i class="fas fa-mars"></i> <i class="fas fa-venus"></i>
                </span>
              </p>
            </div>


            <div class="column is-half">
              <label class="label">Nom <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <input type="text" placeholder="Nom " class="input is-info is-rounded is-medium" value={this.nom}
                  onInput={(e: any) => {
                    this.nom = e.target.value.substr(0, e.target.value.length).toUpperCase();
                    this.handleValidity(e, CONTRAINTES_VALIDATION.NOM);
                   
                  }} required />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label">Prénom <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <input type="text" placeholder="Prénom " class="input is-info is-rounded is-medium" required
                  value={this.prenom} onInput={(e: any) => {
                    this.prenom = e.target.value.substr(0, 1).toUpperCase() + e.target.value.
                      substr(1, e.target.value.length).toLowerCase();
                    this.handleValidity(e, CONTRAINTES_VALIDATION.PRENOM);
                  }} />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>

            <div class="column is-half">
              <label class="label">Date de naissance <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <input type="Date" placeholder="Date de Naissance" class="input is-info is-rounded is-medium" required
                  onInput={(e: any) => {
                    (this.dateNaissance = e.target.value);
                    this.handleValidity(e, CONTRAINTES_VALIDATION.DATE_NAISSANCE)
                  }} />
                <span class="icon is-small is-left">
                  <i class="fas fa-calendar-week"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label">Lieu de naissance <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <input type="text" placeholder="Lieu de naissance" class="input is-info is-rounded is-medium" required
                  onInput={(e: any) => {
                    (this.lieuNaissance = e.target.value);
                    this.handleValidity(e, CONTRAINTES_VALIDATION.LIEU_NAISSANCE)
                  }} />

                <span class="icon is-small is-left">
                  <i class="fas fa-map-marker-alt"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label"> Nationalité <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <div class="select is-info is-rounded is-medium">
                  <select required aria-required="true" onInput={(e: any) => {
                    (this.nationalite = e.target.value.substr(0,3).toUpperCase());
                    this.handleValidity(e, CONTRAINTES_VALIDATION.NATIONALITE);
                  }}>
                    <option></option>
                    {this.pays.map(item =>
                      <option value={item.nationalite}>{item.nationalite}</option>
                    )}
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i class="fas fa-flag"></i>

                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label">Mobile </label>
              <p class="control has-icons-left has-icons-right">
                <input type="text" placeholder="Mobile " class="input is-info is-rounded is-medium"
                  pattern="^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$"
                  onInput={(e: any) => {
                    (this.mobile = e.target.value.replace(/\B(?=(\d{2})+(?!\d))/g, " "));
                    this.handleValidity(e, CONTRAINTES_VALIDATION.MOBILE);

                  }}

                />
                <span class="icon is-small is-left">
                  <i class="fas fa-phone"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label">Téléphone  </label>
              <p class="control has-icons-left has-icons-right">
                <input type="tel" placeholder="Téléphone " class="input is-info is-rounded is-medium"
                  pattern="^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$"
                  onInput={(e: any) => {
                    (this.telephone = e.target.value.replace(/\B(?=(\d{2})+(?!\d))/g, " "));
                    this.handleValidity(e, CONTRAINTES_VALIDATION.TELEPHONE);
                  }} />
                <span class="icon is-small is-left">
                  <i class="fas fa-phone"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label">Email<span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <input type="email"
                  placeholder="Email" class="input is-info is-rounded is-medium" required
                  onInput={(e: any) => {
                    (this.email = e.target.value);
                    this.handleValidity(e, CONTRAINTES_VALIDATION.EMAIL)
                  }}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-at"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label">Email UBO </label>
              <div class="field has-addons">
                <p class="control  has-icons-left has-icons-right">
                  <input
                    class="input is-medium is-rounded email is-info"
                    type="text"
                    placeholder="Email UBO"
                    value={this.emailUbo}
                    data-field="emailUbo"
                    onInput={(e: any) => {
                    this.emailUbo = e.target.value;
                      this.handleValidity(
                        e,
                        CONTRAINTES_VALIDATION.EMAIL_UBO
                      )
                    }
                    }

                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-at"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-static is-rounded is-medium">@univ-brest.fr</a>
                </p>
              </div>

            </div>
            <div class="column is-half">
              <label class="label">Adresse <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <input type="text" placeholder="Adresse " class="input is-info is-rounded is-medium" required
                  onInput={(e: any) => {
                    (this.adresse = e.target.value);
                    this.handleValidity(e, CONTRAINTES_VALIDATION.ADRESSE)
                  }} />
                <span class="icon is-small is-left">
                  <i class="fas fa-map-marker-alt"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label">Code Postal </label>
              <p class="control has-icons-left has-icons-right">
                <input type="text" placeholder="Code postal" class="input is-info is-rounded is-medium" minlength="5" maxlength="5" pattern="[0-9\(\)]+"
                  title="5 digits"
                  onInput={(e: any) => {
                    (this.codePostal = e.target.value);
                    this.handleValidity(e, CONTRAINTES_VALIDATION.CODE_POSTALE)
                  }} />
                <span class="icon is-small is-left">
                  <i class="fas fa-map-marked-alt"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label">Ville <span class="red"> * </span>  </label>
              <p class="control has-icons-left has-icons-right">
                <input type="text" placeholder="Ville" class="input is-info is-rounded is-medium" required
                  onInput={(e: any) => {
                    (this.ville = e.target.value);
                    this.handleValidity(e, CONTRAINTES_VALIDATION.VILLE)
                  }} />
                <span class="icon is-small is-left">
                  <i class="fas fa-map-marked-alt"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label"> Pays d'origine <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <div class="select is-info is-rounded is-medium">
                  <select  required aria-required="true" onInput={(e: any) => {
                    this.paysOrigine = e.target.value.substr(0,3).toUpperCase();
                  }} >
                    <option></option>
                    {this.pays.map(item =>
                      <option value={item.libelle}>{item.libelle}</option>
                    )}
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i class="fas fa-globe-americas"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label"> Université d'origine <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <div class="select is-info is-rounded is-medium">
                  <select  required aria-required="true" class="is-rounded is-info" 
                    onInput={(e: any) => (this.universiteOrigine = e.target.value)}>
                    <option></option>
                    {this.univ.map(item =>
                      <option  value={item.rvLowValue}>{item.rvMeaning}</option>
                    )}
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i class="fas fa-university"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label"> Groupe TP <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <div class="select is-info is-rounded is-medium">
                  <select
                    required aria-required="true" class="is-rounded is-info"
                    onInput={(e: any) => (this.groupeTP = e.target.value)}>
                    <option></option>
                    <option  value="1">Groupe 1</option>
                    <option value="2">Groupe 2</option>
                    <option value="3">Groupe 3</option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i class="fas fa-sort-numeric-up"></i>
                </span>
              </p>
            </div>
            <div class="column is-half">
              <label class="label"> Groupe Anglais <span class="red"> * </span> </label>
              <p class="control has-icons-left has-icons-right">
                <div class="select is-info is-rounded is-medium">
                  <select
                    required aria-required="true" class="is-rounded is-info"
                    onInput={(e: any) => (this.groupeAnglais = e.target.value)}>
                    <option></option>
                    <option  value="1">Groupe 1</option>
                    <option value="2">Groupe 2</option>
                    <option value="3">Groupe 3</option>
                  </select>
                </div>
                <span class="icon is-small is-left">
                  <i class="fas fa-sort-numeric-up"></i>
                </span>
              </p>
            </div>




          </div>
          <div class="field is-grouped is-grouped-centered">
            <p class="control">
              <button class="button is-info" onClick={this.addEtudiant.bind(this)} type="submit">Enregistrer</button>
            </p>
            <p class="control">
              <button type="reset" class="button is-light " onClick={(e) => this.showpopupS(e)}  > Annuler </button>

            </p>
          </div>
        </form>
        <br></br>

        <div id="supp" class="modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title red"> <i class="fas fa-exclamation-triangle"></i>  &nbsp; Confirmation </p>
              <button class="delete" onClick={this.hidepopupS.bind(this)} aria-label="close"><i
                class="fas fa-times"></i>
              </button>
            </header>
            <section class="modal-card-body">

              <div class="columns is-mobile is-centered confirmation">
                <strong id="upper"> êtes-vous sûr de vouloir quitter ce formulaire ? </strong>
              </div>

            </section>
            <footer class="modal-card-foot">
              <button class="button is-danger  " onClick={(e)=>{this.retour(e)}}
              >Confirmer
              </button>
              <button class="button " onClick={this.hidepopupS.bind(this)}>Annuler</button>
            </footer>


          </div>

        </div>

      </div>


    );
  }
}
