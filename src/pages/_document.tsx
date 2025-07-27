import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="font-mono bg-dark-bg text-terminal-green overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
