from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    OPENAI_API_KEY: str

    CHROMA_HOST: str = "localhost"
    CHROMA_PORT: int = 8000

    AI_SERVICE_HOST: str = "0.0.0.0"
    AI_SERVICE_PORT: int = 8001

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()