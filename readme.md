# BHE UI components & functionality

Components and functionality for [BHE be ui v2](https://github.com/TomaszPilch/BHE-be-ui-v2).

```
yarn add @bheui/components
```

at your styles, import fabric.scss

```
@import '~office-ui-fabric-core/dist/css/fabric.css';
@import '~@uppy/core/dist/style.css';
@import '~@uppy/dashboard/dist/style.css';
@import '~@bheui/components/src/styles/base.scss'
```

## Uppy functionality

Add services/Uppy to createStore.js

```
epicMiddleware.run(rootEpic)
Uppy.create(store, locale)

return store
```

in reducers.js
```
import uppyStore from '@uppy/store-redux'

const reduxStore = {
  uppy: {
    version: 2,
  },
}

combineReducers({
  uppy: uppyStore.reducer,
})
```

## Link

```
npx ts-node .\scripts\prelink.ts
npx ts-node .\scripts\postlink.ts
```

## Changelog - migration to v1.0.0

[Changelog](./changelog.md)

## TODOs

 - [ ] Json component (not work in nextJS?)
 - [ ] Tests
