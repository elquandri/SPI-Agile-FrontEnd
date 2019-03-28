import { Component } from "@stencil/core";

@Component({
  tag: "page-not-found",
  styleUrl: "page-not-found.scss"
})
export class spinotfound {
  componentDidLoad(){
    document.title = "Page n'existe pas"
  }
  render() {
    return (
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>Oops!</h1>
          </div>
          <h2>404 - Page not found</h2>
          <p>The page you are looking for might have been removed had its name changed or is temporarily
            unavailable.</p>
          <a ><stencil-route-link url="/">RETOUR</stencil-route-link></a>
        </div>
      </div>

    );}
}
