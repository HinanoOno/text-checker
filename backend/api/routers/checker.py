from fastapi import APIRouter
import api.schemas.checker as schemas
import api.utils.checker as utils

router = APIRouter()

@router.post("/check", response_model=schemas.TextOutput)
def correct(input: schemas.TextInput):
    checked = utils.check_text(input.text)
    return schemas.TextOutput(original=input.text, checked=checked)
