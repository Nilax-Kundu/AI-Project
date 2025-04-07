from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import traceback
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
load_dotenv()
GENAI_API_KEY = os.getenv("GENAI_API_KEY")

# Configure Gemini API
if GENAI_API_KEY:
    genai.configure(api_key=GENAI_API_KEY)
else:
    raise ValueError("GENAI_API_KEY is missing!")

# Request schema
class Message(BaseModel):
    user_input: str

# Route to interact with Gemini
@app.post("/chat")
async def chat_with_bot(message: Message):
    try:
        system_prompt = """
        You are a professional fitness and wellness coach. 
        You ONLY answer queries related to fitness, exercise, nutrition, mental health, and overall well-being.
        If the user asks anything unrelated to fitness and wellness, respond with: 
        'I only respond to fitness and wellness queries!'
        """

        chat_context = system_prompt + f"\nUser: {message.user_input}"

        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(chat_context)

        bot_reply = response.text if hasattr(response, "text") else "Error: No response from AI model"

        return {"response": bot_reply}
    
    except Exception as e:
        print(f"🔥 ERROR TRACE:\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))
