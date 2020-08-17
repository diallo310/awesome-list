import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UsersService } from './users.service';
import { switchMap, tap, catchError, finalize, delay } from 'rxjs/operators';
import { ErrorService } from 'src/app/core/services/error.service';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: BehaviorSubject<User | null> = new BehaviorSubject(null);
  public readonly user$: Observable<User | null> = this.user.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router,
    private usersService: UsersService,
    private errorService: ErrorService,
    private loaderService: LoaderService
  ) { }

  login(email: string, password: string): Observable<User | null> {

    const url = `${environment.firebase.auth.baseURL}/verifyPassword?key= ${environment.firebase.apiKey}`;

    const data = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    this.loaderService.setLoading(true);

    return this.http.post<User>(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const userId: string = data.localId;
        const jwt: string = data.idToken;
        this.saveAuthData(userId, jwt);
        return this.usersService.get(userId, jwt);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))

    );
  }

  register(email: string, password: string, name: string): Observable<User | null> {
    const url =
      `${environment.firebase.auth.baseURL}/signupNewUser?key=
    ${environment.firebase.apiKey}`;

    const data = {
      email: email,
      password: password,
      name: name,
      returnSecureToken: true
    };
    this.loaderService.setLoading(true);

    return this.http.post<User>(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const jwt: string = data.idToken;
        const user = new User({
          email: data.email,
          id: data.localId,
          name: name
        })
        this.saveAuthData(user.id, jwt);
        return this.usersService.save(user, jwt);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))


    );

  }

  private logoutTimer(expirationTime: number): void {
    of(true).pipe(
      delay(expirationTime * 1000)
    ).subscribe(_ => this.logout());
  }

  private saveAuthData(userId: string, token: string) {
    const now = new Date();
    const expirationDate = (now.getTime() + 3600 * 1000).toString();
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  public autoLogin(user: User) {
    this.user.next(user);
    this.router.navigate(['app/dashboard']);
  }


  logout(): void {
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.user.next(null);
    this.router.navigate(['/login']);
  }
}
