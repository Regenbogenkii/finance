// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   // Initialize Firebase
   firebaseConfig : {
    apiKey: "AIzaSyBMcbl361Ds6uYqEUAsYM5KfbRpilGTeMI",
    authDomain: "angularwithfirebase-e4b84.firebaseapp.com",
    databaseURL: "https://angularwithfirebase-e4b84.firebaseio.com",
    projectId: "angularwithfirebase",
    storageBucket: "angularwithfirebase.appspot.com",
    messagingSenderId: "150924220823"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
