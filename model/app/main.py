import os
import io
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image

app = FastAPI(title="Disaster Detection API")

# Path to the model
MODEL_PATH = r"c:\Users\YUVRAJ KABADWAL\Downloads\Disaster_2\Comprehensive Disaster Dataset(CDD)\image_classification_model.h5"

# Load the model
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model not found at {MODEL_PATH}")

print("Loading model... this may take a moment.")
model = load_model(MODEL_PATH)
print("Model loaded successfully.")

# Class labels mapping
CLASS_LABELS = {
    0: 'Damaged Infrastructure',
    1: 'Fire Disaster',
    2: 'Human Damage',
    3: 'Land Disaster',
    4: 'Non Damage',
    5: 'Water Disaster'
}

IMG_SIZE = (150, 150)

# Get the directory of the current file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

# Serve static files
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/", response_class=HTMLResponse)
async def read_index():
    index_path = os.path.join(STATIC_DIR, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        return f.read()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Preprocess
        # 1. Center Crop to square to prevent distortion
        width, height = image.size
        new_size = min(width, height)
        left = (width - new_size) / 2
        top = (height - new_size) / 2
        right = (width + new_size) / 2
        bottom = (height + new_size) / 2
        image = image.crop((left, top, right, bottom))
        
        # 2. Resize and normalize
        image = image.resize(IMG_SIZE)
        img_array = img_to_array(image)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0  # Normalization
        
        # Inference
        predictions = model.predict(img_array)
        class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][class_idx])
        
        result = {
            "class_name": CLASS_LABELS[class_idx],
            "confidence": round(confidence * 100, 2),
            "all_predictions": {CLASS_LABELS[i]: round(float(predictions[0][i]) * 100, 2) for i in range(len(CLASS_LABELS))}
        }
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/feedback")
async def feedback(data: dict):
    # Log feedback to console (could be saved to a database/file)
    print(f"Prediction Feedback received: {data}")
    return {"status": "success", "message": "Feedback received"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
