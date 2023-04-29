import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getListingInfoForEditThunk } from "../../store/listings";
import StepOne from "./StepOne";
import "./editListing.css";

const theme = createTheme({
    palette: {
      primary: {
        main: "#ff4569",
      },
      secondary: {
        main: "#e91e63",
      },
    },
});

const steps = ["step one", "step two", "step three"]

function EditListingForm() {
    const {listingId} = useParams();
    const dispatch = useDispatch();
    const [listingData, setListingData] = useState({});

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    console.log('listingData', listingData)
    const totalSteps = () => {
        return steps.length;
      };
    
    const completedSteps = () => {
    return Object.keys(completed).length;
    };

    const isLastStep = () => {
    return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    };
    
    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
    setActiveStep(step);
    };

    const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
    };

    const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    };

    useEffect(() => {     
      dispatch(getListingInfoForEditThunk(listingId))
      .then(data => setListingData(data))
    },[]);

    if(!listingData.id) return null;

    return (
        <div className="editlistingform-container">
            <Box sx={{ width: '90%'}}>

              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <ThemeProvider theme={theme}>
                      <StepButton onClick={handleStep(index)}>
                        {label}
                      </StepButton>
                    </ThemeProvider>
                  </Step>
                ))}
              </Stepper>

              <div >
                {allStepsCompleted() ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <div>
                    {activeStep === 0 && 
                      <Typography>
                        <StepOne listingData={listingData} />
                      </Typography>}
                    {activeStep === 1 && 
                      <Typography>
                        <h1>This is where page 2 component goes</h1>
                      </Typography>}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button onClick={handleNext} sx={{ mr: 1 }}>
                        Next
                      </Button>
                      {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                          <Typography variant="caption" sx={{ display: 'inline-block' }}>
                            Step {activeStep + 1} already completed
                          </Typography>
                        ) : (
                          <Button onClick={handleComplete}>
                            {completedSteps() === totalSteps() - 1
                              ? 'Finish'
                              : 'Complete Step'}
                          </Button>
                        ))}
                    </Box>
                  </div>
                )}
              </div>
            </Box>
        </div>
    )
};

export default EditListingForm;