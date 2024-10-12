### AlanD20 Portfolio

---
Dynamic portfolio with support for admin dashboard to control the website.

To access the dashboard with the features, you must be authorized. Otherwise, you'll be redirected to the main page by taking advantage of Nextjs v12 middlewares.

---

### Features

- You can manage **Projects**, **Skills**, **Tags**, **FAQs** such as *Add*, *Edit*, *Delete*.
- Validations and using Node mailer in Contact form.
- The API routes that manages the website are protected. Which means, you have to be authorized to have access to the api routes.
- Each content has `Priority` field which helps you give a content high ordering, to be rendered in the website.
- [Custom Directives](src/modules/CustomDirectives/README.md) are custom words that generate HTML tags for contents written with it. This process makes it easier to give styles and write the way you want to be rendered in the website. Custom Directives source code can be found in the [modules](src/modules/CustomDirectives/) folder. This feature is used in *Project*, *FAQ* descriptions.
- You can find your Github ID through this website: [Find Github ID](http://caius.github.io/github_id/)

---

### Deployment

1. Install the packages

    ```bash
    pnpm install
    ```

2. You may generate a secret key for `NEXTAUTH_SECRET` environment variable using the following command. But, make sure you have installed `openssl`.

    ```bash
    pnpm generate:secret
    ```

3. The following files must be changed during deployment in production:

    - [config.ts](src/config/app.ts) -> Host & Allowed Origins For API Access
    - [.env](.env) -> Environment Variables

4. Generate the database schema with default seeding

    ```bash
    pnpm db:reset
    ```

5. Finally, build the project and start pm2 config.

    ```bash
    pnpm build && pnpm pm2
    ```

- For adding new changes, build the project and restart pm2 by passing our application name which we set in `pm2.json` file.

    ```bash
    pnpm build && pm2 restart nextjs-portfolio
    ```

---

### Development: Setup

1. Install packages

    ```bash
    pnpm install
    ```

2. Define environment variables in .env file with your local environment. You can use .env.sample as a starting point
3. Run the dev server

    ```bash
    pnpm dev
    ```

4. And everything should work :) Don't forget to checkout [src/config](/src/config/) directory to configure the app.

- **Note:** Do not forget to restart the server when you make changes in .env file.

#### Useful Commands

- postcss commands.

  ```bash
  pnpm css:dev # Watch for changes during css files for development
  pnpm css:prod # build minified css files for production
  ```

- Any changes in Prisma schema, you must push it to the database and generate the `prisma/client` file. The following command does both job at once.

    ```bash
    pnpm db:push
    ```

- Prisma commands.

    ```bash
    pnpm db:reset # Create + Seed with base data
    pnpm db:push # Create only
    pnpm db:seed # Seed only
    pnpm prisma:studio # Start Prisma studio server
    ```

- You may want to manually run prettier format.

    ```bash
    pnpm format
    ```

- You may want to generate a secret key for *NEXTAUTH_URL*. You need openssl installed on the machine.

    ```bash
    pnpm generate:secret
    ```

---

### Contribution

If you have anything to add or fix, feel free to open a new pull request.

---

### License

This repository is under [GNU General Public License v3](LICENSE)
