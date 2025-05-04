import React from 'react';
import PropertyListing from '../../components/OffPlan/PropertyListing';

function OffPlanListingPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 pb-8 max-w-7xl">
        <PropertyListing />
      </main>
    </div>
  );
}

export default OffPlanListingPage;