import Head from 'next/head'
import * as React from 'react'
import {Layout, CardContainer } from '../components'

export default function Home() {

  return (
    <>
      <Head>
        <title>SpaceX</title>
        <meta name="description" content="SpaceX example site for Avayler tech test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <CardContainer />
        </Layout>
      </main>
    </>
  )
}
