# noten-lernen

# :exclamation: This is a fork. The below links are not representing the current state of this repository. They will redirect you to the version of the original creator of this software. 

Learn to read sheet music.

<a href="https://play.google.com/store/apps/details?id=de.melvil.noten">
  <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" title="Get it on Google Play" width="200">
</a>

<a href="https://apt.izzysoft.de/fdroid/index/apk/de.melvil.noten">
  <img src="https://gitlab.com/IzzyOnDroid/repo/-/raw/master/assets/IzzyOnDroid.png" alt="Get it on IzzyOnDroid" title="Get it on IzzyOnDroid" width="200">
</a>



## Demo

You can see the current status of the app on Netlify:
* [prod](https://noten-lernen.netlify.com/)
* [dev](https://dev--noten-lernen.netlify.com/)

## Screenshots

<p float="left">

<img src="https://raw.githubusercontent.com/MelvilQ/noten-lernen/master/screenshots/screenshot1.png" width="200">

<img src="https://raw.githubusercontent.com/MelvilQ/noten-lernen/master/screenshots/screenshot2.png" width="200">

<img src="https://raw.githubusercontent.com/MelvilQ/noten-lernen/master/screenshots/screenshot3.png" width="200">

<img src="https://raw.githubusercontent.com/MelvilQ/noten-lernen/master/screenshots/screenshot4.png" width="200">

</p>

## Technologies

- PWA (it has a manifest.json and a service worker which caches all necessary files for offline use)
- Cordova (to package the app and put it on Google Play)
- Frontend-Framework: [Vue](https://vuejs.org/)
- Rendering music with JavaScript: [abc.js](https://abcjs.net/)
- Statistics line chart: [chartist.js](https://gionkunz.github.io/chartist-js/)
- Multilinguality Plugin: [vue-i18n](https://kazupon.github.io/vue-i18n/)
- WebMIDI, for MIDI keyboard input: [webmidi](https://webmidijs.org/)

## Development Setup

### Web App

1. Install node.js if you don't already have it
2. Clone the repo
3. Run `npm i` in the command line to install the dependencies
4. Start the dev server with the command `npm start`

### Android App
1. To run the app locally on Android, make sure you have Cordova and Android Developer Tools installed
2. `cd cordova` followed by `npm i` to install the Cordova dependencies
3. Connect your Android device and run `npm run mobile`
4. Release build: `npm run build` in the cordova directory (only possible with keystore)



