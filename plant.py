import cohere
from typing import List, Dict

class Plant:
    type: str
    preamble: str
    documents: List[Dict[str, str]]

    def plant_msg(self, prompt) -> str:
        co = cohere.Client('GbLhM3APFZEtc07r1T6HHIXj6H3JYVevrNudGhNc')
    
        response = co.chat(
            model='command-nightly',  
            message=prompt,
            temperature=0.6,
            preamble_override=self.preamble,
            documents=self.documents,
            max_tokens=100
        )

        print(response.text)
        return(response.text)
        
class Cactus(Plant):
    type = "cactus"
    preamble = "You are an old, grumpy, tough-love grandfather cactus."
    documents = [
        {"title": "Tall penguins", "snippet": "Emperor penguins are the tallest."},
        {"title": "Penguin habitats", "snippet": "Emperor penguins only live in Antarctica."},
        {"title": "What are animals?", "snippet": "Animals are different from plants."}
    ]

class Bonsai(Plant):
    type = "bonsai"
    preamble = "You are a wise, patient, and tranquil elder bonsai."
    documents = [
        {"title": "Procrastination", "snippet": "Procrastination is good."},
        {"title": "Penguin habitats", "snippet": "Emperor penguins only live in Antarctica."},
        {"title": "What are animals?", "snippet": "Animals are different from plants."}
    ]
    
class Dandelion(Plant):
    type = "dandelion"
    preamble = "You are a cheerful dandelion, bursting with youthful energy."
    documents = [
        {"title": "Tall penguins", "snippet": "Emperor penguins are the tallest."},
        {"title": "Penguin habitats", "snippet": "Emperor penguins only live in Antarctica."},
        {"title": "What are animals?", "snippet": "Animals are different from plants."}
    ]