import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShieldIcon from "@mui/icons-material/Shield";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export const steps = [
  { label: "Location", icon: <LocationOnIcon /> },
  { label: "Waste", icon: <DeleteIcon /> },
  { label: "Skip", icon: <Inventory2Icon /> },
  { label: "Permit", icon: <ShieldIcon /> },
  { label: "Date", icon: <CalendarTodayIcon /> },
  { label: "Payment", icon: <CreditCardIcon /> },
];

export default function ProgressStepper({ currentStep = 1 }) {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        mb: 3,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: isMobile ? 1 : 2 }}>
        {isMobile ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: currentStep > 1 ? "primary.main" : "grey.200",
                    color: currentStep > 1 ? "common.white" : "grey.500",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {steps[currentStep - 1].icon}
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.primary">
                    Step {currentStep} of {steps.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {steps[currentStep - 1].label}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {Math.round((currentStep / steps.length) * 100)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(currentStep / steps.length) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </>
        ) : (
          <Stepper
            activeStep={currentStep - 1}
            alternativeLabel
            sx={{
              "& .MuiStepConnector-line": {
                height: "2px",
                border: 0,
                backgroundColor: "#e3f0ff",
                borderRadius: "4px",
              },
              "& .MuiStepConnector-root": {
                left: "calc(-50% + 20px)",
                right: "calc(50% + 20px)",
                top: "18px", 
              },
              "& .MuiStepConnector-active": {
                "& .MuiStepConnector-line": {
                  background:
                    "linear-gradient(90deg, #5e60ce 0%, #48bfe3 100%)",
                },
              },
              "& .MuiStepConnector-completed": {
                "& .MuiStepConnector-line": {
                  background: "#5e60ce",
                },
              },
              "& .MuiStep-root": {
                padding: 0,
              },
            }}
          >
            {steps.map((step, idx) => (
              <Step key={step.label} completed={currentStep - 1 > idx}>
                <StepLabel
                  StepIconComponent={() => (
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor:
                          currentStep - 1 > idx
                            ? "primary.main"
                            : currentStep - 1 === idx
                            ? "primary.light"
                            : "grey.200",
                        color:
                          currentStep - 1 >= idx ? "common.white" : "grey.500",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow:
                          currentStep - 1 === idx
                            ? "0 0 0 4px #e3f0ff"
                            : undefined,
                      }}
                    >
                      {step.icon}
                    </Box>
                  )}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </Box>
    </Box>
  );
}
