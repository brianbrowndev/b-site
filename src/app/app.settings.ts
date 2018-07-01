import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';


export interface IAppSettings {
    readonly production: boolean;
    readonly mapboxAccessToken: string;
    readonly tilesEndpoint: string;
}

export const AppSettings: IAppSettings = {
    production: environment.production,
    mapboxAccessToken: environment.mapboxAccessToken,
    tilesEndpoint: environment.tilesEndpoint
}


export let APP_SETTINGS = new InjectionToken<IAppSettings>("app.settings")