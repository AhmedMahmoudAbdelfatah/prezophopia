import { useEffect, useRef, useState } from 'react'
import '../styles/Input.css'

const Input = (props) => {
    // initialization
    const FOCUS_COLOR = getComputedStyle(document.documentElement).getPropertyValue("--input-focus-color");
    const PLACEHOLDER_COLOR = getComputedStyle(document.documentElement).getPropertyValue("--input-placeholder-color");
    const BORDER_COLOR = getComputedStyle(document.documentElement).getPropertyValue("--input-border-color");
    const ERROR_COLOR = getComputedStyle(document.documentElement).getPropertyValue("--input-error-color");
    const legendRef = useRef(), wraperRef = useRef(), inputRef = useRef();
    const [isValidValue, setIsValidValue] = useState(true);
    const [borderStyle, setBorderStyle] = useState({});
    const [legendStyle, setLegendStyle] = useState({
        top: "50%",
        transform: "scale(1) translateY(-50%)",
        color: PLACEHOLDER_COLOR
    });

    useEffect(() => {
        // set border style here because we need wraperRef and it doesn`t refer to wraper
        // unless it is mounted so set it in useEffect which triggers at the end of the render component
        // and that ensure that wraperRef is refering to wraper not null value
        setBorderStyle({
            transform: `scale(${1 + (2.0 / wraperRef.current.clientWidth)}, ${1 + (2.0 / wraperRef.current.clientHeight)})`,
            backgroundColor: BORDER_COLOR
        });
        //if prop autoFocus passed to the component then auto focus it 
        if (props.autoFocus) inputRef.current.focus();
        // reset it to true as an empty field as a begining consider not error 
        setIsValidValue(true);
    }, []);

    const onInputFocus = () => {
        setBorderStyle({
            transform: `scale(${1 + (4.0 / wraperRef.current.clientWidth)}, ${1 + (4.0 / wraperRef.current.clientHeight)})`,
            backgroundColor: isValidValue? FOCUS_COLOR : ERROR_COLOR
        });
        setLegendStyle({
            top: `-${legendRef.current.clientHeight / 2 + 1.5}px`,
            left: "2.5px",
            transform: "scale(0.75)",
            color: isValidValue? FOCUS_COLOR: ERROR_COLOR
        });
    };

    const onInputBlur = (e) => {
        // consider matching another value or passing regex to validate the value if the input
        const isValidValue = props.isValid || props.validateValue?.test(e.target.value) || props.matchValue === props.value;
        setIsValidValue(isValidValue);
        setBorderStyle({
            transform: `scale(${1 + (2.0 / wraperRef.current.clientWidth)}, ${1 + (2.0 / wraperRef.current.clientHeight)})`,
            backgroundColor: isValidValue? BORDER_COLOR : ERROR_COLOR
        });
        if (!e.target.value) {
            setLegendStyle({
                top: "50%",
                left: "5px",
                transform: "scale(1) translateY(-50%)",
                color: PLACEHOLDER_COLOR
            });
        }
        else setLegendStyle((prevState) => { return { ...prevState, color: isValidValue? PLACEHOLDER_COLOR :  ERROR_COLOR}; });
    };
    
    // pressing on the legend which consider the placeHolder focus on the input
    const onLegendClick = () => {
        inputRef.current.focus();
    }

    return (
        <div>
            <div className='input-wraper' style={{ height: props.height, width: props.width } } ref={wraperRef}>
                <input
                    type={props.type}
                    id={props.id}
                    value={props.value}
                    onChange={(e) => props.setValue(e.target.value)}
                    required={props.required}
                    autoComplete='off'
                    spellCheck='false'
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
                    aria-label={props.label}
                    aria-invalid={isValidValue ? "flase" : "true"}
                    aria-describedby={props.ariaDescribedby}
                    ref={inputRef}
                /> 
                <div className='legend' style={legendStyle} ref={legendRef} onClick={onLegendClick}>{props.children}</div>
                <div className="border" style={borderStyle}></div>
            </div>
            {!isValidValue && <div id={ props.ariaDescribedby } className='instructions' >{props.instructions}</div>}
        </div>
    )
}

export default Input
