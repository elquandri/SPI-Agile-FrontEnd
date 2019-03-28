import {Component, State, Method, Prop} from "@stencil/core";

import {utilisateurs} from "../../global/utilisateurs";
import { RouterHistory } from "@stencil/router";


// la liste des fomartions ( avec Willload)
// rechercher une formation par nom ou bien par code  ( fonction : filtrer)
// chaque nom de formation contient un lien vers ses promotions

@Component({
  tag: "authentification-authen",
  styleUrl: "authentification-authen.scss"
})



export class EvaeFormations {

  @State() msgerror:string
  @State() search:any;
  @State() content : any;
  @State() username:any;
  @State() password:any;
  @State() users:any= [];
  @Prop() utilisateur: utilisateurs = {} as utilisateurs;
  @Prop() history: RouterHistory;
  formulaire: HTMLFormElement;


  @Method()




  filtrer(){

    // search by name and code

    let filter=this.search.value.toUpperCase();

    let i,td1,td2;
    let tds=document.getElementsByTagName("td");

    for(i=0;i<tds.length;i+=2){
      td1=tds[i].innerText || tds[i].textContent;
      td2=tds[i+1].innerText || tds[i+1].textContent;
      console.log(td1)
      if(td1.toUpperCase().indexOf(filter) > -1 || td2.toUpperCase().indexOf(filter) > -1 ){
        tds[i].parentElement.style.display = "";
      }
      else {
        tds[i].parentElement.style.display = "none";
      }
    }


  }

  submit(e){
    e.preventDefault()
    //console.log("http://spidosi.cleverapps.io/users/email/"+this.utilisateur.username);
    let url="https://spi.cleverapps.io/users/email/"+this.utilisateur.username;
    console.log(url)


    fetch(url,    {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if(response.ok){
          return  response.json()
        }else {
          if (response.status === 500) {
            // server unavailable
            this.msgerror="Identifiant non valide";
            let hide =document.getElementById("hide");
            hide.classList.remove('hide');
          } else if(response.status===404){
            alert('erreur connxion internet');
          }

          else {
            // handle other API errors here, implementation
            // depends on your response format
          }
        }})
      .then(data => {
        this.users = data;
      }).then(()=>this.resultat())
      .catch(error => console.warn(error));

    //console.log(this.users)
//console.clear();


    //console.log(this.users.loginConnection);


  }
  resultat(){

    if(this.users.loginConnection!=this.utilisateur.username  && this.users.pseudoConnection!=this.utilisateur.username){

     // console.log('totototo')
      this.msgerror="Indetifiant non valide";
      let hide =document.getElementById("hide");
      hide.classList.remove('hide');

    }
    else if(this.users.motPasse!=this.utilisateur.password)
    {
      this.msgerror="Mot de passe non valide";

      let hide =document.getElementById("hide");
      hide.classList.remove('hide');
    }
    else
    {
      if(this.users.role=="ADM"){
        //console.log("administrateur")
        sessionStorage.setItem('clé', this.users.loginConnection);
        //console.log(sessionStorage.getItem('clé'))
        //this.history.push("/home", {});
        location.href="/home";

        // this.goBack()
        //this.redirection();

      }
      else if(this.users.role=="SEC"){
        console.log("secretariat")
      }
      else if(this.users.role=="ENS"){
        //console.log("enseignant")
        sessionStorage.setItem('ens', this.users.loginConnection);
        sessionStorage.setItem('noens',this.users.noEnseignant);
        //console.log(sessionStorage.getItem('ens'))
        location.href="/evaluation";
       // this.history.push("/role/enseignants", {});
      }
      else if (this.users.role=="ETU"){
        console.log("etudiant")
      }
    }
  }
  componentDidLoad(){
   /* let id=document.getElementById("nav");
    id.style.display="none !important";
    */
   document.title = "Se connecter"
  }
  componentWillLoad()   {

    //sessionStorage.setItem('clé', 'valeur');
    //console.log(sessionStorage.getItem('clé'));

    if(sessionStorage.getItem('clé')){
      this.history.push("/home", {});
    }
    if(sessionStorage.getItem('ens')){
      this.history.push("/evaluation", {});
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
      // this.handleInput(e);
    }
  }


  render() {


    return (

      <div class="limiter">
        <div class="container-login100" >
          <div class="wrap-login100 p-t-190 p-b-30">
            <form onSubmit={(e) => this.submit(e)}>
              <div class="login100-form-avatar">
                <img src="../../assets/lock.png" alt="AVATAR"/>
              </div>

              <span class="login100-form-title p-t-20 p-b-45">
            <br/>
            </span>

              <div class="wrap-input100 validate-input m-b-10" data-validate = "Username is required">
                <input class="input100" type="text" name="username" placeholder="Identifiant"  required onInput={(e: any) => (this.utilisateur.username= e.target.value)}/>
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                <i class="fa fa-user"></i>
              </span>
              </div>
              <p>
              </p>
              <br></br>
              <div class="wrap-input100 validate-input m-b-10" data-validate = "Password is required">
                <input class="input100" type="password" name="pass" placeholder="Mot de passe"  required onInput={(e: any) => (this.utilisateur.password= e.target.value)}/>
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                <i class="fa fa-lock"></i>
              </span>
              </div>

              <div class="container-login100-form-btn p-t-10">
                <button class="login100-form-btn" >
                  Se connecter
                </button>
              </div>
<br/>
              <div class="notification eror hide" id="hide">

                <strong class="textstyle">{this.msgerror}</strong>


              </div>
            </form>
          </div>
        </div>
      </div>




    )
  }

}
