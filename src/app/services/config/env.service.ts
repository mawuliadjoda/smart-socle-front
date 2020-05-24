import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  public baseUrl = '';

  // Whether or not to enable debug mode
  public enableDebug = true;

  public versionFront = '';
  public versionBackend = '';

  public envNameFront = '';
  public envNameBackend = '';
  public production = false;

  constructor() { }

}
