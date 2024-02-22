import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Script
        type="text/javascript"
        src="http://localhost:3001/mfe/header.js"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
