import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromRoot from "../app.reducer";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild{

    constructor(
        private authService: AuthService, 
        private router: Router,
        private store: Store<fromRoot.State>){}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(fromRoot.getIsAuth);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.store.select(fromRoot.getIsAuth);
    }

    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}