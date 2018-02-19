// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  API_URL: 'http://localhost:3000/v1',
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAqKDM4YrzEGQPRU172skaO-39eDbAmOx0",
    authDomain: "cyborg-admin.firebaseapp.com",
    databaseURL: "https://cyborg-admin.firebaseio.com",
    projectId: "cyborg-admin",
    storageBucket: "cyborg-admin.appspot.com",
    messagingSenderId: "111546265752"
  }
};
