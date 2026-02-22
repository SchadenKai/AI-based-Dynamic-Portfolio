# Cost Estimation: The Contextual Architect

This document provides a detailed cost analysis for running "The Contextual Architect" portfolio on Google Cloud infrastructure.

---

## Executive Summary

| Time Period | Estimated Cost |
|-------------|----------------|
| **Monthly** | **$0.00 - $0.50** |
| **Yearly**  | **$0.00 - $6.00** |

> [!TIP]
> With proper rate limiting and staying within free tier allocations, this project is designed to run at **$0.00/month** for typical personal portfolio traffic.

---

## Infrastructure Overview

| Service | Provider | Tier |
|---------|----------|------|
| AI Engine | Vertex AI (Gemini 2.5 Flash) | Free Tier |
| Compute | Google Cloud Run | Free Tier |
| DNS | Cloudflare | Free Tier |
| Container Registry | Google Artifact Registry | Free Tier |

---

## Detailed Cost Breakdown

### 1. Vertex AI / Gemini 2.5 Flash

#### Rate Limiting Configuration (Implemented)
Your API route enforces:
- **5 requests/minute** per user (IP-based)
- **20 requests/day** per user

#### Gemini 2.5 Flash Pricing (via Google AI Studio / Vertex AI)

| Metric | Free Tier | Paid Rate |
|--------|-----------|-----------|
| Input tokens | Unlimited* | $0.075 / 1M tokens |
| Output tokens | Unlimited* | $0.30 / 1M tokens |
| Rate Limit (Free) | 15 RPM, 1M TPM | Higher with payment |

*Free tier has rate limits but no per-token cost.

#### Token Usage Estimation

Based on your system prompt and typical interactions:

| Component | Estimated Tokens |
|-----------|------------------|
| System Prompt (context) | ~800 tokens |
| User Message (average) | ~200 tokens |
| AI Response (JSON) | ~150 tokens |
| **Total per Request** | **~1,150 tokens** |

#### Monthly Usage Scenarios

| Scenario | Daily Visitors | Requests/Day | Monthly Requests | Token Usage | Cost |
|----------|----------------|--------------|------------------|-------------|------|
| **Low Traffic** | 10 | 50 | 1,500 | 1.7M tokens | **$0.00** (free tier) |
| **Medium Traffic** | 50 | 250 | 7,500 | 8.6M tokens | **$0.00** (free tier*) |
| **High Traffic** | 200 | 1,000 | 30,000 | 34.5M tokens | **$0.00 - $3.00** |
| **Viral Scenario** | 1,000+ | 5,000+ | 150,000+ | 172M+ tokens | **$13.00+** |

> [!NOTE]
> *The Gemini Developer API free tier provides generous limits. If you exceed free tier limits, pricing is approximately **$0.375 per 1M tokens** (blended input/output average).

---

### 2. Google Cloud Run

#### Free Tier Allocation (Monthly)

| Resource | Free Allowance |
|----------|----------------|
| Requests | **2 million** |
| CPU | **180,000 vCPU-seconds** |
| Memory | **360,000 GB-seconds** |
| Outbound Data | **1 GB** (North America) |

#### Your Container Configuration

| Setting | Value |
|---------|-------|
| Memory | 512 MB (estimated) |
| vCPU | 1 |
| Concurrency | 80 |
| Min Instances | 0 (cold start enabled) |

#### Resource Consumption Estimate

Assuming **average response time of 2 seconds** per AI request:

| Scenario | Requests/Month | CPU-seconds | Memory (GB-s) | Cost |
|----------|----------------|-------------|---------------|------|
| **Low** | 1,500 | 3,000 | 1,500 | **$0.00** |
| **Medium** | 7,500 | 15,000 | 7,500 | **$0.00** |
| **High** | 30,000 | 60,000 | 30,000 | **$0.00** |
| **Viral** | 150,000+ | 300,000+ | 150,000+ | **~$5.00+** |

> [!IMPORTANT]
> For typical portfolio traffic (< 30,000 requests/month), Cloud Run will cost **$0.00**.

#### Beyond Free Tier Pricing

| Resource | Price |
|----------|-------|
| CPU | $0.00002400 / vCPU-second |
| Memory | $0.00000250 / GB-second |
| Requests | $0.40 / million (beyond 2M) |

