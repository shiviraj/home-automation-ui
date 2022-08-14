import Head from 'next/head';

function HeadTag({title}: { title: string }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
    </Head>
  );
}

export default HeadTag;