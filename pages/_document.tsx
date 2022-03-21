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
            content="Troosh QA. Find mentors to debug with you!"
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
            content="Troosh QA. Find mentors to debug with you!"
          />
          <meta
            name="twitter:image:src"
            content="https://questions.troosh.app/logo_new.png"
          />
          <meta
            name="twitter:image"
            content="https://questions.troosh.app/logo_new.png"
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `!function(e,t,n,s,u,a)
            {e.twq ||
              ((s = e.twq =
                function () {
                  s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
                }),
              (s.version = "1.1"),
              (s.queue = []),
              (u = t.createElement(n)),
              (u.async = !0),
              (u.src = "//static.ads-twitter.com/uwt.js"),
              (a = t.getElementsByTagName(n)[0]),
              a.parentNode.insertBefore(u, a))}
            (window,document,'script'); // Insert Twitter Pixel ID and Standard
            Event data below twq('init','o85tx'); twq('track','PageView');`,
            }}
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
