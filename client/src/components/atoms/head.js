import PropTypes from 'prop-types';
import NextHead from 'next/head'

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title}</title>
    <meta
      name="description"
      content={props.description}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/*
    <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
    <link rel="apple-touch-icon" href="/static/touch-icon.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
    */}
    <link rel="icon" href="/static/favicon.ico" />
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="/static/global.css" />
    <meta property="og:url" content={props.url} />
    <meta property="og:title" content={props.title} />
    <meta
      property="og:description"
      content={props.description}
    />
    <meta name="twitter:site" content={props.url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage} />
    <meta property="og:image" content={props.ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    {props.children}
  </NextHead>
)

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  ogImage: PropTypes.string
}

Head.defaultProps = {
    title: 'CuteCV',
    description: 'CuteCV',
    url: '',
    ogImage: '/static/openGraph.jpeg'
};

export default Head