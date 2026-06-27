#!/bin/sh
set -e

MODEL="${OLLAMA_MODEL:-qwen2.5:7b}"

ollama serve &
SERVE_PID=$!

echo "==> Ollama server starting..."
sleep 5

if ollama list 2>/dev/null | grep -Fq "${MODEL}"; then
  echo "==> Model ${MODEL} already present."
else
  echo "==> Pulling ${MODEL} in background (first run may take 5–15 min)..."
  ollama pull "${MODEL}" &
fi

wait "${SERVE_PID}"
