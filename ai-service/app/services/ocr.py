import io
import re
from typing import Optional

_ocr_engine = None


def get_paddle_ocr():
    global _ocr_engine
    if _ocr_engine is None:
        try:
            from paddleocr import PaddleOCR
            _ocr_engine = PaddleOCR(use_angle_cls=True, lang="en", show_log=False)
        except Exception as e:
            print(f"PaddleOCR init failed: {e}")
            _ocr_engine = False
    return _ocr_engine if _ocr_engine is not False else None


def extract_text_from_pdf(file_bytes: bytes) -> tuple[str, float]:
    try:
        from pypdf import PdfReader
        reader = PdfReader(io.BytesIO(file_bytes))
        texts = []
        for page in reader.pages:
            texts.append(page.extract_text() or "")
        text = "\n".join(texts).strip()
        confidence = 95.0 if len(text) > 50 else 60.0
        return text, confidence
    except Exception:
        return "", 0.0


def extract_text_from_image(file_bytes: bytes) -> tuple[str, float]:
    ocr = get_paddle_ocr()
    if not ocr:
        return "", 30.0

    try:
        from PIL import Image
        import numpy as np
        image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
        result = ocr.ocr(np.array(image), cls=True)
        lines = []
        confidences = []
        if result and result[0]:
            for line in result[0]:
                if line and len(line) >= 2:
                    text = line[1][0]
                    conf = line[1][1] * 100
                    lines.append(text)
                    confidences.append(conf)
        text = "\n".join(lines)
        avg_conf = sum(confidences) / len(confidences) if confidences else 50.0
        return text, round(avg_conf, 2)
    except Exception as e:
        print(f"OCR error: {e}")
        return "", 20.0


def extract_text_from_excel(file_bytes: bytes) -> tuple[str, float]:
    try:
        import openpyxl
        wb = openpyxl.load_workbook(io.BytesIO(file_bytes), read_only=True, data_only=True)
        lines = []
        for sheet in wb.worksheets:
            lines.append(f"--- {sheet.title} ---")
            for row in sheet.iter_rows(values_only=True):
                line = " | ".join(str(c) if c is not None else "" for c in row)
                if line.strip(" |"):
                    lines.append(line)
        text = "\n".join(lines)
        return text, 98.0
    except ImportError:
        return "Excel content (openpyxl not installed)", 70.0
    except Exception:
        return "", 40.0


def extract_text_from_plain(file_bytes: bytes) -> tuple[str, float]:
    try:
        text = file_bytes.decode("utf-8", errors="replace").strip()
        return text, 99.0 if text else 30.0
    except Exception:
        return "", 20.0


async def run_ocr(file_bytes: bytes, filename: str, content_type: str) -> dict:
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""

    if ext in ("txt", "eml") or "text/plain" in content_type or "message/rfc822" in content_type:
        text, confidence = extract_text_from_plain(file_bytes)
    elif ext in ("pdf",) or "pdf" in content_type:
        text, confidence = extract_text_from_pdf(file_bytes)
        if confidence < 50 or len(text.strip()) < 20:
            img_text, img_conf = extract_text_from_image(file_bytes)
            if img_conf > confidence:
                text, confidence = img_text, img_conf
    elif ext in ("xlsx", "xls") or "spreadsheet" in content_type or "excel" in content_type:
        text, confidence = extract_text_from_excel(file_bytes)
    else:
        text, confidence = extract_text_from_image(file_bytes)

    if not text.strip():
        text = f"[OCR placeholder for {filename}]"
        confidence = 25.0

    return {"text": text, "confidence": confidence}
