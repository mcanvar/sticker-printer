# Single Sticker Printer for TW-2044 Paper

## Extension for Development

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
