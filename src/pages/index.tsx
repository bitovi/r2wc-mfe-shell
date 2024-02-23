import Head from "next/head";
import dynamic from "next/dynamic";
import { lazy, Suspense } from "react";
import { GetServerSideProps } from "next";

// @ts-ignore
const Header = lazy(() => import("header/scene"));

// @ts-ignore
const Services = lazy(() => import("services/scene"));

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>Module Federation Shell Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://bitovi.com/favicon.ico" />
      </Head>
      <Suspense>
        <Header />
      </Suspense>
      <Suspense>
        <Services {...props} />
      </Suspense>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // @ts-ignore
  const servicesProps = await import("services/scene").then(
    ({ getServerData }) => getServerData(ctx)
  );

  return servicesProps;
};
