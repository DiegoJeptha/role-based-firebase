import { Application } from "express";
import { create, get, patch, remove } from "./controller";
import { isAuthorized } from "../auth/authorized";
import { isAuthenticated } from "../auth/authenticated";
export function routesConfig(app: Application) {
    // Lists all users 
    app.post('/users',
        isAuthenticated,
        isAuthorized({
            hasRole: ['admin', 'manager']
        }),
        create);

    // Get user by Id
    app.get('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        get
    ]);

    // update user by Id
    app.patch('/users/:id', [
        isAuthenticated,
        isAuthorized({
            hasRole: ['admin', 'manager'], allowSameUser: true
        }),
        patch
    ]);

    // delete user by Id
    app.delete('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        remove
    ]);


}