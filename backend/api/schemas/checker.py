from pydantic import BaseModel

class TextInput(BaseModel):
    text: str

class TextOutput(BaseModel):
    original: str
    checked: str
