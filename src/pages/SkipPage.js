import React, { useEffect, useState } from "react";
import { Container, CircularProgress, Alert, Grid } from "@mui/material";
import SkipCard from "../components/SkipCard";
import SkipFilters from "../components/SkipFilters";
import ProgressStepper from "../components/ProgressStepper";
import "./SkipPage.css";

function SkipPage() {
  const [skips, setSkips] = useState([]);
  const [filteredSkips, setFilteredSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSkipId, setSelectedSkipId] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: "",
    minPrice: "",
    maxPrice: "",
    roadAllowed: false,
    heavyWaste: false,
  });

  useEffect(() => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch skips");
        return res.json();
      })
      .then((data) => {
        setSkips(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!skips.length) return;

    let filtered = [...skips];

    if (filters.roadAllowed) {
      filtered = filtered.filter((skip) => skip.allowed_on_road);
    }
    if (filters.heavyWaste) {
      filtered = filtered.filter((skip) => skip.allows_heavy_waste);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(
        (skip) => skip.price_before_vat >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(
        (skip) => skip.price_before_vat <= Number(filters.maxPrice)
      );
    }

    switch (filters.sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price_before_vat - b.price_before_vat);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price_before_vat - a.price_before_vat);
        break;
      case "size_asc":
        filtered.sort((a, b) => a.size - b.size);
        break;
      case "size_desc":
        filtered.sort((a, b) => b.size - a.size);
        break;
      default:
        break;
    }

    setFilteredSkips(filtered);
  }, [skips, filters]);

  const handleSelect = (skip) => {
    setSelectedSkipId(skip.id);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, mb: 10 }}>
      <ProgressStepper currentStep={3} />
      <h1 className="skip-page-title">Choose Your Skip Size</h1>
      <div className="skip-page-caption-wrapper">
        <span className="skip-page-caption">
          Browse our range of skips to find the ideal size for your project.
          <span className="caption-highlight">
            {" "}
            Prices include 14-day hire period.
          </span>
        </span>
      </div>

      <SkipFilters filters={filters} onFilterChange={handleFilterChange} />

      {loading && (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />
      )}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <Grid container spacing={3} justifyContent="center">
          {filteredSkips.map((skip) => (
            <Grid item key={skip.id} xs={12} sm={6} md={4} xl={2}>
              <SkipCard
                skip={skip}
                selected={selectedSkipId === skip.id}
                onSelect={handleSelect}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default SkipPage;
