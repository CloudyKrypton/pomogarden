from flask import Flask, jsonify, render_template, request
import cohere
from plant import *
import random

app = Flask(__name__, static_url_path='/static')

# Initialize plants and message stacks
plant_classes = [Cactus, Bonsai, Dandelion]
plants_dict = {}
for plant_class in plant_classes:
    plant = plant_class()
    plants_dict[plant.type] = plant

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
    plant = plants_dict[plant_name]
    if len(plant.msg_stack["motivational"]) == 0:
        motivational_msg = get_motivate(plant.type)
    else:
        motivational_msg = plant.msg_stack["motivational"].pop()
    return jsonify({"msg": motivational_msg})

def get_motivate(plant_name):
    plant = plants_dict[plant_name]
    prompt = "I am procrastinating on studies. Encourage me to stay on task in a manner that fits your personality. Respond in a single sentence."
    motivational_msg = plant.plant_msg(prompt, "docs")
    return motivational_msg

@app.route('/plant_congratulate/<plant_name>', methods=['GET'])
def plant_congratulate(plant_name):
    plant = plants_dict[plant_name]
    if len(plant.msg_stack["congratulatory"]) == 0:
        congratulation_msg = get_congratulate(plant.type)
    else:
        congratulation_msg = plant.msg_stack["congratulatory"].pop()
    return jsonify({"msg": congratulation_msg})

def get_congratulate(plant_name):
    plant = plants_dict[plant_name]
    prompt = "I just completed a productive study session. Praise me for my hard work in a manner that fits your personality. Respond in a single sentence."
    congratulation_msg = plant.plant_msg(prompt, "docs")
    return congratulation_msg

@app.route('/plant_fact/<plant_name>', methods=['GET'])
def plant_fact(plant_name):
    plant = plants_dict[plant_name]
    if len(plant.msg_stack["fact"]) == 0:
        fact_msg = get_fact(plant.type)
    else:
        fact_msg = plant.msg_stack["fact"].pop()
    return jsonify({"msg": fact_msg})

def get_fact(plant_name):
    plant = plants_dict[plant_name]
    prompt1 = f"Tell me a fun fact about {plant_name} in a manner that fits your personality. Respond in a single sentence."
    prompt2 = "Give me a mental health tip in a manner that fits your personality. Respond in a single sentence."
    prompt3 = "Give me a study tip in a manner that fits your personality. Respond in a single sentence."
    prompt = random.choice([prompt1, prompt2, prompt3])
    fact_msg = plant.plant_msg(prompt, "web_search")
    return fact_msg

@app.route('/top_up', methods=['GET'])
def top_up():
    for plant in plants_dict.values():
        msg_dict = plant.msg_stack
        print(plant.type)
        for stack_name in msg_dict.keys():
            if stack_name == "motivational":
                top_up_helper(msg_dict[stack_name], 5, plant, get_motivate)
            elif stack_name == "congratulatory":
                top_up_helper(msg_dict[stack_name], 1, plant, get_congratulate)
            elif stack_name == "fact":
                top_up_helper(msg_dict[stack_name], 5, plant, get_fact)
            else:
                return "0"
    return "1"

def top_up_helper(stack, n, plant, func):
    while len(stack) < n:
        stack.append(func(plant.type))
        print(plant.type)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)
    top_up()


