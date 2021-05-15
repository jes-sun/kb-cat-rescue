function Adopt(props) {
    const cat = props.location.state.cat
    return(
        <p>
            This section is a work in progress.
            Soon enough, you'll be able to do lots of things with your new pal {cat.name}!
        </p>
    )
}

export default Adopt;