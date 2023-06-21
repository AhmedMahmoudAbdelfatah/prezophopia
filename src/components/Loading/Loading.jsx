import "./loading.css"

const Loading = (props) => {
    return (
        <div class="loading-container" style={props.style}>
            <div class="loading">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>
        </div>
    )
}

export default Loading
