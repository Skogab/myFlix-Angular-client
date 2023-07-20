import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FetchApiDataService } from "../fetch-api-data.service";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";

/**
 * Komponente für das Benutzerprofil.
 */
@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
	/**
	 * Benutzerdaten des Benutzerprofils.
	 * @type {Object}
	 * @property {string} Username
	 * @property {string} Password
	 * @property {string} Email
	 * @property {string} Birthday
	 */
	@Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

	/**
	 * Der Benutzer des Profils.
	 * @type {Object}
	 */
	user: any = {};

	/**
	 * Eine Liste der Lieblingsfilme des Benutzers.
	 * @type {Object[]}
	 */
	favoriteMovies: any[] = [];

	/**
	 * Konstruktor der UserProfileComponent.
	 * @param {FetchApiDataService} fetchApiData
	 * @param {MatSnackBar} snackBar
	 * @param {Router} router
	 */
	constructor(public fetchApiData: FetchApiDataService, public snackBar: MatSnackBar, private router: Router) {}

	/**
	 * Wird aufgerufen, wenn die Komponente initialisiert wird.
	 * Ruft die Methode getUser() auf, um den Benutzer und seine Lieblingsfilme abzurufen.
	 */
	ngOnInit(): void {
		this.getUser();
	}

	/**
	 * Ruft den Benutzer und seine Lieblingsfilme über die API ab und aktualisiert die Benutzerdaten für das Profil.
	 */
	getUser(): void {
		this.user = this.fetchApiData.getOneUser();
		this.userData.Username = this.user.Username;
		this.userData.Email = this.user.Email;
		this.userData.Birthday = formatDate(this.user.Birthday, "yyyy-MM-dd", "en-US", "UTC+0");

		this.fetchApiData.getAllMovies().subscribe((resp: any) => {
			this.favoriteMovies = resp.filter((m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0);
		});
	}

	/**
	 * Bearbeitet die Benutzerdaten über die API.
	 * Speichert die aktualisierten Benutzerdaten im lokalen Speicher
	 */
	editUser(): void {
		this.fetchApiData.editUser(this.userData).subscribe(
			(result) => {
				localStorage.setItem("user", JSON.stringify(result));

				this.snackBar.open("User successfully updated", "OK", {
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

	/**
	 * Löscht den Benutzer über die API.
	 * Löscht auch den lokalen Speicher und navigiert zur Willkommensseite.
	 */
	deleteUser(): void {
		this.fetchApiData.deleteUser().subscribe(
			(result) => {
				localStorage.clear();
				this.router.navigate(["welcome"]);
				this.snackBar.open("User successfully deleted", "OK", {
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
