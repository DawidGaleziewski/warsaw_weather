# ImGeolocation

# App purpose

Application purpose is to show weather in warsaw at the current day.

# Design

Design is not mine. It is inspired by:
https://www.behance.net/gallery/73112559/Logo-and-Branding-UIUX?tracking_source=search-all%7Cweather%20website

# Developer environment setup

## clone repository and run:

```
npm install
```

## run gulp

```
gulp watch
```

gulp is used in the project for:

- scss preprocessing, minifying, bundling, auto prefixing the code
- javascript bunding, minifying and babel
- browserstack

## If you are having issues with "gulp watch" on linux run this command:

```
 echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

This project number of files tracked may be too big. Above command will fix the issue

# App deployment

- all files needed for running web app are present in the 'app' directory. That includes index.html, index.min.js and index.css.
- app folder contains also map files for better troubleshooting of the preprocessed files.

# Project architecture and rationale:

Project is written in html, css, javaScript

## Styling:

-Styling is mostly done by materialize framework:
https://materializecss.com/
-Some styling adjustments to the project are done by scss

## Logic/javaScript
