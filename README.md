#  DisasterGuard AI - Real-time Disaster Classification

DisasterGuard AI is a premium, deep-learning powered web application designed for real-time disaster monitoring and classification. Leveraging a Convolutional Neural Network (CNN), the system identifies various types of disasters from both uploaded images and live webcam streams with high precision.

---

##  Key Features

- **Dual Detection Modes**: Support for high-resolution image uploads and real-time live webcam monitoring.
- **Intelligent Classification**: Accurately classifies disasters into 6 distinct categories:
  - Fire Disaster
  - Water Disaster
  - Damaged Infrastructure
  - Land Disaster
  - Human Damage
  - Non-Damage (Safe)
- **Premium UI/UX**: State-of-the-art glassmorphic dashboard featuring:
  - Dynamic HSL color palettes.
  - Smooth micro-animations and transitions.
  - Real-time confidence meters and detailed detection analysis.
- **Verification System**: Integrated "Human-in-the-Loop" verification allowing users to confirm or report prediction accuracy.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile browsers.

---

## Technology Stack

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Deep Learning**: [TensorFlow](https://www.tensorflow.org/) & [Keras](https://keras.io/)
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 (Glassmorphism)
- **Image Processing**: [Pillow](https://python-pillow.org/) & [NumPy](https://numpy.org/)
- **Server**: [Uvicorn](https://www.uvicorn.org/)

---

## Project Structure

```text
├── app/
│   ├── main.py              # FastAPI Backend & Model Inference
│   └── static/
│       ├── index.html       # Dashboard Structure
│       ├── style.css        # Premium Design System
│       └── script.js        # Webcam & API Integration
├── model/
│   └── image_classification_model.h5  # Pre-trained CNN Model
└── README.md
```

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/disasterguard-ai.git
   cd disasterguard-ai
   ```

2. **Install dependencies**:
   ```bash
   pip install fastapi uvicorn tensorflow pillow numpy
   ```

3. **Configure Model Path**:
   Ensure your `.h5` model file is located in the correct directory requested in `app/main.py`.

---

##  Usage

1. **Start the server**:
   ```bash
   python app/main.py
   ```

2. **Access the Dashboard**:
   Open your browser and navigate to `http://localhost:8000`.

3. **Classify**:
   - Use the **"Upload Image"** button to analyze existing photos.
   - Click **"Start Camera"** and **"Capture & Detect"** for live monitoring.

---

## Model Details

The core of DisasterGuard AI is a CNN model trained on a comprehensive disaster dataset. 

- **Input Shape**: 150x150 pixels (RGB)
- **Normalization**: Pixel values rescaled to [0, 1]
- **Architecture**: Sequential CNN with multiple Convolutional and Pooling layers.
- **Output**: Softmax activation providing confidence scores across 6 disaster classes.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

*Developed with  for Advanced Safety & Monitoring.*
