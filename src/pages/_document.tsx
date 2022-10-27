import { ColorModeScript } from "@chakra-ui/react";
import theme from "theme";

import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            href="https://media.made.com/mws-assets/images/favicon.1.ico"
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.1/build/styles/default.min.css"
          />
          <link
            media="screen,handheld"
            type="text/css"
            key="https://media.made.com/mws-assets/fontBase_b900f8d534cc10f95604.css"
            rel="stylesheet"
            href="https://media.made.com/mws-assets/fontBase_b900f8d534cc10f95604.css"
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

export default MyDocument;
