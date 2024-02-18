from flask import Flask, jsonify, render_template, request
import cohere
from plant import *

app = Flask(__name__)
plants_dict = {"cactus": Cactus, "bonsai": Bonsai, "dandelion": Dandelion}
plants_arr = ["cactus", "bonsai", "dandelion"]

@app.route('/')
@app.route('/garden')
def garden(plants=plants_arr):
    return render_template('rename_this.html', name='Janey', plants=plants)

# @app.route('/plant_seed', methods=['POST'])
# def plant_seed():
#     plant_name = request.form['plant_name']
#     plant = plants_dict[plant_name]()
#     plants.append(plant)

@app.route('/plant_motivate/<plant_index>', methods=['GET'])
def plant_motivate(plant_name):
    plant = plants_dict[plant_name]()
    prompt = "Encourage me to keep studying. Respond in a single sentence."
    motivational_msg = plant.plant_chat(prompt)
    return jsonify({"msg": motivational_msg})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)



