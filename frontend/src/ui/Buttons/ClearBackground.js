import "./buttons.css";

function ClearBackgroundBtn({ btnText, onClick}) {
    return (
        <div className="clearBackground-btn" onClick={onClick}>
            {btnText}
        </div>
    );
};

export default ClearBackgroundBtn