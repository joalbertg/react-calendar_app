# Calendar App

- [Bootstrap][bootstrap]

- [React Router][react_router]


[bootstrap]: https://getbootstrap.com/docs/4.5/getting-started/introduction

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
│   ├── index.js
│   └── setupTests.js
└── yarn.lock

1 directory, 7 files
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
  "~src" : "./src",
  "~styles": "./src/styles/styles.scss"
},
...
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import App from '~src/JournalApp';

import '~styles';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

