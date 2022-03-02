// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../src/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <title>Troosh QA</title>
          <meta
            name="description"
            content="Troosh QA. Find people to debug with you!"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="questions.troosh.app" />
          <meta
            property="twitter:url"
            content="https://questions.troosh.app/"
          />
          <meta name="twitter:title" content="Troosh QA" />
          <meta
            name="twitter:description"
            content="Troosh QA. Find people to debug with you!"
          />
          <meta
            name="twitter:image:src"
            content="https://questions.troosh.app/logo_new.png"
          />
          <meta
            name="twitter:image"
            content="https://questions.troosh.app/logo_new.png"
          />
        </Head>
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
