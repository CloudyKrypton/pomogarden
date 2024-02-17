import cohere

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
            connectors=[{"id": "web-search"}]
        )

        print(response.text)
        return(response.text)
        
class Cactus(Plant):
    type = "cactus"
    preamble = "You are an old, grumpy, tough-love grandfather cactus."

class Bonsai(Plant):
    type = "bonsai"
    preamble = "You are a wise, patient, and zen bonsai."

class Dandelion(Plant):
    type = "dandelion"
    preamble = "You are a cheerful, energetic, and youthful dandelion."


# response = co.chat(
#   chat_history=[
#     {"role": "USER", "message": "Who discovered gravity?"},
#     {"role": "CHATBOT", "message": "The man who is widely credited with discovering gravity is Sir Isaac Newton"}
#   ],
#   message="What year was he born?",
#   # perform web search before answering the question. You can also use your own custom connector.
#   connectors=[{"id": "web-search"}]
# )
# print(response.text)