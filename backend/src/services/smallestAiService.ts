import { config } from '../lib/config';

const PULSE_URL = 'https://api.smallest.ai/waves/v1/pulse/get_text';

export async function transcribeAudio(
  audioBuffer: Buffer,
  contentType: string,
  filename: string
): Promise<string> {
  if (!config.smallestAi.apiKey) {
    throw new Error('Voice transcription is not configured. Add SMALLEST_AI_API_KEY to .env');
  }

  const ext = filename.includes('.') ? filename.split('.').pop()?.toLowerCase() : '';
  const format =
    ext === 'webm' ? 'webm' : ext === 'wav' ? 'wav' : ext === 'mp3' ? 'mp3' : ext === 'm4a' ? 'm4a' : undefined;

  const params = new URLSearchParams({
    language: 'en',
    punctuate: 'true',
    capitalize: 'true',
  });
  if (format) params.set('format', format);

  const res = await fetch(`${PULSE_URL}?${params}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.smallestAi.apiKey}`,
      'Content-Type': contentType || 'application/octet-stream',
    },
    body: audioBuffer,
  });

  const body = (await res.json().catch(() => ({}))) as {
    transcription?: string;
    text?: string;
    status?: string;
    error?: string;
    message?: string;
  };

  if (!res.ok) {
    throw new Error(body.error || body.message || `Smallest.ai transcription failed (${res.status})`);
  }

  const text = (body.transcription || body.text || '').trim();
  if (!text) {
    throw new Error('No speech detected. Please try recording again and speak clearly.');
  }

  return text;
}
