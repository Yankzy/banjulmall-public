import {useState} from 'react';
import { 
    makeStyles,
    Stepper,
    Step,
    StepLabel,
    Button,
    Dialog,
    DialogContent,
    Grid
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useMutation } from '@apollo/client';
import { toCamel } from 'shared/components/Utils';
import { CART } from "logged_in/payrollApi/Mutations";
import mainReducer from 'shared/components/Utils';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['', '', '', '', '', ''];
}

const stepValues = {cartUid: new Date().getTime().toString()}
function getStepContent(step, handleNext) {
  const stepsText = [
    {'Have you run payroll this calendar year?': ['Yes', 'No']}, 
    {'How do you usually run payroll?': ['We are new to running payroll', 'We use another online software', 'We do it manually or in excel']}, 
    {'How would you describe your business setting?': ['We work in an office', 'We work in retail or food services', 'We work in a factory, construction or in the field']}, 
    {'What type of workers do you need to pay?': ['Employees (W-2s)', 'Contractors (1099s)', 'Both']}, 
    {'Would you like to automate payments to your workers?': ['Yes', 'Maybe']},
    {'Would you be interested in offering health benefits to your employees?': ['Yes', 'Maybe', 'No']}
  ]

  const setStepValues = (val) => {
    const arr = ['payroll', 'how', 'setting', 'workers', 'automate', 'healthcare']
    stepValues[arr[step]] = val
    handleNext()
  }

  switch (step) {
    case step:
      return (
        <Grid>
          {Object.entries(stepsText[step]).map(([key, value])=> {
            return (
              <>
                <h3>{key}</h3>
                {value.map((val)=>{
                  return (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setStepValues(val)}
                      fullWidth   
                      size='large'
                      style={{marginTop: "1em", textTransform: "none"}}                
                    >
                      {val}
                    </Button>
                  )
                })}
              </>
            )
          })}
        </Grid>
    );
    default:
      break;
  }
}


function HorizontalLinearStepper(props) {
  const [mutate] = useMutation(CART)

    const { openRegisterDialog  } = props;
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

  const handleNext = async () => {
    if(activeStep === steps.length-1){
      let cleanData;
      try {
        await fetch(`https://geolocation-db.com/json/${process.env.REACT_APP_GEOLOCATION}`)
        .then(res => res.json())
        .then(data => {
          cleanData = data
        })
        const objData = toCamel({...cleanData, ...stepValues})
        const clean = Object.entries(objData).reduce((acc, [key, val]) => {
          return {...acc, [key.replace(/\?/g,'')]: val}
        }, {})
        mutate({ variables: { ...clean} })
        mainReducer('state', { type: 'set-cookie', name: 'questionnaire', cookie: clean.cartUid, expires: 1 })
      } catch (error) {
        console.log(error)
      }
      openRegisterDialog()
    }else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
          <div>
            <div className={classes.instructions}>{getStepContent(activeStep, handleNext)}</div>
            <div style={{float:"left"}}>
              <Button 
                disabled={activeStep === 0} 
                onClick={handleBack} 
                startIcon={<ArrowBackIosIcon />}
                style={{marginRight:"3em", textTransform: "none"}}
              >
                back
              </Button>
            </div>
          </div>
      </div>
    );
}




export default function FormDialog(props) {
    const { openRegisterDialog, onClose  } = props;

  return (
    <div>
      <Dialog maxWidth="sm" open={true} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogContent>
            <HorizontalLinearStepper 
                openRegisterDialog={openRegisterDialog}
                onClose={onClose}
            />
        </DialogContent>
      </Dialog>
    </div>
  );
}
