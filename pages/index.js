import Items from '../components/Items';
const Home = props => {
    // console.log('index.js Home props', props);

    const pagenr = props.query ? props.query.pagenr : null;
    return (
        <div>
            <Items pagenr={parseInt(pagenr) || 1} />
        </div>
    );
};

export default Home;
