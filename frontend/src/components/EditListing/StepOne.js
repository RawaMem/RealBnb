import { useEffect, useState } from "react";

import InputField from "../../ui/TextField";

function StepOne({listingData}) {

    const [address, setAddress] = useState(listingData.address)
    console.log('address', address)

    return (
        <div className='edit-listing-form-container'>     
            <InputField size={ { m: 2, width: '35ch' }} setter={setAddress} val={address} />            
        </div>
    );
};

export default StepOne;
