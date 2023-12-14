from flask import Flask, request, jsonify
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from scipy.stats import mode
import pandas as pd
import numpy as np

app = Flask(_name_)

# Load your trained models and necessary data
def load_models():
    # Load your models and data here
    # For example:
    data = pd.read_csv("Training.csv").dropna(axis=1)
    encoder = LabelEncoder()
    data["prognosis"] = encoder.fit_transform(data["prognosis"])
    X, y = data.iloc[:, :-1], data.iloc[:, -1]

    # Build the ML models
    final_svm_model = SVC()
    final_nb_model = GaussianNB()
    final_rf_model = RandomForestClassifier(random_state=18)
    final_svm_model.fit(X, y)
    final_nb_model.fit(X, y)
    final_rf_model.fit(X, y)

    return X, final_svm_model, final_nb_model, final_rf_model, encoder

X, final_svm_model, final_nb_model, final_rf_model, encoder = load_models()

# Create symptom index and data dictionary
symptoms = X.columns.values
symptom_index = {symptom: index for index, symptom in enumerate(symptoms)}
data_dict = {
    "symptom_index": symptom_index,
    "predictions_classes": encoder.classes_
}

# API endpoint for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    symptoms = data.get('symptoms', [])

    # Call your predictDisease function
    result = predictDisease(symptoms)

    return jsonify(result)

def predictDisease(symptoms):
    # Call your existing prediction function here
    symptoms = symptoms.split(",")
    input_data = [0] * len(data_dict["symptom_index"])
    for symptom in symptoms:
        index = data_dict["symptom_index"].get(symptom)
        if index is not None:
            input_data[index] = 1

    input_data = np.array(input_data).reshape(1, -1)

    rf_prediction = encoder.classes_[final_rf_model.predict(input_data)[0]]
    nb_prediction = encoder.classes_[final_nb_model.predict(input_data)[0]]
    svm_prediction = encoder.classes_[final_svm_model.predict(input_data)[0]]

    final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])[0][0]

    predictions = {
        "rf_model_prediction": rf_prediction,
        "naive_bayes_prediction": nb_prediction,
        "svm_model_prediction": svm_prediction,
        "final_prediction": final_prediction
    }

    return predictions

if _name_ == '_main_':
    app.run(debug=True)