import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

/**
 * Komponente für das Anmeldeformular des Benutzers.
 */
@Component({
	selector: "app-user-login-form",
	templateUrl: "./user-login-form.component.html",
	styleUrls: ["./user-login-form.component.scss"],
})
export class UserLoginFormComponent implements OnInit {
	/**
	 * Eingabedaten für das Benutzeranmeldeformular.
	 * @type {Object}
	 * @property {string} Username
	 * @property {string} Password
	 */
	@Input() userData = { Username: "", Password: "" };

	/**
	 * Konstruktor der UserLoginFormComponent.
	 * @param {FetchApiDataService} fetchApiData
	 * @param {MatDialogRef<UserLoginFormComponent>} dialogRef
	 * @param {MatSnackBar} snackBar
	 * @param {Router} router
	 */
	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<UserLoginFormComponent>,
		public snackBar: MatSnackBar,
		private router: Router
	) {}

	/**
	 * Wird aufgerufen, wenn die Komponente initialisiert wird.
	 */
	ngOnInit(): void {}

	/**
	 * Sendet die Benutzeranmeldeinformationen an die API.
	 * Speichert Benutzerdaten und Token im lokalen Speicher bei erfolgreicher Anmeldung.
	 * Schließt das Dialogfenster und zeigt eine Benachrichtigungsnachricht an.
	 */
	loginUser(): void {
		this.fetchApiData.userLogin(this.userData).subscribe(
			(result) => {
				localStorage.setItem("user", JSON.stringify(result.user));
				localStorage.setItem("token", result.token);
				this.dialogRef.close();
				this.snackBar.open(result, "OK", {
					duration: 2000,
				});
			},
			(error) => {
				const errorMessage = error.error ? error.error.message : "An error occurred";
				this.snackBar.open(errorMessage, "OK", {
					duration: 2000,
				});
			}
		);
	}
}
