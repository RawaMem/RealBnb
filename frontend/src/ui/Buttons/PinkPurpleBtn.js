
function PinkPurpleBtn({text, style, disbaled, onClick}) {
    return (
        <button 
            className={!disbaled ? "pink-purple-btn-container" : "pink-purple-btn-container-disabled"}
            style={style} 
            disabled={disbaled}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default PinkPurpleBtn