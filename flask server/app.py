from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
from PIL import Image
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

def get_disaster_prompt():
    return "You are an expert in analyzing descriptions of natural disasters and predicting their severity based on the details provided.If the description is not that of a natural disaster just return Not a Natural Disaster"

def handle_gemini_call(description):
    system_message = get_disaster_prompt()
    
    messages = [
        ("system", system_message),
        ("human", f"Based on the following description, predict the severity of the disaster in one single word- severe disaster, moderate disaster, less severe disaster. Return from only these 3 severity and no other explaination is needed: {description}"),
    ]

    ai_msg = llm.invoke(messages)
    return ai_msg.content

app = Flask(__name__)

# Load the locally saved model
save_directory = "./moondream_model"
model = AutoModelForCausalLM.from_pretrained(save_directory, trust_remote_code=True)
tokenizer = AutoTokenizer.from_pretrained(save_directory)

# Routes
@app.route('/process-image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        print("Image not found in request")
        return jsonify({'error': 'No image provided'}), 400

    image = Image.open(request.files['image'])
    
    try:
        # Generate image description
        enc_image = model.encode_image(image)
        description = model.answer_question(
            enc_image,
            "Describe this image in detail.",
            tokenizer
        )

        # Call Gemini to predict severity
        severity = handle_gemini_call(description)

        return jsonify({
            'description': description,
            'severity': severity
        })
    except Exception as e:
        print(f"Error processing image: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/gemini-predict', methods=['POST'])
def gemini_predict():
    data = request.get_json()
    if not data or 'description' not in data:
        return jsonify({'error': 'No description provided'}), 400

    try:
        description = data['description']
        severity = handle_gemini_call(description)
        return jsonify({'severity': severity})
    except Exception as e:
        print(f"Error predicting severity: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


# =======================Save the model in the initial run locally=======================

# model_id = "vikhyatk/moondream2"
# revision = "2024-08-26"
# save_directory = "./moondream_model"

# model = AutoModelForCausalLM.from_pretrained(
#     model_id, trust_remote_code=True, revision=revision
# )
# tokenizer = AutoTokenizer.from_pretrained(model_id, revision=revision)

# # Save locally
# model.save_pretrained(save_directory)
# tokenizer.save_pretrained(save_directory)

# =====================================================================================


