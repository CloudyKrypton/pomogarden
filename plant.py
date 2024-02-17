import cohere

class Plant:
    type: str
    preamble: str


    def plant_chat(co, plant, message):
        message = "How is your day? Respond in a brusque manner."

        response = co.chat(  
            model='command-nightly',  
            message=message
        )

        intro_paragraph = response.text
        print(intro_paragraph)

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