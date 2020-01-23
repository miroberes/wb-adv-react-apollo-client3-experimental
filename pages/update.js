import UpdateItem from '../components/UpdateItem';

const Update = props => {
        console.log('update.js props.query', props.query);
    return (
        <div>
            <UpdateItem query={props.query} />
        </div>
    );
};

export default Update;
