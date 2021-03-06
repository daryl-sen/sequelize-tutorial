# Customizing sequelize

## Tuning config.json

Source: https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor

Looking at the /config/config.json that was generated automatically, each top-level key represents an 'environment'. The environment is chosen based on line 8 of /models/index.js

```
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
```

If the `NODE_ENV` variable is not defined in your .env file, the `"development"` environment will be picked by default. The following is an example that was automatically generated when we ran `sequelize init`.

```
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

### Changing naming convention

Source: https://stackoverflow.com/questions/29828676/change-default-column-name-sequelize/33329195#33329195

The default naming scheme for sequelize is CapitalizedCamelCase, so a foreign key referring to `User.id` would be `UserId`. If you prefer the snake_case (i.e. `user_id`) convention, you can configure this behavior. If you set up your app according to the [quick start guide](/docs/quick-start.md) provided here, you can do so by modifying the /config/config.json file.

```

"development": {
  // ...
  "define": {
  "underscored": true
  }
},

```

The source link above lists some options that you can put into your config.json file.

#### Alternate way

Source: https://sequelize.org/master/manual/getting-started.html#connecting-to-a-database

If you did not set up your express app the way I have, you might have something like this: (from the docs)

```
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres
```

In this case, you can customize sequelize by passing a `config` object when creating a Sequelize instance.

```
const config = {
  "define": {
    "underscored": true
  }
}

const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname', config);
```
