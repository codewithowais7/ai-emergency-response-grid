import axios from 'axios';
import time
import random
import os
import requests
from dotenv import load_dotenv

load_dotenv()

BACKEND_URL = os.getenv("AERG_BACKEND_URL", "http://localhost:5000/api/emergencies")
DETECTION_INTERVAL = int(os.getenv("DETECTION_INTERVAL_SEC", 10))

def simulate_accident():
    types = ["accident", "medical", "fire", "other"]
    descriptions = [
        "Head-on collision reported near Central Plaza.",
        "Pedestrian collapsed on the sidewalk.",
        "Small electrical fire detected in commercial building.",
        "Emergency signal received from residential area."
    ]
    idx = random.randint(0, len(types) - 1)
    
    # Simulate coordinates around Central Delhi
    lat = 28.6139 + (random.random() - 0.5) * 0.05
    lng = 77.2090 + (random.random() - 0.5) * 0.05
    
    return {
        "type": types[idx],
        "description": descriptions[idx],
        "latitude": lat,
        "longitude": lng,
        "callerName": "AI-Detection-System"
    }

def main():
    print("🚀 AERG AI Service started...")
    print(f"📡 Monitoring feed... reporting to {BACKEND_URL}")
    
    while True:
        # Simulate accident detection
        if random.random() < 0.3: # 30% chance per interval
            accident = simulate_accident()
            print(f"🚨 AI DETECTED: {accident['type']} at {accident['latitude']:.4f}, {accident['longitude']:.4f}")
            
            try:
                response = requests.post(BACKEND_URL, json=accident, timeout=5)
                if response.status_code == 201:
                    print("✅ Alert sent successfully!")
                else:
                    print(f"❌ Failed to send alert: {response.status_code}")
            except Exception as e:
                print(f"⚠️ Error connecting to backend: {e}")
                
        time.sleep(DETECTION_INTERVAL)

if __name__ == "__main__":
    main()
