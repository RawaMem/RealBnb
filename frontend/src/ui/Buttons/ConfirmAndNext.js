import "./buttons.css";

function ConfirmAndNextBtn({ btnText, disabled, onClick}) {
    return (
        <div 
            className={disabled ? "confirmAndNext-btn-disabled" : "confirmAndNext-btn"} 
            onClick={onClick}
        >{btnText}</div>
    );
};

export default ConfirmAndNextBtn;