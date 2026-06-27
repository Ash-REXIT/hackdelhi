"""Instant review explanations — rule-based only (no slow LLM calls)."""


def explain_review_summary(payload: dict) -> dict:
    failed = payload.get("failedValidation") or []
    fraud = [r for r in (payload.get("fraudReasons") or []) if (r.get("score") or 0) > 0]
    flagged = payload.get("flaggedFields") or []
    review_type = payload.get("reviewType", "review")

    validation_parts = [f"{r.get('ruleName', r.get('ruleKey'))}: {r.get('message')}" for r in failed]
    fraud_parts = [f"{r.get('checkType', '').replace('_', ' ')}: {r.get('reason')} (score +{r.get('score')})" for r in fraud]
    confidence_parts = [f.get("issue") or f"{f.get('field')}: low confidence ({f.get('confidence')}%)" for f in flagged]

    validation_text = (
        "; ".join(validation_parts) if validation_parts else "All configured business rules passed."
    )
    fraud_text = (
        "; ".join(fraud_parts) if fraud_parts else "No fraud indicators detected."
    )
    confidence_text = (
        "; ".join(confidence_parts)
        if confidence_parts
        else f"Overall confidence {payload.get('overallConfidence')}% is below the {payload.get('confidenceThreshold')}% auto-invoice threshold."
    )

    summary_bits = []
    if review_type == "low_confidence":
        summary_bits.append(
            f"Routed to manual review: extraction confidence ({payload.get('overallConfidence')}%) "
            f"is below the {payload.get('confidenceThreshold')}% threshold."
        )
    elif review_type == "validation_failed":
        summary_bits.append("Routed to manual review: one or more validation rules failed.")
    elif review_type == "fraud":
        summary_bits.append(
            f"Routed to manual review: elevated fraud risk "
            f"({payload.get('fraudRiskLevel')}, score {payload.get('fraudScore')})."
        )
    elif review_type == "ambiguity":
        summary_bits.append("Routed to manual review: employee or client assignment is ambiguous.")
    elif review_type == "client_overtime":
        summary_bits.append("Overtime exceeds client policy — awaiting client approval.")
    else:
        summary_bits.append("Routed to manual FinOps review.")

    if confidence_parts:
        summary_bits.append(confidence_text)
    if validation_parts:
        summary_bits.append(f"Validation: {validation_text}")
    if fraud_parts:
        summary_bits.append(f"Fraud: {fraud_text}")

    ambiguity = payload.get("ambiguityReasons") or []
    if ambiguity:
        summary_bits.append(f"Ambiguity: {'; '.join(ambiguity)}")

    return {
        "summary": " ".join(summary_bits),
        "validationExplanation": validation_text,
        "fraudExplanation": fraud_text,
        "confidenceExplanation": confidence_text,
    }


async def enhance_review_summary(payload: dict) -> dict:
    """Rewrite rule-based analysis using Gemini or Ollama."""
    base = explain_review_summary(payload)

    prompt = f"""You are a FinOps AI assistant. Rewrite this timesheet review for a human reviewer.

Use clear, professional plain English. Keep every factual detail (names, IDs, percentages, rule names).
Be concise: 2-3 sentences for summary, 1-2 sentences per section.

REVIEW TYPE: {payload.get("reviewType")}
EXTRACTED DATA: {payload.get("extracted")}
FIELD CONFIDENCE (%): {payload.get("fieldConfidence")}
OVERALL CONFIDENCE: {payload.get("overallConfidence")}% (threshold: {payload.get("confidenceThreshold")}%)
FAILED VALIDATION: {payload.get("failedValidation")}
FRAUD SIGNALS: {payload.get("fraudReasons")} (risk {payload.get("fraudRiskLevel")}, score {payload.get("fraudScore")})
AMBIGUITY: {payload.get("ambiguityReasons")}
FLAGGED FIELDS: {payload.get("flaggedFields")}
MATCH CANDIDATES: {payload.get("matchCandidates")}

CURRENT RULE-BASED TEXT:
Summary: {base["summary"]}
Validation: {base["validationExplanation"]}
Fraud: {base["fraudExplanation"]}
Confidence: {base["confidenceExplanation"]}

Return JSON only with keys: summary, validationExplanation, fraudExplanation, confidenceExplanation"""

    from app.services.gemini import generate_json, ai_provider

    enhanced = await generate_json(prompt, base, timeout=45.0)

    return {
        "summary": enhanced.get("summary") or base["summary"],
        "validationExplanation": enhanced.get("validationExplanation") or base["validationExplanation"],
        "fraudExplanation": enhanced.get("fraudExplanation") or base["fraudExplanation"],
        "confidenceExplanation": enhanced.get("confidenceExplanation") or base["confidenceExplanation"],
        "enhanced": True,
        "provider": ai_provider(),
    }
