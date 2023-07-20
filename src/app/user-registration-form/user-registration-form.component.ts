import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

/**
 * Komponente für das Benutzerregistrierungsformular.
 */
@Component({
	selector: "app-user-registration-form",
	templateUrl: "./user-registration-form.component.html",
	styleUrls: ["./user-registration-form.component.scss"],
})
export class UserRegistrationFormComponent implements OnInit {
	/**
	 * Eingabedaten für das Benutzerregistrierungsformular.
	 * @type {Object}
	 * @property {string} Username
	 * @property {string} Password
	 * @property {string} Email
	 * @property {string} Birthday
	 */
	@Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

	/**
	 * Konstruktor der UserRegistrationFormComponent.
	 * @param {FetchApiDataService} fetchApiData
	 * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef
	 * @param {MatSnackBar} snackBar
	 */
	constructor(
		public fetchApiData: FetchApiDataService,
		public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
		public snackBar: MatSnackBar
	) {}

	/**
	 * Wird aufgerufen, wenn die Komponente initialisiert wird.
	 */
	ngOnInit(): void {}

	/**
	 * Sendet die Benutzerregistrierungsdaten an die API.
	 * Schließt das Dialogfenster auf erfolgreiche Registrierung und zeigt eine Erfolgsmeldung an.
	 */
	registerUser(): void {
		this.fetchApiData.userRegistration(this.userData).subscribe(
			(result) => {
				this.dialogRef.close();
				this.snackBar.open("User successfully registered", "OK", {
					duration: 2000,
				});
			},
			(result) => {
				this.snackBar.open(result, "OK", {
					duration: 2000,
				});
			}
		);
	}
}
