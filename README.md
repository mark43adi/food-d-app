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

### Database Design

The database schema consists of three main tables:

1. **Organization:**

   - Table name: `Organization`
   - Fields:
     - `id` (Primary Key): Integer, auto-incremented ID of the organization.
     - `name`: String, name of the organization.

2. **Item:**

   - Table name: `Item`
   - Fields:
     - `id` (Primary Key): Integer, auto-incremented ID of the item.
     - `type`: String, type of the item (e.g., "perishable", "non-perishable").
     - `description`: String, description of the item.

3. **Pricing:**
   - Table name: `Pricing`
   - Fields:
     - `id` (Primary Key): Integer, auto-incremented ID of the pricing.
     - `organization_id`: Integer, ID of the organization (foreign key referencing Organization table).
     - `item_id`: Integer, ID of the item (foreign key referencing Item table).
     - `zone`: String, zone for the pricing.
     - `base_distance_in_km`: Integer, base distance in kilometers.
     - `km_price`: Integer, price per kilometer.
     - `fix_price`: Integer, fixed price.
   - Constraints:
     - `organization_id` is a foreign key referencing `id` in `Organization` table.
     - `item_id` is a foreign key referencing `id` in `Item` table.

### Explanation:

Dynamic Pricing Calculation: `The Pricing table includes columns for base_distance_in_km, km_price, and fix_price, allowing for dynamic calculation of delivery costs based on various factors such as distance and item type.
Pricing can be dynamically determined based on the provided parameters (e.g., base distance, per km price) during the pricing calculation process.`
Database Design
The schema follows a normalized structure with separate tables for organizations, items, and pricing information, promoting data integrity and reducing redundancy.
Foreign key constraints are utilized to maintain referential integrity between related tables (Organization, Item, and Pricing), ensuring consistency in the data.
Adherence to Coding Standards
Column names are descriptive and follow a consistent naming convention (e.g., snake_case), enhancing readability and maintainability.
Data types are appropriately chosen based on the nature of the data being stored, ensuring efficient storage and retrieval.
Primary keys are defined for each table using the SERIAL data type, providing unique identifiers for records.
Constraints such as NOT NULL are applied to ensure data integrity and prevent null values where necessary.
Overall, the provided database schema effectively supports dynamic pricing calculation, follows good database design principles, and adheres to coding standards, thereby laying a solid foundation for the food delivery application's backend system.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/food-delivery-backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the database connection in database.js.

4. Run the application:

   ```bash
   node app.js
   ```

5. Access the API documentation at http://localhost:3000/api-docs.
