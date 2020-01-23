import Head from 'next/head'

const Meta = () => {
    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='description' content='Full Stack Advanced React and GraphQL course from Wes Bos https://AdvancedReact.com' />
            <meta charSet='utf-8' />
            <link rel='shortcut icon' href='/static/favicon.png' />
            <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
            <title>Sick Fits!</title>
        </Head>
    );
}

export default Meta
