### AlanD20 Portfolio

---
A dynamic personal website with a dashboard for managing the website's content.

To access the dashboard with the features, you must be authorized. Otherwise, you'll be redirected to the main page. Using Nextjs v12 middlewares

---

### Features:

- You can manage **Projects**, **Skills**, **Tags**, **FAQs** such as *Add*, *Edit*, *Delete*.
- Validations and using Node mailer in Contact form.
- The API routes that manages the website are protected, which you have to be authorized to access them.
- Each of the contents has `Priority` field which helps you to make a content have a high order to be shown in the website.
- [Custom Directives](pages/dashboard//directives/index.tsx) that generate HTML tags to make it easier to write page content. Custom Directives code can be found in the [modules](src/modules/CustomDirectives/) folder.
- You can find your Github ID through this website: [Find Github ID](http://caius.github.io/github_id/)
---

### Deployment:

1. Install the packages
    ```
    yarn install
    ```

2. You may generate a secret key for `NEXTAUTH_SECRET` environment variable using the following command. But, make sure you have installed `openssl`.
    ```
    yarn generate:secret
    ```

3. The following files must be changed during deployment in production:

    - [config.ts](src/app/config.ts) -> Host & Allowed Origins For API Access
    - [.env](.env) -> Environment Variables

4. Generate the database schema with default seeding
    ```
    yarn db:reset
    ```

5. Finally, build the project and start pm2 config.
    ```
    yarn build && yarn pm2
    ```

- For adding new changes, build the project and restart pm2 by passing our application name which we set in `pm2.json` file.
    ```
    yarn build && pm2 restart nextjs-portfolio
    ```

---

### Development:

- Watch for changes during CSS files using Laravel-mix.
  ```
  yarn mix:watch
  ```
- Any changes in Prisma schema, you must push it to the database and generate the `prisma/client` file. The following command does both job at once.
    ```
    yarn db:push
    ```
- Seed the database with base data.
    ```
    yarn db:seed
    ```

---
### License

[GNU General Public License v3](LICENSE)
