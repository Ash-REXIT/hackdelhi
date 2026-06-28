from pathlib import Path
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

_ROOT_ENV = Path(__file__).resolve().parents[2] / ".env"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(_ROOT_ENV) if _ROOT_ENV.exists() else ".env",
        extra="ignore",
    )

    gemini_api_key: str = Field(default="", validation_alias="GEMINI_API_KEY")
    database_url: str = Field(
        default="postgresql://tia:tia_secret@localhost:5432/tia_db",
        validation_alias="DATABASE_URL",
    )
    gemini_model: str = Field(default="gemini-2.5-flash", validation_alias="GEMINI_MODEL")
    ollama_enabled: bool = Field(default=True, validation_alias="OLLAMA_ENABLED")
    ollama_base_url: str = Field(default="http://localhost:11434", validation_alias="OLLAMA_BASE_URL")
    ollama_model: str = Field(default="qwen2.5:7b", validation_alias="OLLAMA_MODEL")


@lru_cache
def get_settings() -> Settings:
    return Settings()
