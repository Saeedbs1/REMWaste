import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import StraightenIcon from "@mui/icons-material/Straighten";
import InfoIcon from "@mui/icons-material/Info";
import smallSkipImg from "../img/small_skip.jpg";
import mediumSkipImg from "../img/medium_skip.jpg";
import bigSkipImg from "../img/big_skip.jpg";
import "./SkipCard.css";
import SkipInfoDialog from "./SkipInfoDialog";

function SkipCard({ skip, selected, onSelect, onBack, onContinue }) {
  const [infoOpen, setInfoOpen] = React.useState(false);
  const getSkipImage = (size) => {
    if (size <= 4) return smallSkipImg;
    if (size < 20) return mediumSkipImg;
    return bigSkipImg;
  };

  const imageSrc = getSkipImage(skip.size);
  const imageAlt = `${skip.size} Yard Skip`;
  const vatAmount =
    Math.round(Number(skip.price_before_vat) * (skip.vat || 20)) / 100;
  const totalWithVat =
    Math.round((Number(skip.price_before_vat) + vatAmount) * 100) / 100;
  const showTransport = skip.transport_cost != null;
  const showPerTonne = skip.per_tonne_cost != null;

  const handleInfoClick = (e) => {
    e.stopPropagation();
    setInfoOpen(true);
  };

  return (
    <>
      <Card
        className={`skip-card ${selected ? "selected" : ""}`}
        onClick={() => {
          if (!selected) onSelect(skip);
        }}
        style={{ cursor: selected ? "default" : "pointer" }}
      >
        <CardContent>
          <Box sx={{ position: "absolute", right: 8, top: 8, zIndex: 2 }}>
            <Tooltip title="View Details">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setInfoOpen(true);
                }}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": {
                    bgcolor: "white",
                  },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <InfoIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
          <img src={imageSrc} alt={imageAlt} className="skip-image" />
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent={"center"}
            className="skip-info-row"
          >
            <Grid item xs={12} sm={2}>
              <Box className="skip-info-item" onClick={handleInfoClick}>
                <StraightenIcon className="skip-info-icon" color="primary" />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "#22223b",
                    fontFamily: "'Montserrat', 'Roboto', sans-serif",
                    letterSpacing: "0.5px",
                    fontSize: "1rem",
                  }}
                >
                  {skip.size} yards
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box className="skip-info-item" onClick={handleInfoClick}>
                <CurrencyPoundIcon className="skip-info-icon" color="primary" />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: "#3a86ff",
                    fontFamily: "'Montserrat', 'Roboto', sans-serif",
                    letterSpacing: "0.5px",
                    fontSize: "1rem",
                  }}
                >
                  £{skip.price_before_vat}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#8b96a5",
                    marginLeft: "4px",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  + VAT
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box className="skip-info-item" onClick={handleInfoClick}>
                <CalendarTodayIcon className="skip-info-icon" color="primary" />
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: "#4361ee",
                    fontFamily: "'Montserrat', 'Roboto', sans-serif",
                    letterSpacing: "0.5px",
                    fontSize: "1rem",
                  }}
                >
                  {skip.hire_period_days} days
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#8b96a5",
                    marginLeft: "4px",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                  }}
                >
                  hire period
                </Typography>
              </Box>
            </Grid>
          </Grid>
          {(showTransport || showPerTonne) && (
            <Box className="skip-additional-costs">
              <Typography variant="caption" className="additional-cost-label">
                Additional Cost
              </Typography>
              <Box className="additional-cost-list">
                {showTransport && (
                  <Box className="additional-cost-item transport">
                    <span className="cost-icon">🚚</span>
                    <span>Transport</span>
                    <span className="cost-value">£{skip.transport_cost}</span>
                  </Box>
                )}
                {showPerTonne && (
                  <Box className="additional-cost-item tonne">
                    <span className="cost-icon">⚖️</span>
                    <span>Per Tonne</span>
                    <span className="cost-value">£{skip.per_tonne_cost}</span>
                  </Box>
                )}
              </Box>
            </Box>
          )}
          <Grid item xs={12}>
            <Box className="skip-badges" mt={2}>
              {skip.allowed_on_road ? (
                <Box component="span" className="badge badge-success">
                  On Road
                </Box>
              ) : (
                <Box component="span" className="badge badge-error">
                  Not Allowed On Road
                </Box>
              )}
              {skip.allows_heavy_waste && (
                <Box component="span" className="badge badge-primary">
                  Heavy Waste
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant={selected ? "outlined" : "contained"}
              color="primary"
              className="select-button"
              disabled={selected}
              fullWidth
              style={selected ? { pointerEvents: "none" } : undefined}
            >
              {selected ? "Selected" : "Select Skip"}
            </Button>
          </Grid>
        </CardContent>
      </Card>

      <SkipInfoDialog
        skip={skip}
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
      />

      {selected && (
        <div className="skip-sticky-bar">
          <div className="skip-sticky-content">
            <div className="skip-sticky-info">
              <span className="skip-sticky-size">
                {skip.size} Yard Skip{" "}
                <span className="skip-sticky-period">
                  {skip.hire_period_days} days hire period
                </span>
              </span>
              <span className="skip-sticky-price">
                £{skip.price_before_vat} + £{vatAmount} VAT (Total: £
                {totalWithVat})
                {showTransport && (
                  <span className="skip-sticky-cost" style={{ marginLeft: 12 }}>
                    Transport: £{skip.transport_cost}
                  </span>
                )}
                {showPerTonne && (
                  <span className="skip-sticky-cost" style={{ marginLeft: 12 }}>
                    Per Tonne: £{skip.per_tonne_cost}
                  </span>
                )}
              </span>
            </div>
            <div className="skip-sticky-info">
              <div className="skip-sticky-disclaimer">
                Imagery and information shown throughout this website may not
                reflect the exact shape or size specification, colours may vary,
                options and/or accessories may be featured at additional cost.
              </div>
              <div className="skip-sticky-actions">
                <button className="sticky-btn sticky-btn-back" onClick={onBack}>
                  Back
                </button>
                <button
                  className="sticky-btn sticky-btn-continue"
                  onClick={onContinue}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SkipCard;
