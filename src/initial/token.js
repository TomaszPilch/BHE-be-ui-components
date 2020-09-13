// @flow
import jsHttpCookie from 'cookie'
import fetch from 'isomorphic-unfetch'
import { cookie } from 'devx-js-utilities'

export default async (ctx: Object, serverUrl: string, page?: string) => {
  const { req, res } = ctx
  const initialProps = {}

  if (req && req.headers) {
    let authorized = false
    if (req.headers.cookie) {
      const cookiesJSON = jsHttpCookie.parse(req.headers.cookie)
      if (cookiesJSON.bheToken) {
        const result = await fetch(`${serverUrl}/api/v1/ping?access_token=${cookiesJSON.bheToken}`)
        if (result.status !== 401) {
          authorized = true
          initialProps.token = cookiesJSON.bheToken
        }
      }
    }
    if (!authorized && page !== 'login') {
      res.writeHead(302, {
        Location: 'login',
      })
      res.end()
      return initialProps
    }
  } else {
    const tokenClient = cookie.readCookie('bheToken')
    const result = await fetch(`${serverUrl}/api/v1/ping?access_token=${tokenClient}`)
    if (result.status !== 401) {
      initialProps.token = tokenClient
    } else {
      initialProps.shouldReloadToken = true
    }
  }

  return initialProps
}
