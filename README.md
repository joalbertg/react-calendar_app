# Calendar App

- [Bootstrap][bootstrap]
- [Font Awesome CDN][font_awesome]

- [React Router][react_router]


[bootstrap]: https://getbootstrap.com/docs/4.5/getting-started/introduction
[font_awesome]: https://cdnjs.com/libraries/font-awesome

[react_router]: https://reacttraining.com/react-router/web/guides/quick-start

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
│   │   │   ├── CalendarScreen.js
│   │   │   └── index.js
│   │   └── ui
│   ├── helpers
│   ├── hooks
│   ├── index.js
│   ├── reducers
│   ├── routers
│   │   ├── AppRouter.js
│   │   ├── PrivateRoute.js
│   │   ├── PublicRoute.js
│   │   └── index.js
│   ├── setupTests.js
│   ├── store
│   └── types
└── yarn.lock

12 directories, 17 files
```

### Installs

With `package.json` and dependencies
```shell
docker-compose run app yarn
```

Without dependencies
```shell
docker-compose run app yarn add react-router-dom
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

