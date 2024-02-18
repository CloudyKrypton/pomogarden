import cohere
from documents import Documents, Chatbot

class Plant:
    type: str
    preamble: str

    def plant_chat(self, prompt) -> str:
        co = cohere.Client('GbLhM3APFZEtc07r1T6HHIXj6H3JYVevrNudGhNc')
    
        response = co.chat(
            model='command-nightly',  
            message=prompt,
            temperature=0.6,
            preamble_override=self.preamble,
            connectors=[{"id": "web-search"}],
            max_tokens=50
        )

        print(response.text)
        return(response.text)
        
class Cactus(Plant):
    type = "cactus"
    preamble = "You are an old, grumpy, tough-love grandfather cactus."

class Bonsai(Plant):
    type = "bonsai"
    preamble = "You are a wise, patient, and tranquil elder bonsai."

class Dandelion(Plant):
    type = "dandelion"
    preamble = "You are a cheerful dandelion, bursting with youthful energy."