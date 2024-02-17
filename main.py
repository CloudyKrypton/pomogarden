from flask import Flask
app = Flask(__name__)

@app.route('/')
def garden(name=None):
    name = 'Janey'
    if name is None:
        return 'Garden'
    else:
        return name + "'s Garden"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)