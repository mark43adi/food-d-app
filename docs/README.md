# Food Delivery App Backend

This repository contains the backend implementation for a food delivery app, focusing primarily on a dynamic pricing module to calculate delivery costs based on various factors.

## Features

### Dynamic Pricing Module with REST API

- **Endpoint:** `/pricing/calculate`
- **Method:** POST
- **Request Body:**
  - `zone`: The zone for delivery (e.g., "central").
  - `organization_id`: The ID of the organization.
  - `total_distance`: Total distance for delivery in kilometers.
  - `item_type`: Type of item (e.g., "perishable", "non-perishable").
- **Response:**
  - `total_price`: The calculated total price for the delivery.

## Implementation Details

### API Description

- The API calculates the total price for the delivery of specified food items based on the provided parameters.
- It dynamically determines pricing based on base distance and price, per km price, and item type.
- The response includes the total price for the delivery in the given zone for the particular organization.

### Comparison with Alternative API

**Functionality:**

- **Provided API:**
  - Calculates pricing directly without querying the database.
  - Suitable for scenarios where pricing is fixed or dynamically calculated based on predefined rules without the need for database lookup.
- **Alternative API:**
  - Searches the database for pricing information based on the provided parameters.
  - Offers flexibility to have different pricing structures based on organization, zone, and item type.
  - Suitable for scenarios where pricing varies dynamically based on database-stored configurations.

**Performance:**

- **Provided API:**
  - May have better performance for scenarios with fixed or simple pricing calculations as it avoids database queries.
- **Alternative API:**
  - May have slightly higher latency due to database queries but offers more flexibility in terms of dynamic pricing configurations.

**Use Cases:**

- **Provided API:**
  - Suitable for applications with straightforward pricing logic or where pricing doesn't vary based on database-stored configurations.
- **Alternative API:**
  - Ideal for applications requiring dynamic pricing configurations that can be stored and managed in a database.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/food-delivery-backend.git
   ```
