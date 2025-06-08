import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ScaleIcon from "@mui/icons-material/Scale";
import TimerIcon from "@mui/icons-material/Timer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StraightenIcon from "@mui/icons-material/Straighten";
import CubeIcon from "@mui/icons-material/Category";
import "./SkipInfoDialog.css";

export default function SkipInfoDialog({ skip, open, onClose }) {
  const vatAmount =
    Math.round(Number(skip.price_before_vat) * (skip.vat || 20)) / 100;
  const totalWithVat =
    Math.round((Number(skip.price_before_vat) + vatAmount) * 100) / 100;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          background: "linear-gradient(135deg, #f6fcff 0%, #e1eeff 100%)",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 15, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <Box className="skip-info-dialog">
          <Typography variant="h5" className="dialog-title">
            {skip.size} Yard Skip Details
          </Typography>

          <Box className="info-section">
            <Typography variant="h6" className="section-title">
              <InfoIcon /> Basic Information
            </Typography>
            <Box className="extra-info">
              <Box className="specs-grid">
                <Box className="spec-item">
                  <Box className="spec-icon">
                    <StraightenIcon />
                  </Box>
                  <Box className="spec-content">
                    <Typography variant="subtitle2">Length</Typography>
                    <Typography variant="h6">{skip.size * 2}ft</Typography>
                  </Box>
                </Box>
                <Box className="spec-item highlight">
                  <Box className="spec-icon">
                    <CubeIcon />
                  </Box>
                  <Box className="spec-content">
                    <Typography variant="subtitle2">Total Capacity</Typography>
                    <Typography variant="h6">
                      {skip.size} yd³
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{ ml: 1 }}
                      >
                        ({(skip.size * 0.764553).toFixed(1)} m³)
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box className="info-section">
            <Typography variant="h6" className="section-title">
              <TimerIcon /> Hire Period & Costs
            </Typography>
            <Box className="cost-breakdown">
              <Box className="cost-item">
                <Typography>Base Price:</Typography>
                <Typography>£{skip.price_before_vat}</Typography>
              </Box>
              <Box className="cost-item">
                <Typography>VAT ({skip.vat}%):</Typography>
                <Typography>£{vatAmount}</Typography>
              </Box>
              <Box className="cost-item total">
                <Typography>Total:</Typography>
                <Typography>£{totalWithVat}</Typography>
              </Box>
              <Typography variant="subtitle2" className="hire-period">
                {skip.hire_period_days} days hire period included
              </Typography>
            </Box>
          </Box>

          {(skip.transport_cost || skip.per_tonne_cost) && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box className="info-section">
                <Typography variant="h6" className="section-title">
                  <LocalShippingIcon /> Additional Costs
                </Typography>
                <Box className="additional-costs">
                  {skip.transport_cost && (
                    <Box className="cost-item">
                      <Typography>Transport Fee:</Typography>
                      <Typography>£{skip.transport_cost}</Typography>
                    </Box>
                  )}
                  {skip.per_tonne_cost && (
                    <Box className="cost-item">
                      <Typography>Per Tonne Rate:</Typography>
                      <Typography>£{skip.per_tonne_cost}</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </>
          )}

          <Divider sx={{ my: 2 }} />

          <Box className="info-section">
            <Typography variant="h6" className="section-title">
              <ScaleIcon /> Usage Guidelines
            </Typography>
            <Box className="guidelines">
              <Box className="guideline-item">
                <Typography variant="subtitle2" className="guideline-header">
                  {skip.allowed_on_road ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                  Road Placement
                </Typography>
                <Typography>
                  {skip.allowed_on_road
                    ? "Can be placed on public roads with proper permits"
                    : "Must be placed on private property"}
                </Typography>
              </Box>
              <Box className="guideline-item">
                <Typography variant="subtitle2" className="guideline-header">
                  {skip.allows_heavy_waste ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <CancelIcon color="error" />
                  )}
                  Heavy Waste
                </Typography>
                <Typography>
                  {skip.allows_heavy_waste
                    ? "Suitable for heavy construction waste"
                    : "Light waste materials only"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
