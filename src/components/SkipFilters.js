import React from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Slider,
  Typography,
  Switch,
  IconButton,
  Collapse,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import MoneyIcon from "@mui/icons-material/Money";
import "./SkipFilters.css";

const sortOptions = [
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "size_asc", label: "Size: Small to Large" },
  { value: "size_desc", label: "Size: Large to Small" },
];

export default function SkipFilters({ filters, onFilterChange }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Box className="skip-filters-wrapper">
      <Box
        className="skip-filters-header"
        onClick={() => setExpanded(!expanded)}
        sx={{ cursor: "pointer" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterListIcon />
          <Typography variant="h6">
            {expanded ? "Hide Filters & Sort" : "Show Filters & Sort"}
          </Typography>
        </Box>
        <IconButton
          size="small"
          sx={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <SortIcon />
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box className="skip-filters-content">
          <Box className="filter-section">
            <Box className="filter-section-header">
              <MoneyIcon />
              <Typography variant="subtitle1">Price Range</Typography>
            </Box>
            <Box className="filter-section-content">
              <Slider
                value={[filters.minPrice || 0, filters.maxPrice || 1000]}
                onChange={(_, value) => {
                  onFilterChange("minPrice", value[0]);
                  onFilterChange("maxPrice", value[1]);
                }}
                valueLabelDisplay="on"
                valueLabelFormat={(value) => `£${value}`}
                min={0}
                max={1000}
                sx={{ width: "100%", mx: "auto" }}
              />
            </Box>
          </Box>

          <Box className="filter-section">
            <Box className="filter-section-header">
              <SortIcon />
              <Typography variant="subtitle1">Sort By</Typography>
            </Box>
            <FormControl fullWidth>
              <Select
                value={filters.sortBy || ""}
                onChange={(e) => onFilterChange("sortBy", e.target.value)}
                className="filter-select"
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box className="filter-toggles">
            <Box className="filter-toggle-item">
              <Typography>Road Allowed Only</Typography>
              <Switch
                checked={filters.roadAllowed || false}
                onChange={(e) =>
                  onFilterChange("roadAllowed", e.target.checked)
                }
                color="primary"
              />
            </Box>
            <Box className="filter-toggle-item">
              <Typography>Heavy Waste Only</Typography>
              <Switch
                checked={filters.heavyWaste || false}
                onChange={(e) => onFilterChange("heavyWaste", e.target.checked)}
                color="primary"
              />
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
