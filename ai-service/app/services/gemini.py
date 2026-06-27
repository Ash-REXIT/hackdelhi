import json
from app.config import get_settings
from app.services import ollama

try:
    import google.generativeai as genai
except ImportError:
    genai = None  # type: ignore

_settings = get_settings()

if genai and _settings.gemini_api_key:
    genai.configure(api_key=_settings.gemini_api_key)

_model = None


def get_model():
    global _model
    if _model is None and genai and _settings.gemini_api_key:
        _model = genai.GenerativeModel(_settings.gemini_model)
    return _model


def ai_provider() -> str:
    if _settings.gemini_api_key:
        return f"gemini:{_settings.gemini_model}"
    if _settings.ollama_enabled:
        return f"ollama:{_settings.ollama_model}"
    return "rules-only"


async def generate_json(prompt: str, fallback: dict, timeout: float = 20.0) -> dict:
    model = get_model()
    if model and genai:
        try:
            response = model.generate_content(
                prompt,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    temperature=0.1,
                ),
            )
            return json.loads(response.text)
        except Exception as exc:
            print(f"Gemini error: {exc}")

    return await ollama.generate_json(prompt, fallback, timeout=timeout)


async def generate_text(prompt: str, fallback: str = "") -> str:
    model = get_model()
    if model:
        try:
            response = model.generate_content(prompt)
            return response.text or fallback
        except Exception as exc:
            print(f"Gemini error: {exc}")

    return await ollama.generate_text(prompt, fallback)
