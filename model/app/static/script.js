const webcam = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const startBtn = document.getElementById('start-btn');
const captureBtn = document.getElementById('capture-btn');
const fileUpload = document.getElementById('file-upload');
const detectedClass = document.getElementById('detected-class');
const confidencePct = document.getElementById('confidence-pct');
const meterFill = document.getElementById('meter-fill');
const cameraStatus = document.getElementById('camera-status');
const resultPlaceholder = document.getElementById('result-placeholder');
const predictionResult = document.getElementById('prediction-result');
const imagePreview = document.getElementById('image-preview');
const aiViewport = document.getElementById('ai-viewport');

const vCorrectBtn = document.getElementById('v-correct');
const vWrongBtn = document.getElementById('v-wrong');

let stream = null;
let currentPrediction = null;


async function initCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        webcam.srcObject = stream;
        cameraStatus.textContent = "Camera Live";
        cameraStatus.style.background = "#50fa7b";
        cameraStatus.style.color = "#000";
        startBtn.textContent = "Stop Camera";
        captureBtn.disabled = false;
        document.querySelector('.scanner-line').style.display = 'block';
    } catch (err) {
        console.error("Camera access denied:", err);
        alert("Could not access camera. Please check permissions.");
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        webcam.srcObject = null;
        cameraStatus.textContent = "Camera Offline";
        cameraStatus.style.background = "rgba(0, 0, 0, 0.6)";
        cameraStatus.style.color = "white";
        startBtn.textContent = "Start Camera";
        captureBtn.disabled = true;
        document.querySelector('.scanner-line').style.display = 'none';
        stream = null;
    }
}

startBtn.addEventListener('click', () => {
    if (stream) {
        stopCamera();
    } else {
        initCamera();
    }
});


captureBtn.addEventListener('click', async () => {
    const context = canvas.getContext('2d');
    canvas.width = webcam.videoWidth;
    canvas.height = webcam.videoHeight;
    context.drawImage(webcam, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
    await sendForPrediction(blob);


    updatePreviews(canvas);
});

function updatePreviews(sourceCanvas) {
    imagePreview.innerHTML = "";
    const imgFull = document.createElement('img');
    imgFull.src = sourceCanvas.toDataURL('image/jpeg');
    imagePreview.appendChild(imgFull);


    aiViewport.innerHTML = "";
    const squareCanvas = document.createElement('canvas');
    const size = Math.min(sourceCanvas.width, sourceCanvas.height);
    squareCanvas.width = 150;
    squareCanvas.height = 150;
    const ctx = squareCanvas.getContext('2d');

    const sx = (sourceCanvas.width - size) / 2;
    const sy = (sourceCanvas.height - size) / 2;

    ctx.drawImage(sourceCanvas, sx, sy, size, size, 0, 0, 150, 150);

    const imgCrop = document.createElement('img');
    imgCrop.src = squareCanvas.toDataURL('image/jpeg');
    aiViewport.appendChild(imgCrop);
}

fileUpload.addEventListener('change', async (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const img = new Image();
        img.onload = () => {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            tempCanvas.getContext('2d').drawImage(img, 0, 0);
            updatePreviews(tempCanvas);
        };
        img.src = URL.createObjectURL(file);

        await sendForPrediction(file);
    }
});

async function sendForPrediction(blob) {
    const formData = new FormData();
    formData.append('file', blob, 'capture.jpg');

    resultPlaceholder.classList.remove('hidden');
    predictionResult.classList.add('hidden');

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("Prediction failed");

        const data = await response.json();
        currentPrediction = data;
        displayResults(data);
    } catch (err) {
        console.error(err);
        alert("Error connecting to server.");
    }
}

function displayResults(data) {
    resultPlaceholder.classList.add('hidden');
    predictionResult.classList.remove('hidden');

    detectedClass.textContent = data.class_name;
    confidencePct.textContent = `${data.confidence}%`;
    meterFill.style.width = `${data.confidence}%`;


    const mapping = {
        'Fire Disaster': 'fill-FireDisaster',
        'Water Disaster': 'fill-WaterDisaster',
        'Damaged Infrastructure': 'fill-DamagedInfrastructure',
        'Land Disaster': 'fill-LandDisaster',
        'Human Damage': 'fill-HumanDamage',
        'Non Damage': 'fill-NonDamage'
    };

    for (const [key, id] of Object.entries(mapping)) {
        const el = document.getElementById(id);
        if (el) {
            const score = data.all_predictions[key] || 0;
            el.style.width = `${score}%`;
        }
    }
}


async function submitFeedback(isCorrect) {
    if (!currentPrediction) return;

    const feedbackData = {
        prediction: currentPrediction,
        is_correct: isCorrect,
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedbackData)
        });

        if (response.ok) {
            alert("Thank you for your feedback! It helps improve the system.");

            const vBox = document.querySelector('.verification-box');
            vBox.style.opacity = '0.5';
            vBox.style.pointerEvents = 'none';
        }
    } catch (err) {
        console.error("Feedback failed:", err);
    }
}

vCorrectBtn.addEventListener('click', () => submitFeedback(true));
vWrongBtn.addEventListener('click', () => submitFeedback(false));
