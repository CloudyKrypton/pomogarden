from flask import Flask, render_template, request
import cohere
from plant import *

app = Flask(__name__)
plants = ["cactus": Cactus(), "bonsai": Bonsai()]

@app.route('/')
@app.route('/garden')
def garden(name, plant):
    if name is None:
        return render_template('index.html', name='Janey')
    else:
        return render_template('index.html', name=name)
    
@app.route('/plant_talk/<plant_name>')
def plant_chat(plant_name):
    plant = plants[plant_name]
    co = cohere.Client('GbLhM3APFZEtc07r1T6HHIXj6H3JYVevrNudGhNc')
    message = "Encourage me to keep studying. Respond in a single sentence."

    response = co.chat(
        model='command-nightly',  
        message=message,
        temperature=0.6,
        preamble_override="You are an old, grumpy, tough-love grandfather cactus."
    )

    intro_paragraph = response.text
    print(intro_paragraph)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)



