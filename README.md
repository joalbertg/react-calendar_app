# Calendar App

- [Bootstrap][bootstrap]
- [Font Awesome CDN][font_awesome]
- [Sweetalert 2][sweetalert2]

- [React Router][react_router]
- [Big Calendar][react_big_calendar]
- [Datetime Picker][react_datetime_picker]
- [Moment][momentjs]

- [Redux][reduxjs]
- [React Redux][react_redux]
- [Redux devtools][redux_devtools]

[bootstrap]: https://getbootstrap.com/docs/4.5/getting-started/introduction
[font_awesome]: https://cdnjs.com/libraries/font-awesome
[sweetalert2]: https://sweetalert2.github.io/

[react_router]: https://reacttraining.com/react-router/web/guides/quick-start
[react_big_calendar]: http://jquense.github.io/react-big-calendar/examples/index.html
[react_datetime_picker]: https://projects.wojtekmaj.pl/react-datetime-picker/
[momentjs]: https://momentjs.com/

[reduxjs]: https://es.redux.js.org/
[react_redux]: https://react-redux.js.org/
[redux_devtools]: https://github.com/zalmoxisus/redux-devtools-extension#usage

### Project Structure

> run `tree -I "node_modules|public"`
```shell
.
├── Dockerfile
├── README.md
├── docker-compose.yml
├── package.json
├── src
│   ├── CalendarApp.js
│   ├── actions
│   ├── components
│   │   ├── auth
│   │   │   ├── LoginScreen.js
│   │   │   ├── index.js
│   │   │   └── login.css
│   │   ├── calendar
│   │   │   ├── CalendarEvent.js
│   │   │   ├── CalendarModal.js
│   │   │   ├── CalendarScreen.js
│   │   │   └── index.js
│   │   └── ui
│   │       └── Navbar.js
│   ├── helpers
│   │   └── calendar-messages-es.js
│   ├── hooks
│   ├── index.js
│   ├── reducers
│   │   ├── index.js
│   │   ├── rootReducers.js
│   │   └── uiReducer.js
│   ├── routers
│   │   ├── AppRouter.js
│   │   ├── PrivateRoute.js
│   │   ├── PublicRoute.js
│   │   └── index.js
│   ├── setupTests.js
│   ├── store
│   │   ├── index.js
│   │   └── store.js
│   ├── styles.css
│   └── types
│       ├── index.js
│       └── types.js
└── yarn.lock

12 directories, 29 files
```

### Installs

With `package.json` and dependencies
```shell
docker-compose run app yarn
```

Without dependencies
```shell
docker-compose run app yarn add react-router-dom react-big-calendar moment
docker-compose run app yarn add react-datetime-picker react-modal sweetalert2
docker-compose run app yarn add react-datetime-picker react-redux redux redux-thunk
docker-compose run app yarn add link-module-alias --dev
```

### Start project

> run `docker-compose up`

### Tests

> run `docker-compose run app test --runInBand`, or

> run `docker-compose run app test --maxWorkers=4`

#### Link module alias

> run `docker-compose run app yarn preinstall` for clean alias.

> run `docker-compose run app yarn postinstall` for generate alias.

```json
...
"scripts": {
  ...
  "preinstall": "command -v link-module-alias && link-module-alias clean || true",
  "postinstall": "link-module-alias",
  "alias:build": "yarn preinstall && yarn postinstall"
},
"_moduleAliases": {
  "~root": ".",
  "~src": "./src",
  "~actions": "./src/actions",
  "~components": "./src/components",
  "~helpers": "./src/helpers",
  "~hooks": "./src/hooks",
  "~reducers": "./src/reducers",
  "~routers": "./src/routers",
  "~store": "./src/store",
  "~types": "./src/types"
},
...
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import App from '~src/CalendarApp';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

