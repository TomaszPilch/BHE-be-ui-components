// @flow

export type History = Object & {
  block: () => void,
  createHref: (string) => string,
  go: () => void,
  goBack: () => void,
  goForward: () => void,
  listen: (any) => void,
  push: (string, Object) => void,
  replace: (string, Object) => void,
  location: {
    pathname: string,
    search: string,
    hash: string,
    key: string,
  },
  match?: {
    isExact: boolean,
    params: Object,
    path: string,
    url: string,
  },
  length: number,
  action: string,
}

export type Navigation = Array<{
  +actions: number,
  +defaultRole: number,
  +fabricIcon?: string,
  +icon: string,
  +name: string,
  +position: number,
  +url: string,
}>
