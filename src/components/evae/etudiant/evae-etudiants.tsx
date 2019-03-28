import { Component, State, Method, Prop } from "@stencil/core";
import { RouterHistory, LocationSegments } from "@stencil/router";
import { Etudiant } from "../../../global/etudiant";





@Component({
  tag: "evae-etudiants",
  styleUrl: "evae-etudiant.scss"
})


export class EvaePromotions {

  @State() search: any;
  @Prop() etudiants: Etudiant[] = [];
  @Prop() formation: any;
  @Prop() history: RouterHistory;

  @Method()

  
  
  retour(){
      
      let segment: LocationSegments = {
        pathname: "/evae/formations/promotions",
        state: {
          formation: this.formation
        },
        query: null,
        key: null
      };
   
      this.history.push(segment);
  }

  AddEtudiant(){
    
   
    let segment: LocationSegments = {
     pathname: "/evae/etudiants/add",
     state: {
       Data: {
          codeFormation:this.formation.codeFormation,
          anneeUniversitaire:this.formation.annee_anniv,
          nomFormation:this.formation.nomFormation
       }
     },
     query: null,
     key: null
   };

   this.history.push(segment);

 }


  
  filtrer(){
    
    // search by name and code
   
    let filter=this.search.value.toUpperCase();
    
    let i,td1,td2,td3,td4;
    let tds=document.getElementsByTagName("td");

    for(i=0;i<tds.length;i+=4){
       
        td1=tds[i].innerText || tds[i].textContent;
        td2=tds[i+1].firstChild;
        td2=td2.innerText || tds[i+1].textContent;
        td3=tds[i+2].innerText || tds[i+2].textContent;
        td4=tds[i+3].innerText || tds[i+3].textContent;

        if(td1.toUpperCase().indexOf(filter) > -1 || td2.toUpperCase().indexOf(filter) > -1  
        || td3.toUpperCase().indexOf(filter) > -1  || td4.toUpperCase().indexOf(filter) > -1 ){
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
                <i class="fas fa-graduation-cap"></i>  {this.formation.codeFormation}    {this.formation.annee_anniv}
                </h1>
                <h2 class="subtitle">
                  {this.formation.nomFormation}
                </h2>
              </div>
              <div class="column is-one-third"></div>
              <div class="column is-one-fifth"></div>
              <div>
                <br/>
                         <button class="button is-info is-medium" onClick={()=>{this.retour()}}>  <i class="fas fa-arrow-alt-circle-left"></i> &nbsp;RETOUR </button>
              </div>
              </div>
              </div>
            </div>
          </section>
          <br></br>
        <div class="container">
         <div class="columns">
            
            {/*  || La liste des etudiants */}
            <div class="column is-one-third"> 
            <h1 class="promo"> <i class="far fa-list-alt"></i> &nbsp; Étudiants </h1>
            </div>   
     
            {/* input recherche */}
            <div class="column is-one-third">
            <div class="field has-addons">
                <div class="control is-expanded">
                  <input
                    class="input is-info is-rounded"
                    type="text"
                    placeholder="RECHERCHE ..."
                    ref={el => (this.search = el)}
                    onInput={()=> this.filtrer()}
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
          
            <div class="column is-1"></div>
            <div class="column">
            <button class="button is-link "  onClick={()=>{this.AddEtudiant()}}>
            &nbsp;  <i class="fas fa-plus-square"></i>   &nbsp;
            </button>
            </div>
         </div>
        </div>

         
        
         
          {/* table des etudiants */}

          <br/>

        <div class="columns">
          <div class="column is-one-fifth" />
          <div class="column">
    
             <div class="box">
            <table class="table  is-striped is-fullwidth is-hoverable"  >
            
         
                <tr>
                  <th class="subtitle"><b>
                    <center> Nom</center>
                    </b></th>
                  <th class="subtitle"> <center> <b>Prenom</b></center> </th>
                  <th class="subtitle"><b>
                     <center>Email</center>
                    </b></th>
                  <th class="subtitle"><b>
                    <center> Nº Téléphone</center>
                    </b></th>
                </tr>
            
                {
                  this.etudiants.map((el) => {
                    return (
                      <tr>
                          <td>{el.nom}</td>
                          <td>{el.prenom}</td>
                          <td>{el.email}</td>
                          <td>{el.mobile}</td>
                      </tr>
                    )
                  })

                }
            
            </table>
            </div>
          </div>
          <div class="column is-one-fifth" />
        </div>


        <br/>
      </div>
    )
  }

}