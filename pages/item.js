import SingleItem from "../components/SingleItem";

export default (props) => {
    console.log("item.js props", props);
    return (
        <div>
            <SingleItem query={props.query}/>
        </div>
    )
}

