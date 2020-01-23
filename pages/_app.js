import Page from '../components/Page';
import { withApollo } from '../lib/apollo';

function MyApp(props) {
    // console.log('_app props', props);
    return (
        <Page>
            <props.Component {...props.pageProps} /> {/* props. is just for clarity */}
        </Page>
    );
}
// every page in the app will be server-side rendered because data has to be fetched before rendering
MyApp.getInitialProps = async props => {
    // console.log('MyApp.getInitialProps props', props);
    const { Component, ctx } = props;
    let pageProps = {};
    // console.log('this runs first, before the App is rendered');
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
        console.log('_app Component, pageProps', pageProps);
    }
    // this exposes the query to the user
    console.log('_app ctx.query', ctx.query);
    pageProps.query = ctx.query;
    return { pageProps };
};

export default withApollo(MyApp);
