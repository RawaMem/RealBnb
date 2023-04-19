import './ui.css';

export function ProfileDropdown({openMenu}) {
    return (
        <div className='profile-dropdown-container' onClick={openMenu}>
            <span className="material-symbols-sharp" id="material-symbols-sharp">menu</span>
            <span class="material-symbols-rounded" id="material-symbols-rounded">
            account_circle
            </span>
         </div>
    );
};