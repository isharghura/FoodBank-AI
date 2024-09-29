import pandas as pd
import json
import torch
import torch.nn as nn
from torchvision import models, transforms
from torch.utils.data import DataLoader, Dataset
import numpy as np
from torchvision.models import ResNet50_Weights
from PIL import Image

with open("num_classes.json", "r") as f:
    data = json.load(f)
    num_classes = data["num_classes"]

with open("dataset_metadata.json", "r") as f:
    dataset_metadata = json.load(f)
    labels = dataset_metadata["labels"]
    label_to_index = dataset_metadata["label_to_index"]

with open("device.json", "r") as f:
    device_info = json.load(f)
    device = torch.device(device_info["device"])

model = models.resnet50(weights=None)
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, num_classes)
model.load_state_dict(torch.load("fine_tuned_model.pth"))
model.eval()


def preprocess_image(image_path):
    image = Image.open(image_path).convert("RGB")
    transform = transforms.Compose(
        [
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )
    image = transform(image)
    image = image.unsqueeze(0)
    return image


image_path = "../apple2.webp"
image = preprocess_image(image_path)
image = image.to(device)

with torch.no_grad():
    outputs = model(image)
    top5_probs, top5_indices = torch.topk(outputs, k=5)

top5_labels = [labels[i.item()] for i in top5_indices[0]]

for i, label in enumerate(top5_labels):
    print(
        f"Top {i + 1} prediction: {label} with probability: {top5_probs[0][i].item():.4f}"
    )
