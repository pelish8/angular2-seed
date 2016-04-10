import {Component} from "angular2/core";
import {HomeComponent} from "./home/home.component";

@Component({
    selector: "panopticon-app",
    templateUrl: "app/app.component.html",
    styleUrls: ["app/app.component.css"],
    directives: [HomeComponent]
})
export class AppComponent {}
