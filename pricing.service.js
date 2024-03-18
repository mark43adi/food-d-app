class PricingService {
  constructor() {
    // Replace these with actual database interactions
    this.pricingData = {
      central: {
        perishable: { baseDistance: 5, basePrice: 1000, perKmPrice: 150 },
        nonPerishable: { baseDistance: 5, basePrice: 1000, perKmPrice: 100 },
      },
    };
  }

  async calculatePrice(zone, organizationId, totalDistance, itemType) {
    const pricing = this.pricingData[zone]?.[itemType];

    if (!pricing) {
      throw new Error("Invalid zone or item type");
    }

    const { baseDistance, basePrice, perKmPrice } = pricing;
    const excessDistance = Math.max(totalDistance - baseDistance, 0);
    const distancePrice = excessDistance * perKmPrice;

    return basePrice + distancePrice;
  }
}

module.exports = PricingService;
