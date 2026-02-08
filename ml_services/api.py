from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Create FastAPI app
app = FastAPI()

# Load model ONCE when server starts
model = joblib.load("model.pkl")

# Define expected request body
class InputData(BaseModel):
    text: str

# Prediction endpoint
@app.post("/analyze")
def analyze(data: InputData):

    prediction = model.predict([data.text])

    return {
        "matchScore": float(prediction[0])
    }
