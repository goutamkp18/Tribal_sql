import { apiFetch, ApiResponse } from './api';
import { QueryExecutionResult } from '../types';
import { presetQueries } from '../data/mockQueryStudio';
import { mockRetainedMemories } from '../data/mockMemories';

export async function generateSQL(naturalQuery: string): Promise<ApiResponse<QueryExecutionResult>> {
  return apiFetch<QueryExecutionResult>(
    '/query/generate',
    {
      method: 'POST',
      body: JSON.stringify({ query: naturalQuery, company: 'NovaMart' }),
    },
    async () => {
      // Find matching preset or generate dynamic intelligent response
      const clean = naturalQuery.trim().toLowerCase();
      const match = presetQueries.find(p => 
        clean.includes(p.question.toLowerCase().slice(0, 15)) ||
        p.question.toLowerCase().includes(clean.slice(0, 15))
      );

      if (match) {
        return {
          ...match.result,
          naturalQuery,
        };
      }

      // Dynamic fallback for custom user queries
      return {
        id: `dyn-q-${Date.now()}`,
        naturalQuery,
        status: 'success',
        executionTimeMs: 184,
        rowCount: 3,
        recalledMemories: [
          mockRetainedMemories[0],
          mockRetainedMemories[1],
        ],
        businessRulesUsed: [
          'Excludes CANCELLED orders per corporate GAAP policy',
          'Recalled NovaMart customer segment definitions (Gold & Platinum)',
          'Applied safe NULLIF on aggregate ratios',
        ],
        generatedSql: `-- Dynamically generated for: "${naturalQuery}"
-- Recalled Hindsight Memories: mem-001 (Net Revenue), mem-002 (VIP Segment Rules)

SELECT 
  c.first_name || ' ' || c.last_name AS customer_name,
  cs.segment_name,
  COUNT(o.order_id) AS total_orders,
  ROUND(SUM(o.gross_amount) - COALESCE(SUM(r.refund_amount), 0), 2) AS calculated_net_revenue
FROM customers c
JOIN customer_segments cs ON c.segment_id = cs.segment_id
JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN refunds r ON o.order_id = r.order_id
WHERE o.status != 'CANCELLED'
GROUP BY c.customer_id, c.first_name, c.last_name, cs.segment_name
ORDER BY calculated_net_revenue DESC
LIMIT 10;`,
        explanation: `TribalSQL interpreted your natural language prompt against NovaMart schema and applied 2 institutional memory guardrails (Net revenue refund subtraction and segment joins).`,
        columns: ['customer_name', 'segment_name', 'total_orders', 'calculated_net_revenue'],
        rows: [
          { customer_name: 'Priya Nair', segment_name: 'Platinum VIP', total_orders: 28, calculated_net_revenue: 112450.50 },
          { customer_name: 'Ananya Deshmukh', segment_name: 'Gold Executive', total_orders: 19, calculated_net_revenue: 73900.25 },
          { customer_name: 'Aarav Sharma', segment_name: 'Gold Executive', total_orders: 14, calculated_net_revenue: 58240.00 },
        ],
        chartSuggestion: {
          type: 'bar',
          xKey: 'customer_name',
          yKey: 'calculated_net_revenue',
          title: 'Top Accounts by Calculated Net Revenue ($ USD)',
        },
        demoDataNotice: 'Executed in simulated NovaMart demo environment. Backend ready for PostgreSQL connection.',
      };
    }
  );
}

export async function executeSQL(sql: string): Promise<ApiResponse<{ rows: any[]; columns: string[]; executionTimeMs: number }>> {
  return apiFetch(
    '/query/execute',
    {
      method: 'POST',
      body: JSON.stringify({ sql }),
    },
    async () => {
      // Mock execution delay
      return {
        columns: ['segment_name', 'total_orders', 'gross_revenue', 'total_refunds', 'net_revenue'],
        rows: [
          { segment_name: 'Platinum VIP', total_orders: 842, gross_revenue: 1248000.00, total_refunds: 18200.00, net_revenue: 1229800.00 },
          { segment_name: 'Gold Executive', total_orders: 1420, gross_revenue: 894500.00, total_refunds: 23100.00, net_revenue: 871400.00 },
        ],
        executionTimeMs: 148,
      };
    }
  );
}

export async function explainSQL(sql: string): Promise<ApiResponse<{ explanation: string; rules: string[] }>> {
  return apiFetch(
    '/query/explain',
    {
      method: 'POST',
      body: JSON.stringify({ sql }),
    },
    async () => {
      return {
        explanation: 'The query evaluates customer orders against active refund line-items. It applies index scans on order_id and customer_id, aggregates revenue grouping by customer segment tier, and strips out all cancelled order headers.',
        rules: [
          'Filter out orders with status = CANCELLED',
          'Left join refunds to deduct settled returns',
          'Group by customer_segments.vip_tier_rank for index ordering',
        ],
      };
    }
  );
}

