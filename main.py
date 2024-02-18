from flask import Flask, jsonify, render_template, request
import cohere
from plant import *

app = Flask(__name__, static_url_path='/static')
plants_dict = {"cactus": Cactus, "bonsai": Bonsai, "dandelion": Dandelion}
# plants_arr = ["cactus", "bonsai", "dandelion"]

@app.route('/')
@app.route('/garden')
def garden():
    return render_template('index.html')

# @app.route('/plant_seed', methods=['POST'])
# def plant_seed():
#     plant_name = request.form['plant_name']
#     plant = plants_dict[plant_name]()
#     plants.append(plant)

@app.route('/plant_motivate/<plant_name>', methods=['GET'])
def plant_motivate(plant_name):
    plant = plants_dict[plant_name]()
    prompt = "I am procrastinating on studies. Encourage me to continue studying. Respond in a single sentence."
    motivational_msg = plant.plant_chat(prompt)
    return jsonify({"msg": motivational_msg})

@app.route('/plant_congratulate/<plant_name>', methods=['GET'])
def plant_congratulate(plant_name):
    plant = plants_dict[plant_name]()
    prompt = "I just completed a productive study session. Praise me for my hard work. Respond in a single sentence."
    congratulation_msg = plant.plant_chat(prompt)
    return jsonify({"msg": congratulation_msg})

@app.route('/plant_fact/<plant_name>', methods=['GET'])
def plant_fact(plant_name):
    plant = plants_dict[plant_name]()
    prompt = f"Tell me a fun fact about {plant_name}."
    fact_msg = plant.plant_chat(prompt)
    return jsonify({"msg": fact_msg})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)



