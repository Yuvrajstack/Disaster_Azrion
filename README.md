# Disaster_Azrion

---

 Disaster Classification Project

This project focuses on building a machine learning and deep learning pipeline to classify disaster-related data. It combines both text-based classification and image-based classification techniques to improve prediction accuracy and provide a robust solution.


---

 Overview

The goal of this project is to:

Classify disaster-related content using Natural Language Processing (NLP)

Analyze images using Deep Learning (CNN - VGG19)

Evaluate model performance using standard metrics

Provide a complete workflow from data preprocessing to model evaluation



---

 Technologies Used

Python 

Pandas & NumPy

Scikit-learn

TensorFlow / Keras

Matplotlib

PIL (Image Processing)



---

 Features

 Text Classification

TF-IDF Vectorization

Logistic Regression model

Evaluation metrics:

Accuracy

Precision

Recall

F1 Score

ROC-AUC



 Image Classification

Image preprocessing with ImageDataGenerator

Transfer learning using VGG19

Fine-tuning neural network layers

Callbacks for training optimization:

EarlyStopping

ReduceLROnPlateau

ModelCheckpoint

TensorBoard logging




---

 Project Structure
 
├── disaster-classification.ipynb   # Main notebook
├── data/                          # Dataset (text + images)
├── models/                        # Saved models
├── logs/                          # Training logs
└── README.md                      # Project documentation


---

 How to Run

1. Clone the repository:


git clone https://github.com/your-username/disaster-classification.git
cd disaster-classification

2. Install dependencies:



pip install -r requirements.txt

3. Run the notebook:



jupyter notebook


---

 Model Evaluation
 
The project evaluates models using:

Confusion Matrix

Classification Report

ROC Curve

AUC Score


These metrics help understand both accuracy and reliability of predictions.


---

 Code Cleanup (Comments Removed)

All unnecessary comments have been removed to make the code:

Cleaner

Easier to read

More professional for GitHub


Example cleaned import block:

import pandas as pd
import numpy as np
import os
import zipfile
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score, roc_curve, auc
import matplotlib.pyplot as plt
from PIL import Image, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import VGG19
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import ModelCheckpoint, TerminateOnNaN, LearningRateScheduler, CSVLogger, TensorBoard, ReduceLROnPlateau, EarlyStopping


---
 Future Improvements

Add more advanced NLP models (BERT, Transformers)

Improve dataset quality and size

Deploy as a web application (Flask / Streamlit)

Real-time disaster detection system



---

 Contributing

Contributions are welcome! Feel free to:

Fork the repo

Create a new branch

Submit a pull request



---

 License

This project is open-source and available under the MIT License.


---

If you want, I can also:

Convert your notebook into a clean .py script

Create a requirements.txt automatically

Or design a GitHub profile-style README with badges and visuals
