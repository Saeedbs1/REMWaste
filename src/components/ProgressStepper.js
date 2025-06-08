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
import { useTheme } from "../context/ThemeContext";
import "./ProgressStepper.css";

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
  const { darkMode } = useTheme();
  const connectorColor = darkMode ? "rgba(255, 255, 255, 0.1)" : "#e3f0ff";
  const iconBgInactive = darkMode ? "rgba(255, 255, 255, 0.1)" : "grey.200";
  const textColor = darkMode ? "rgba(255, 255, 255, 0.7)" : "text.primary";
  const textColorSecondary = darkMode
    ? "rgba(255, 255, 255, 0.5)"
    : "text.secondary";

  return (
    <Box className="progress-wrapper">
      <Box className="progress-container">
        {isMobile ? (
          <>
            <Box className="mobile-progress">
              <Box className="step-info">
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: currentStep > 1 ? "primary.main" : iconBgInactive,
                    color:
                      currentStep > 1 ? "common.white" : textColorSecondary,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {steps[currentStep - 1].icon}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: textColor }}>
                    Step {currentStep} of {steps.length}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: textColorSecondary }}
                  >
                    {steps[currentStep - 1].label}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" sx={{ color: textColorSecondary }}>
                {Math.round((currentStep / steps.length) * 100)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(currentStep / steps.length) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: connectorColor,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "primary.main",
                },
              }}
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
                backgroundColor: connectorColor,
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
              "& .MuiStepLabel-label": {
                color: textColorSecondary,
                "&.Mui-active": {
                  color: textColor,
                },
                "&.Mui-completed": {
                  color: textColor,
                },
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
                            : iconBgInactive,
                        color:
                          currentStep - 1 >= idx
                            ? "common.white"
                            : textColorSecondary,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow:
                          currentStep - 1 === idx
                            ? `0 0 0 4px ${
                                darkMode ? "rgba(255,255,255,0.1)" : "#e3f0ff"
                              }`
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
