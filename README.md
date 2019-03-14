# Performance Matters @cmda-minor-web · 2018-2019

## Summary
Rebuilding [web-app-from-scratch](https://github.com/follywolly/web-app-from-scratch-1819) to support server side rendering.

## Install
Fork this repo, then execute:
```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/performance-matters-1819.git

cd performance-matters-1819

# Install dependencies
npm install

# Start liveserver
npm run server
```

## Thoughts
Clientside components & serverside components -> how to make them both work with just one version of the components?
require !== import -> Is there a fix?
Build process? take clientside components and rebuild them to require and module.exports to server components
```js
if (module) {
  module.exports = foo
} else {
  export default foo
}
```

## License
[MIT](LICENSE) @ [Folkert-Jan van der Pol](https://folkertjan.nl)