---

### 3. Cloudflare DNS

| Feature | Tier | Cost |
|---------|------|------|
| DNS Management | Free | **$0.00** |
| SSL/TLS | Free | **$0.00** |
| DDoS Protection | Free (basic) | **$0.00** |
| CDN | Free | **$0.00** |
| Page Rules | 3 free | **$0.00** |

**Monthly Cost: $0.00**

---

### 4. Google Artifact Registry (Container Storage)

| Allocation | Free Tier |
|------------|-----------|
| Storage | **0.5 GB/month** |

Your Docker image is likely < 500 MB, keeping you within free tier.

**Monthly Cost: $0.00**

---

### 5. Domain Registration (Optional)

If using a custom domain:

| Domain Type | Annual Cost |
|-------------|-------------|
| `.dev` | ~$12-15/year |
| `.com` | ~$10-12/year |
| `.io` | ~$30-40/year |
| GitHub Pages (free subdomain) | **$0.00** |

---

## Cost Summary Tables

### Monthly Cost Estimate

| Service | Low Traffic | Medium | High | Viral |
|---------|-------------|--------|------|-------|
| Vertex AI / Gemini | $0.00 | $0.00 | $0.00-3.00 | $13.00+ |
| Cloud Run | $0.00 | $0.00 | $0.00 | ~$5.00 |
| Cloudflare DNS | $0.00 | $0.00 | $0.00 | $0.00 |
| Artifact Registry | $0.00 | $0.00 | $0.00 | $0.00 |
| **TOTAL** | **$0.00** | **$0.00** | **$0.00-3.00** | **$18.00+** |

### Yearly Cost Estimate

| Service | Low Traffic | Medium | High | Viral |
|---------|-------------|--------|------|-------|
| Vertex AI / Gemini | $0.00 | $0.00 | $0.00-36.00 | $156.00+ |
| Cloud Run | $0.00 | $0.00 | $0.00 | ~$60.00 |
| Cloudflare DNS | $0.00 | $0.00 | $0.00 | $0.00 |
| Artifact Registry | $0.00 | $0.00 | $0.00 | $0.00 |
| Domain (optional) | $12.00 | $12.00 | $12.00 | $12.00 |
| **TOTAL** | **$0.00-12.00** | **$0.00-12.00** | **$12.00-48.00** | **$228.00+** |

---

## Cost Control Measures Implemented

### 1. Rate Limiting (Already Active)
```typescript
const RATE_LIMIT = {
  REQUESTS_PER_MINUTE: 5,
  REQUESTS_PER_DAY: 20,
  // ...
};
```

This limits maximum token consumption per IP address.

### 2. Cold Start Configuration
- **Min Instances: 0** — No charges when no traffic
- Trade-off: ~1-2 second cold start delay

### 3. Graceful Degradation
Your API returns a **default layout** if Gemini fails, preventing retry storms.

### 4. Client-Side Caching
Consider implementing:
- Cache AI responses in `localStorage` (already done)
- Prevent duplicate requests for same queries

---

## Recommendations for $0.00 Operation

1. **Keep rate limits** — The current 5/min and 20/day per user is reasonable
2. **Use cold starts** — Don't set min instances unless needed
3. **Monitor usage** — Set up Google Cloud billing alerts at $1 and $5
4. **Stay in free regions** — Use `us-central1` for Cloud Run
5. **Optimize container** — Smaller image = faster cold starts = less CPU time

---

## Billing Alerts Setup

To avoid surprise charges, configure alerts in Google Cloud Console:

```
Cloud Console → Billing → Budgets & alerts → Create Budget
```

Recommended thresholds:
- Alert at **$1.00** (50% of $2 budget)
- Alert at **$2.00** (100% of budget)
- Alert at **$5.00** (emergency threshold)

---

## Conclusion

> [!TIP]
> **For a typical developer portfolio with normal traffic, expect to pay $0.00/month.** The architecture is specifically designed to maximize free tier usage while providing a premium experience.

The only scenario where costs begin to appear is during "viral" traffic events (1000+ daily visitors consistently using the AI chat), at which point the portfolio has already served its purpose of attracting attention! 🚀
