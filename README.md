# gotcaked

gotCaked? - Get a nice Recipe with this Project!

- [Development](#development)
- [How to use](#how-to-use)
- [OpenAPI](#openapi)
- [License](#license)

# Development

## Requirements

- Nodejs 16

## Frontend

Install all necessary dependencies

```bash
npm install
```

Build Angular-Frontend

```bash
npm run-script build
```

## Backend

Install all necessary dependencies

```bash
npm install
```

Start Nodejs

```bash
npm run-script start
```

# How to use

The first registered user will be the admin. All registered users after that will be normal users.
An admin should create at least one category, otherwise it's not possible to create recipes.
Admins are able to edit/delete all recipes and add/remove tags/categories from the website.
Normal users are able to create own recipes and edit/delete their own recipes.
Users are also able to upvote/downvote recipes and post comments on them.

# OpenAPI

`./backend/openapi.yaml`

# License

[GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html)
