# BUStxt Native

**bustxt-native** is an [Expo](https://expo.io) project written in Javasript that will target iOS, Android, and the web.

## Prerequisites

* A modern version of nodejs, ideally using [nvm](https://github.com/nvm-sh/nvm)
* [Yarn](https://yarnpkg.com/) package manager
* expo-cli installed globally 
  * `npm install -g expo-cli `
* Access to the [expo docs](https://docs.expo.io)
* A decent editor:
  * VSCode is the standard choice
  * Rubymine will work, I guess... but why?
  * Maybe we could all get Webstorm licenses... :)

## Getting Started

To get started, clone the project, install dependencies with yarn, and then run the Metro bundler:

    git clone git@git:bustxt-native
    cd bustxt-native
    yarn install
    yarn start

At this point your browser will open a new tab to `localhost:19002`.

## Creating a config file

The application currently ships with a config/config.js.sample file.  Copy this and edit it and fill in a key for POWS:

    cp config/config.js.sample config/config.js

Then, go and edit the new `config/config.js` and replace 'my-api.winnipegtransit.com-api-key' with a POWS API key.


## Getting set up on a "device"

There are a couple of options for running bustxt-native on a device.  The short version - for Android things, just install [Android Studio](https://developer.android.com/studio) and you'll have/be able to get all the tools required.  For iOS, you must be on a Mac, with XCode installed.

* Use an actual Android device over adb (i.e., plugged in via USB)
  * All platforms (Win/Mac/Linux)
  * Check out the [ADB Guide](https://developer.android.com/studio/command-line/adb)

* Use an Android emulator
  * All platforms (Win/Mac/Linux)
  * Easiest to just install [Android Studio](https://developer.android.com/studio) and use the AVD Manager tool

* Use an iOS simulator
  * MacOS only
  * Install XCode to get the Simulator.app application

## Running bustxt-native

Inside your Metro window (again, `localhost:19002`), you should first click the "Local" option next to "Connection", because of the goofiness of our corporate network.  LAN *probably* works for those RDPing, but it seems like a non-starter when VPNing.

Click on one of:

* **Run on Android device/emulator** to run on an already-running physical device or emulator
* **Run on iOS simulator** to run on an already running instance of Simulator.app
* **Run in web browser** to open a web build in a new browser tab

For the device/emulator options, the Expo app will be automatically installed to your device and the code pushed to it - no need to manually install Expo from the Play Store/App Store if you don't want to.

### Troubleshooting

I've occasionally had issues getting things running via the Metro web interface.  When in doubt, on a device, force close/quit the Expo app on the device and try running it from Metro again.  That usually solves the problem.

## Development

Expo is based on react-native, which itself is very similar to React (obviously?).  Most development will feel very familiar to those familiar with React.

Much like in React with webpack, in development, code changes will automatically be pushed to running devices and refresh the application, so you don't have to.