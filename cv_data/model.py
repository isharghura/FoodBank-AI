import pandas as pd

import torch
from torchvision import models, transforms
import numpy as np

df = pd.read_pickle("cv_data/images.pkl")

print(df.head())

model = models.resnet50(pretrained=True)
model.eval()

preprocess = transforms.Compose(
    [
        transforms.ToPILImage(),
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ]
)


def preprocess_image_from_row(row):
    pixel_values = row[1:].values.reshape((224, 224, 3)).astype("uint8")
    img_tensor = preprocess(pixel_values)
    img_tensor = img_tensor.unsqueeze(0)
    return img_tensor


row = df.iloc[0]
label = row["label"]
img_tensor = preprocess_image_from_row(row)

with torch.no_grad():
    output = model(img_tensor)

_, predicted_class = output.max(1)
print(f"Label: {label}, Predicted class: {predicted_class.item()}")
