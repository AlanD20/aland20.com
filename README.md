### AlanD20 Portfolio

---
A dynamic personal website with a dashboard for managing the website's content.

To access the dashboard with the features, you must be authorized. Otherwise, you'll be redirected to the main page by taking advantage of Nextjs v12 middlewares.

---

### Features:

- You can manage **Projects**, **Skills**, **Tags**, **FAQs** such as _Add_, _Edit_, _Delete_.
- Validations and using Node mailer in Contact form.
- The API routes that manages the website are protected. Which means, you have to be authorized to have access to the api routes.
- Each content has `Priority` field which helps you give a content high ordering, to be rendered in the website.
- [Custom Directives](src/modules/CustomDirectives/README.md) are custom words that generate HTML tags for contents written with it. This process makes it easier to give styles and write the way you want to be rendered in the website. Custom Directives source code can be found in the [modules](src/modules/CustomDirectives/) folder.
  - Used in _Project_, _FAQ_ descriptions.
- You can find your Github ID through this website: [Find Github ID](http://caius.github.io/github_id/)
---

### Deployment:

1. Install the packages
    ```bash
    yarn install
    ```

2. You may generate a secret key for `NEXTAUTH_SECRET` environment variable using the following command. But, make sure you have installed `openssl`.
    ```bash
    yarn generate:secret
    ```

3. The following files must be changed during deployment in production:

    - [config.ts](src/app/config.ts) -> Host & Allowed Origins For API Access
    - [.env](.env) -> Environment Variables

4. Generate the database schema with default seeding
    ```bash
    yarn db:reset
    ```

5. Finally, build the project and start pm2 config.
    ```bash
    yarn build && yarn pm2
    ```

- For adding new changes, build the project and restart pm2 by passing our application name which we set in `pm2.json` file.
    ```bash
    yarn build && pm2 restart nextjs-portfolio
    ```

---

### Development: Setup

1. Install packages
    ```bash
    yarn install
    ```
2. Define environment variables in .env file with your local environment. You can use .env.sample as a starting point
3. Run prepare script
    ```bash
    yarn prepare
    ```
4. Run the dev server
    ```bash
    yarn dev
    ```
5. And everything should work :) Don't forget to checkout [src/app](/src/app/) directory to configure the app.

- **Note:** Do not forget to restart the server when you make changes in .env file.

###### Here are some useful commands:

- postcss commands.
  ```bash
  yarn css:dev # Watch for changes during css files for development
  yarn css:prod # build minified css files for production
  ```
- Any changes in Prisma schema, you must push it to the database and generate the `prisma/client` file. The following command does both job at once.
    ```bash
    yarn db:push
    ```
- Prisma commands.
    ```bash
    yarn db:reset # Create + Seed with base data
    yarn db:push # Create only
    yarn db:seed # Seed only
    yarn prisma:studio # Start Prisma studio server
    ```
- You may want to manually run prettier format.
    ```bash
    yarn format
    ```
- You may want to generate a secret key for *NEXTAUTH_URL*. You need openssl installed on the machine.
    ```bash
    yarn generate:secret
    ```

---
### Contribution

If you have anything to add or fix, feel free to open a new pull request.

---
### License

This repository is under [GNU General Public License v3](LICENSE)
