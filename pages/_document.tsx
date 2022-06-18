import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="/app.webmanifest" />
        </Head>
        <body className="scroll-smooth antialiased py-4">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
