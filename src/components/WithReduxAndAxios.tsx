import React, { Component } from 'react'
import { Store } from 'redux'

type AppContext = { [key: string]: any }
type NextPageContext = { [key: string]: any }

export interface Config {
  serializeState: (state: any) => any
  deserializeState: (state: any) => any
  storeKey: string
  debug?: boolean
  overrideIsServer?: boolean
}

export interface NextJSAppContext extends AppContext {
  ctx: NextPageContext
}

export interface MakeStoreOptions extends Config, NextPageContext {
  isServer: boolean
}

export type MakeStore = (initialState: any, options: MakeStoreOptions, apis: any, rootEpic: any) => Store<object>

export interface InitStoreOptions {
  initialState?: any
  ctx: NextPageContext
}

export interface WrappedAppProps {
  initialProps: any // stuff returned from getInitialProps
  initialState: any // stuff in the Store state after getInitialProps
  isServer: boolean
}

export interface AppProps {
  store: Object
}

const defaultConfig: Config = {
  storeKey: '__NEXT_REDUX_STORE__',
  debug: false,
  serializeState: (state) => state,
  deserializeState: (state) => state,
}

export default (makeStore: MakeStore, createApis: Function, config?: Partial<Config>) => {
  config = {
    ...defaultConfig,
    ...config,
  }

  const isServer = typeof window === 'undefined'

  const initStore = ({ initialState, ctx }: InitStoreOptions): Store<object> => {
    const { storeKey, deserializeState } = config as Config

    const createStore = () =>
      makeStore(
        deserializeState(initialState || {}),
        {
          ...ctx,
          ...(config as Config),
          isServer,
        },
        ctx.apis,
        ctx.rootEpic,
      )

    if (isServer) {
      return createStore()
    }

    // Memoize store if client
    if (!(storeKey in window)) {
      // @ts-ignore
      window[storeKey] = createStore()
    }

    // @ts-ignore
    return window[storeKey]
  }

  return (App: any) =>
    class WrappedApp extends Component<WrappedAppProps> {
      /* istanbul ignore next */
      static displayName = `withRedux(${App.displayName || App.name || 'App'})`

      static getInitialProps = async (appCtx: NextJSAppContext) => {
        /* istanbul ignore next */
        if (!appCtx) throw new Error('No app context')
        /* istanbul ignore next */
        if (!appCtx.ctx) throw new Error('No page context')

        const [apis, rootEpic] = createApis()
        appCtx.ctx.apis = apis
        appCtx.ctx.rootEpic = rootEpic

        const store = initStore({
          ctx: appCtx.ctx,
        })

        const { debug, serializeState } = config as Config

        if (debug) console.info('1. WrappedApp.getInitialProps wrapper got the store with state', store.getState())

        appCtx.ctx.store = store
        appCtx.ctx.isServer = isServer

        let initialProps = {}

        if ('getInitialProps' in App) {
          initialProps = await App.getInitialProps.call(App, appCtx)
        }

        if (debug) console.info('3. WrappedApp.getInitialProps has store state', store.getState())

        return {
          isServer,
          initialState: isServer ? serializeState(store.getState()) : store.getState(),
          initialProps,
        }
      }

      constructor(props: WrappedAppProps, context: NextPageContext) {
        super(props, context)

        const { initialState } = props

        if (config && config.debug)
          console.info('4. WrappedApp.render created new store with initialState', initialState, isServer)

        let StackdriverConfig = false
        if (props.initialProps && props.initialProps.pageProps) {
          // eslint-disable-next-line prefer-destructuring
          StackdriverConfig = props.initialProps.pageProps.StackdriverConfig
        }
        const [apis, rootEpic] = createApis(StackdriverConfig)
        this.apis = apis

        this.store = initStore({
          initialState,
          ctx: { rootEpic, apis },
        })
      }

      store: Object
      apis: { [key: string]: any }

      render() {
        const { initialProps, ...props } = this.props

        return <App {...props} {...initialProps} setToken={this.apis.setToken} store={this.store} />
      }
    }
}
