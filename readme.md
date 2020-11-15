# BHE UI components & functionality

Components and functionality for [BHE be ui v2](https://github.com/TomaszPilch/BHE-be-ui-v2).

```
yarn add @bheui/components
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

## TODOs

 - [ ] Changelog
 - [ ] File upload
 - [ ] Json component (not work in nextJS?)
 - [ ] Tests
