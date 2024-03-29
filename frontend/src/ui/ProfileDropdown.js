import './ui.css';

export function ProfileDropdown({openMenu}) {
    return (
        <div className='profile-dropdown-icon-container' onClick={openMenu}>
            <span className="material-symbols-sharp" id="material-symbols-sharp">menu</span>
            <span className="material-symbols-rounded" id="material-symbols-rounded">
            account_circle
            </span>
         </div>
    );
};