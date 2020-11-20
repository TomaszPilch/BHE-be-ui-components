import jsHttpCookie from 'cookie'
import fetch from 'isomorphic-unfetch'
// @ts-ignore
import { cookie } from 'devx-js-utilities'
import { NextPageContext } from 'next/dist/next-server/lib/utils'

export default async (ctx: NextPageContext, serverUrl: string, page?: string) => {
  const { req, res } = ctx
  const initialProps: {
    token?: string
    shouldReloadToken?: boolean
  } = {}

  if (req && req.headers && res) {
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
