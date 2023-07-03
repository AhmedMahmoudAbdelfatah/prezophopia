import "./loading.css"

const Loading = (props) => {
    return (
        <div className="loading-container" style={props.style}>
            <div className="loading">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
        </div>
    )
}

export default Loading
