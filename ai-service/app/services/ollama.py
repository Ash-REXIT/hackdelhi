import json
import httpx
from app.config import get_settings


async def generate_json(prompt: str, fallback: dict, timeout: float = 20.0) -> dict:
    settings = get_settings()
    if not settings.ollama_enabled:
        return fallback

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.post(
                f"{settings.ollama_base_url.rstrip('/')}/api/generate",
                json={
                    "model": settings.ollama_model,
                    "prompt": prompt,
                    "stream": False,
                    "format": "json",
                },
            )
            response.raise_for_status()
            body = response.json()
            return json.loads(body.get("response") or "{}")
    except Exception as exc:
        print(f"Ollama error: {exc}")
        return fallback


async def generate_text(prompt: str, fallback: str = "", timeout: float = 60.0) -> str:
    settings = get_settings()
    if not settings.ollama_enabled:
        return fallback

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.post(
                f"{settings.ollama_base_url.rstrip('/')}/api/generate",
                json={
                    "model": settings.ollama_model,
                    "prompt": prompt,
                    "stream": False,
                },
            )
            response.raise_for_status()
            return response.json().get("response") or fallback
    except Exception as exc:
        print(f"Ollama error: {exc}")
        return fallback
