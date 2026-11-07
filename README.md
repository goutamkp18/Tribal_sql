# TribalSQL — AI Agent That Learns From Database Experience

> **"Every correction becomes knowledge. Every query becomes smarter."**
> 
> *Built for Hackathon: Bengaluru 4.0 — AI Agents That Learn Using Hindsight.*
> *Demo Company: NovaMart (Enterprise E-commerce Platform).*

---

## 🌟 Executive Summary

**TribalSQL** is an institutional database intelligence agent designed to solve the critical enterprise text-to-SQL gap. While generic LLMs repeatedly make the same business logic errors (hallucinating deprecated schemas, omitting refund deductions from net revenue, or missing proprietary segmentation rules), TribalSQL uses **Hindsight persistent memory** to turn human corrections and execution experiences into permanent corporate knowledge.

---

## 🚀 Key Features & Architecture

### 1. Dashboard
- **Key Performance Indicators**: Total Queries (248), Success Rate (89.1%), Learned Corrections (18), and Hindsight Memories (56).
- **Interactive Visualizations**: Recharts 7-day query activity gradient area chart, query outcome donut chart, and memory categorization breakdown.
- **System Health Monitor**: Live statuses for PostgreSQL Aurora, Hindsight Cloud cluster, and Groq LLM inference.
- **Real-Time Activity Feeds**: Recent queries and recent institutional learnings with direct deep-links.

### 2. Query Studio (Core Experience)
- **Natural Language Input**: Large enterprise prompt bar with instant suggestion chips.
- **Hindsight Recall Banner**: Visualizes retrieved institutional memories with confidence/relevance scores and selection rationales.
- **Monaco/Prism-Style SQL Editor**: Syntax-highlighted SQL with line numbers, code editing toggle, one-click copy, and query explanation.
- **Interactive Results Table**: Column sorting, pagination, CSV export, and toggle to Chart view (Bar, Line, and Pie).
- **"Teach TribalSQL" Correction Flow**: Modal allowing employees to submit corrections on any query, immediately retaining new rules into Hindsight memory.

### 3. Database Explorer
- **Complete NovaMart Schema**: Interactive inspection of all 7 production tables (`customers`, `orders`, `order_items`, `products`, `payments`, `refunds`, `customer_segments`).
- **Relational Schema Graph**: Visual node cluster mapping foreign key constraints (`1:N`, `N:1`).
- **Column Inspector**: Primary keys (`PK`), Foreign keys (`FK`), column data types, nullable indicators, and schema descriptions.
- **Sample Data Viewer**: Realistic tabular records for each table.

### 4. Hindsight Memory Inspector (25% Hackathon Judging Weight)
- **Retain**: Displays institutional business rules, human corrections, SQL error fixes, deprecated tables, and success patterns with search and type filters.
- **Recall**: Semantic relevance scores, selection reasons, and triggered query associations.
- **Reflect**: Synthesized organizational truths with supporting evidence and impact scopes.
- **Mental Models**: Evolving domain logic for GAAP revenue, customer tiering, and return risk.
- **Memory Evolution Timeline**: Chronological log of how NovaMart's agent intelligence evolved.

### 5. Learning History
- **Audit Trail**: Detailed record of every correction event including the initial model mistake, employee explanation, resulting business rule, and verified SQL template.
- **Filters**: `All`, `Verified`, `Pending Review`, and `Superseded`.

### 6. Memory Comparison Studio
- **Side-by-Side Benchmark**: Compares generic Text-to-SQL without memory against TribalSQL with Hindsight memory across multiple realistic enterprise scenarios.
- **Vulnerability Breakdown**: Demonstrates how persistent memory prevents financial misreporting and database crashes.

### 7. Platform Settings & FastAPI Integration Layer
- Configurable endpoints for FastAPI backend (`/query/generate`, `/query/execute`, `/memory/retain`, etc.).
- Driver connection testing for PostgreSQL and Hindsight Cloud handshake.
- Toggle between local simulation mode and live backend.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Analytics & Charts**: Recharts
- **Font**: Inter & JetBrains Mono

---

## 🚦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized production build in `dist/`.
