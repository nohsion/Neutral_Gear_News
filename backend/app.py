from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS

client = MongoClient('localhost', 27017)
db = client.dbnews

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app, resources={r"/news/*": {"origins": "*"}})


@app.route('/')
def main():
    return 'hello'


@app.route('/news/headlines', methods=['GET'])
def show_headlines():
    news = list(db.headline.find({}, {'_id': 0}))
    print(news)
    return jsonify({'result': 'success'}, {'news': news})


if __name__ == '__main__':
    app.run(port=7000, debug=True)
