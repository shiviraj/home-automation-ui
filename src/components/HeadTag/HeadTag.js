import Head from 'next/head';
import PropTypes from 'prop-types';

function HeadTag({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
  );
}

HeadTag.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeadTag;
