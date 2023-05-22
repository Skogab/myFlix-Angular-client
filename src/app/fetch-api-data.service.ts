import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

//Declaring the api url that will provide data for the client app
const apiUrl = "https://movieappskogaby.herokuapp.com/";
@Injectable({
	providedIn: "root",
})
export class FetchApiDataService {
	// Inject the HttpClient module to the constructor params
	// This will provide HttpClient to the entire class, making it available via this.http
	constructor(private http: HttpClient) {}
	// Making the api call for the user registration endpoint
	public userRegistration(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http.post(apiUrl + "users", userDetails).pipe(catchError(this.handleError));
	}

	// API user login endpoint
	public userLogin(userDetails: any): Observable<any> {
		console.log(userDetails);
		return this.http.post(apiUrl + "login", userDetails).pipe(catchError(this.handleError));
	}

	// Api get all movies endpoint
	getAllMovies(): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "movies", {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Api call get one movie endpoint
	getOneMovie(title: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "movies/" + title, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Api call for get one director endpoint
	getOneDirector(directorName: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "movies/director/" + directorName, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Api call get one genre endpoint
	getOneGenre(genreName: string): Observable<any> {
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "movies/genre/" + genreName, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Api call get one user endpoint
	getOneUser(): Observable<any> {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "users/" + username, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Api call get favourite movies of a user endpoint
	getFavoriteMovies(): Observable<any> {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		return this.http
			.get(apiUrl + "users/" + username, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(
				map(this.extractResponseData),
				map((data) => data.FavoriteMovies),
				catchError(this.handleError)
			);
	}

	// Api call add a movie to favourite Movies endpoint
	addFavoriteMovie(movieId: string): Observable<any> {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		return this.http
			.post(apiUrl + "users/" + username + "/movies/" + movieId, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Api call for edit user endpoint
	editUser(updatedUser: any): Observable<any> {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		return this.http
			.put(apiUrl + "users/" + username, updatedUser, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Api call for delete user endpoint
	deleteUser(): Observable<any> {
		const userid = localStorage.getItem("userid");
		const token = localStorage.getItem("token");
		return this.http
			.delete(apiUrl + "users/" + userid, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Api call for deleting a movie from the favorite movies endpoint
	deleteFavoriteMovie(movieId: string): Observable<any> {
		const username = localStorage.getItem("username");
		const token = localStorage.getItem("token");
		return this.http
			.delete(apiUrl + "users/" + username + "/movies/" + movieId, {
				headers: new HttpHeaders({
					Authorization: "Bearer " + token,
				}),
			})
			.pipe(map(this.extractResponseData), catchError(this.handleError));
	}

	// Non-typed response extraction
	private extractResponseData(res: any): any {
		const body = res;
		return body || {};
	}

	private handleError(error: HttpErrorResponse): any {
		if (error.error instanceof ErrorEvent) {
			console.error("Some error occurred:", error.error.message);
		} else {
			console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
		}
		return throwError(() => new Error("Something bad happened; please try again later."));
	}
}
