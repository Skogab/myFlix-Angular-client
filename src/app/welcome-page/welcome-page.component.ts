import { Component, OnInit } from "@angular/core";
import { UserLoginFormComponent } from "../user-login-form/user-login-form.component";
import { UserRegistrationFormComponent } from "../user-registration-form/user-registration-form.component";
import { MatDialog } from "@angular/material/dialog";

/**
 * Komponente für die Willkommensseite der Anwendung.
 */
@Component({
	selector: "app-welcome-page",
	templateUrl: "./welcome-page.component.html",
	styleUrls: ["./welcome-page.component.scss"],
})
export class WelcomePageComponent implements OnInit {
	/**
	 * Konstruktor der WelcomePageComponent.
	 * @param {MatDialog} dialog - Der MatDialog-Service für das Öffnen von Dialogfenstern.
	 */
	constructor(public dialog: MatDialog) {}

	/**
	 * Wird aufgerufen, wenn die Komponente initialisiert wird.
	 */
	ngOnInit(): void {}

	/**
	 * Öffnet das Dialogfenster für die Benutzerregistrierung.
	 */
	openUserRegistrationDialog(): void {
		this.dialog.open(UserRegistrationFormComponent, {
			width: "280px",
		});
	}

	/**
	 * Öffnet das Dialogfenster für die Benutzeranmeldung.
	 */
	openUserLoginDialog(): void {
		this.dialog.open(UserLoginFormComponent, {
			width: "280px",
		});
	}
}
