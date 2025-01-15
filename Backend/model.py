import json
import random

# Simulate a model prediction (you can replace this with actual ML code)
def predict_footfall():
    return random.randint(100, 500)  # Simulated prediction data

if __name__ == "__main__":
    # Return prediction as JSON to the Node.js server
    print(json.dumps({"footfall": predict_footfall()}))
