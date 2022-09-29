



export default function BedGuestForm({ setMaxGuests, setBeds, setBedRooms, setBaths, setPage }) {
    return (
        <div className="address-form-container">
            <section className="grid-left-container">
                <span className='word-section-1'>How many guests would you like to welcome?</span>
            </section>
            <section className="grid-right-container">
                <div className='grid-right-inner-container'>

                </div> 
                <div className='button-layout'>
                    <div
                        style={{ color: 'black', fontSize: '20px',cursor:'pointer'}}
                        onClick={() => setPage(2)}
                        >
                            Back
                    </div>
                    <div>
                        <div
                        style={{ 
                            color: 'white',
                            cursor:'pointer',
                            width:'100px',
                            height:'50px',
                            background:'black',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius:'15px'
                        }}
                        >
                            Next
                        </div>
                    </div>                    
                </div>         
            </section>
        </div>
    )
}