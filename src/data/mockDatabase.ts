import { TableSchema } from '../types';

export interface DatabaseRelationship {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  relationship: '1:N' | 'N:1' | '1:1';
}

export const mockDatabaseRelationships: DatabaseRelationship[] = [
  { fromTable: 'orders', fromColumn: 'customer_id', toTable: 'customers', toColumn: 'customer_id', relationship: 'N:1' },
  { fromTable: 'customers', fromColumn: 'segment_id', toTable: 'customer_segments', toColumn: 'segment_id', relationship: 'N:1' },
  { fromTable: 'order_items', fromColumn: 'order_id', toTable: 'orders', toColumn: 'order_id', relationship: 'N:1' },
  { fromTable: 'order_items', fromColumn: 'product_id', toTable: 'products', toColumn: 'product_id', relationship: 'N:1' },
  { fromTable: 'payments', fromColumn: 'order_id', toTable: 'orders', toColumn: 'order_id', relationship: 'N:1' },
  { fromTable: 'refunds', fromColumn: 'order_id', toTable: 'orders', toColumn: 'order_id', relationship: 'N:1' },
];

export const mockTables: TableSchema[] = [
  {
    name: 'customers',
    description: 'Master record of all registered NovaMart consumers including calculated lifetime value (LTV).',
    rowCount: 24520,
    sizeBytes: '4.8 MB',
    columns: [
      { name: 'customer_id', type: 'UUID', isPrimaryKey: true, nullable: false, description: 'Unique customer identifier' },
      { name: 'first_name', type: 'VARCHAR(100)', nullable: false, description: 'Customer first name' },
      { name: 'last_name', type: 'VARCHAR(100)', nullable: false, description: 'Customer last name' },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, description: 'Unique customer email address' },
      { name: 'segment_id', type: 'VARCHAR(50)', isForeignKey: true, references: { table: 'customer_segments', column: 'segment_id' }, nullable: true, description: 'Assigned customer tier (e.g. GOLD, PLATINUM)' },
      { name: 'lifetime_value', type: 'NUMERIC(12,2)', nullable: false, description: 'Total historical net spend in USD' },
      { name: 'created_at', type: 'TIMESTAMPTZ', nullable: false, description: 'Account creation timestamp' },
      { name: 'status', type: 'VARCHAR(20)', nullable: false, description: 'Active, Suspended, or Churned' },
    ],
    sampleRows: [
      { customer_id: 'c83f1-482a', first_name: 'Aarav', last_name: 'Sharma', email: 'aarav.s@example.com', segment_id: 'SEG_GOLD', lifetime_value: 58240.00, created_at: '2025-01-14T08:30:00Z', status: 'ACTIVE' },
      { customer_id: 'e29a4-118b', first_name: 'Priya', last_name: 'Nair', email: 'priya.nair@techflow.io', segment_id: 'SEG_PLATINUM', lifetime_value: 112450.50, created_at: '2024-11-03T11:20:00Z', status: 'ACTIVE' },
      { customer_id: '91bc2-771c', first_name: 'Rohan', last_name: 'Verma', email: 'rohan.v@cloudscale.net', segment_id: 'SEG_SILVER', lifetime_value: 14200.00, created_at: '2025-03-22T14:10:00Z', status: 'ACTIVE' },
      { customer_id: '33dd8-994d', first_name: 'Ananya', last_name: 'Deshmukh', email: 'ananya.d@novastart.com', segment_id: 'SEG_GOLD', lifetime_value: 73900.25, created_at: '2024-08-19T09:45:00Z', status: 'ACTIVE' },
      { customer_id: '71ef0-332e', first_name: 'Vikram', last_name: 'Rao', email: 'vikram.rao@enterprise.in', segment_id: 'SEG_BRONZE', lifetime_value: 4120.00, created_at: '2025-06-01T16:00:00Z', status: 'CHURNED' },
    ],
  },
  {
    name: 'orders',
    description: 'Header transactions record. Note: Use this table; orders_legacy is deprecated.',
    rowCount: 182400,
    sizeBytes: '28.4 MB',
    columns: [
      { name: 'order_id', type: 'UUID', isPrimaryKey: true, nullable: false, description: 'Primary order identifier' },
      { name: 'customer_id', type: 'UUID', isForeignKey: true, references: { table: 'customers', column: 'customer_id' }, nullable: false, description: 'Customer placing the order' },
      { name: 'order_date', type: 'TIMESTAMPTZ', nullable: false, description: 'Timestamp when order was submitted' },
      { name: 'status', type: 'VARCHAR(30)', nullable: false, description: 'COMPLETED, PROCESSING, CANCELLED, REFUNDED' },
      { name: 'gross_amount', type: 'NUMERIC(12,2)', nullable: false, description: 'Total charge including taxes and shipping' },
      { name: 'shipping_fee', type: 'NUMERIC(8,2)', nullable: false, description: 'Shipping charge' },
      { name: 'discount_amount', type: 'NUMERIC(10,2)', nullable: false, description: 'Promotional discount applied' },
    ],
    sampleRows: [
      { order_id: 'ord-9041', customer_id: 'c83f1-482a', order_date: '2026-11-06T14:22:10Z', status: 'COMPLETED', gross_amount: 3450.00, shipping_fee: 50.00, discount_amount: 200.00 },
      { order_id: 'ord-9042', customer_id: 'e29a4-118b', order_date: '2026-11-06T15:10:04Z', status: 'COMPLETED', gross_amount: 12400.00, shipping_fee: 0.00, discount_amount: 800.00 },
      { order_id: 'ord-9043', customer_id: '91bc2-771c', order_date: '2026-11-06T16:05:40Z', status: 'CANCELLED', gross_amount: 890.00, shipping_fee: 25.00, discount_amount: 0.00 },
      { order_id: 'ord-9044', customer_id: '33dd8-994d', order_date: '2026-11-07T02:18:55Z', status: 'COMPLETED', gross_amount: 4120.00, shipping_fee: 40.00, discount_amount: 150.00 },
      { order_id: 'ord-9045', customer_id: '71ef0-332e', order_date: '2026-11-07T04:40:12Z', status: 'REFUNDED', gross_amount: 2100.00, shipping_fee: 30.00, discount_amount: 0.00 },
    ],
  },
  {
    name: 'order_items',
    description: 'Individual line items purchased within each order with unit pricing and discount breakdown.',
    rowCount: 495000,
    sizeBytes: '52.1 MB',
    columns: [
      { name: 'item_id', type: 'UUID', isPrimaryKey: true, nullable: false, description: 'Line item primary key' },
      { name: 'order_id', type: 'UUID', isForeignKey: true, references: { table: 'orders', column: 'order_id' }, nullable: false, description: 'Parent order reference' },
      { name: 'product_id', type: 'UUID', isForeignKey: true, references: { table: 'products', column: 'product_id' }, nullable: false, description: 'Catalog item reference' },
      { name: 'quantity', type: 'INTEGER', nullable: false, description: 'Units purchased' },
      { name: 'unit_price', type: 'NUMERIC(10,2)', nullable: false, description: 'Price per unit at purchase time' },
      { name: 'discount_amount', type: 'NUMERIC(10,2)', nullable: false, description: 'Item level discount' },
    ],
    sampleRows: [
      { item_id: 'itm-01', order_id: 'ord-9041', product_id: 'prod-101', quantity: 2, unit_price: 1725.00, discount_amount: 100.00 },
      { item_id: 'itm-02', order_id: 'ord-9042', product_id: 'prod-104', quantity: 1, unit_price: 12400.00, discount_amount: 800.00 },
      { item_id: 'itm-03', order_id: 'ord-9043', product_id: 'prod-102', quantity: 1, unit_price: 890.00, discount_amount: 0.00 },
      { item_id: 'itm-04', order_id: 'ord-9044', product_id: 'prod-103', quantity: 4, unit_price: 1030.00, discount_amount: 150.00 },
      { item_id: 'itm-05', order_id: 'ord-9045', product_id: 'prod-105', quantity: 1, unit_price: 2100.00, discount_amount: 0.00 },
    ],
  },
  {
    name: 'products',
    description: 'Catalog products with cost of goods sold, retail price, stock level, and category tags.',
    rowCount: 3820,
    sizeBytes: '1.2 MB',
    columns: [
      { name: 'product_id', type: 'UUID', isPrimaryKey: true, nullable: false, description: 'Unique product identifier' },
      { name: 'product_name', type: 'VARCHAR(200)', nullable: false, description: 'Commercial product display name' },
      { name: 'category', type: 'VARCHAR(100)', nullable: false, description: 'Department e.g., Electronics, Audio, Wearables' },
      { name: 'unit_cost', type: 'NUMERIC(10,2)', nullable: false, description: 'Cost of goods sold (COGS)' },
      { name: 'retail_price', type: 'NUMERIC(10,2)', nullable: false, description: 'Current listing retail price' },
      { name: 'stock_quantity', type: 'INTEGER', nullable: false, description: 'Warehouse available count' },
      { name: 'status', type: 'VARCHAR(30)', nullable: false, description: 'ACTIVE, OUT_OF_STOCK, DISCONTINUED' },
    ],
    sampleRows: [
      { product_id: 'prod-101', product_name: 'Nova Pro ANC Headphones', category: 'Audio', unit_cost: 650.00, retail_price: 1725.00, stock_quantity: 412, status: 'ACTIVE' },
      { product_id: 'prod-102', product_name: 'Swift Charge Ultra 100W', category: 'Accessories', unit_cost: 280.00, retail_price: 890.00, stock_quantity: 1250, status: 'ACTIVE' },
      { product_id: 'prod-103', product_name: 'PulseTrack GPS Smartwatch', category: 'Wearables', unit_cost: 410.00, retail_price: 1030.00, stock_quantity: 68, status: 'ACTIVE' },
      { product_id: 'prod-104', product_name: 'NovaBook Max 16 M-Studio', category: 'Computing', unit_cost: 7800.00, retail_price: 12400.00, stock_quantity: 24, status: 'ACTIVE' },
      { product_id: 'prod-105', product_name: 'AcousticWave Desktop Soundbar', category: 'Audio', unit_cost: 950.00, retail_price: 2100.00, stock_quantity: 180, status: 'ACTIVE' },
    ],
  },
  {
    name: 'payments',
    description: 'Payment settlement records from Stripe, Razorpay, and UPI gateways.',
    rowCount: 191000,
    sizeBytes: '22.8 MB',
    columns: [
      { name: 'payment_id', type: 'UUID', isPrimaryKey: true, nullable: false, description: 'Unique payment identifier' },
      { name: 'order_id', type: 'UUID', isForeignKey: true, references: { table: 'orders', column: 'order_id' }, nullable: false, description: 'Associated order' },
      { name: 'payment_method', type: 'VARCHAR(50)', nullable: false, description: 'CREDIT_CARD, UPI, NET_BANKING, COD' },
      { name: 'amount', type: 'NUMERIC(12,2)', nullable: false, description: 'Amount captured' },
      { name: 'gateway_status', type: 'VARCHAR(30)', nullable: false, description: 'CAPTURED, SETTLED, FAILED, REFUNDED' },
      { name: 'processed_at', type: 'TIMESTAMPTZ', nullable: false, description: 'Settlement timestamp' },
    ],
    sampleRows: [
      { payment_id: 'pay-7701', order_id: 'ord-9041', payment_method: 'UPI', amount: 3450.00, gateway_status: 'SETTLED', processed_at: '2026-11-06T14:22:15Z' },
      { payment_id: 'pay-7702', order_id: 'ord-9042', payment_method: 'CREDIT_CARD', amount: 12400.00, gateway_status: 'SETTLED', processed_at: '2026-11-06T15:10:10Z' },
      { payment_id: 'pay-7703', order_id: 'ord-9043', payment_method: 'NET_BANKING', amount: 890.00, gateway_status: 'REFUNDED', processed_at: '2026-11-06T16:06:01Z' },
      { payment_id: 'pay-7704', order_id: 'ord-9044', payment_method: 'UPI', amount: 4120.00, gateway_status: 'SETTLED', processed_at: '2026-11-07T02:19:02Z' },
    ],
  },
  {
    name: 'refunds',
    description: 'Customer returns and partial or full chargeback/refund transactions.',
    rowCount: 8740,
    sizeBytes: '1.9 MB',
    columns: [
      { name: 'refund_id', type: 'UUID', isPrimaryKey: true, nullable: false, description: 'Unique refund identifier' },
      { name: 'order_id', type: 'UUID', isForeignKey: true, references: { table: 'orders', column: 'order_id' }, nullable: false, description: 'Order being refunded' },
      { name: 'refund_amount', type: 'NUMERIC(10,2)', nullable: false, description: 'Amount returned to customer' },
      { name: 'reason', type: 'VARCHAR(255)', nullable: false, description: 'Return reason code' },
      { name: 'status', type: 'VARCHAR(30)', nullable: false, description: 'COMPLETED, PENDING, REJECTED' },
      { name: 'processed_at', type: 'TIMESTAMPTZ', nullable: false, description: 'Refund execution date' },
    ],
    sampleRows: [
      { refund_id: 'ref-301', order_id: 'ord-9045', refund_amount: 2100.00, reason: 'DEFECTIVE_PRODUCT', status: 'COMPLETED', processed_at: '2026-11-07T05:12:00Z' },
      { refund_id: 'ref-302', order_id: 'ord-8812', refund_amount: 890.00, reason: 'LATE_DELIVERY_CANCEL', status: 'COMPLETED', processed_at: '2026-11-05T09:30:15Z' },
      { refund_id: 'ref-303', order_id: 'ord-8650', refund_amount: 1725.00, reason: 'CUSTOMER_RETURN_SATISFACTION', status: 'COMPLETED', processed_at: '2026-11-04T18:22:40Z' },
    ],
  },
  {
    name: 'customer_segments',
    description: 'Business tier taxonomy classifying NovaMart buyers according to annual spend threshold.',
    rowCount: 4,
    sizeBytes: '12 KB',
    columns: [
      { name: 'segment_id', type: 'VARCHAR(50)', isPrimaryKey: true, nullable: false, description: 'Segment code' },
      { name: 'segment_name', type: 'VARCHAR(100)', nullable: false, description: 'Human friendly name' },
      { name: 'min_annual_spend', type: 'NUMERIC(12,2)', nullable: false, description: 'Annual qualifying spend' },
      { name: 'vip_tier_rank', type: 'INTEGER', nullable: false, description: '1 (highest) to 4 (entry)' },
      { name: 'description', type: 'TEXT', nullable: true, description: 'Corporate business rule notes' },
    ],
    sampleRows: [
      { segment_id: 'SEG_PLATINUM', segment_name: 'Platinum VIP', min_annual_spend: 100000.00, vip_tier_rank: 1, description: 'Top 1% spenders, dedicated account management' },
      { segment_id: 'SEG_GOLD', segment_name: 'Gold Executive', min_annual_spend: 50000.00, vip_tier_rank: 2, description: 'Premium customer tier with priority support' },
      { segment_id: 'SEG_SILVER', segment_name: 'Silver Preferred', min_annual_spend: 10000.00, vip_tier_rank: 3, description: 'Frequent buyers with monthly active purchasing' },
      { segment_id: 'SEG_BRONZE', segment_name: 'Bronze Standard', min_annual_spend: 0.00, vip_tier_rank: 4, description: 'Default introductory shopper classification' },
    ],
  },
];

