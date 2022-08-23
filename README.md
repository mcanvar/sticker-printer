# Single Sticker Printer for TW-2044 Paper

## Extension for Development

We will be using [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) package for developing, so:

`npm install --global web-ext`

then:

`web-ext run --start-url partner.trendyol.com`

## Extension Build

`web-ext build --ignore-files="pages/public" --ignore-files="pages/src" --ignore-files="pages/*.*" --overwrite-dest`

## Page Project Setup

`cd` in `pages` directory then:

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify before building the etension

```sh
npm run build
```
