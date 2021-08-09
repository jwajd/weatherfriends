from flask import Flask, request, after_this_request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
import pymongo
import datetime
import pprint
from bson.objectid import ObjectId
from bson.json_util import dumps
from bson.json_util import loads
from flask_cors import CORS, cross_origin
import secrets
import config

app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#https://pymongo.readthedocs.io/en/stable/tutorial.html

client = pymongo.MongoClient(config.mongo_key)

db = client['weatherfriends']

users = db['data']

def add_user(passcode, friends_list):
        document = {
            'Name': '',
            'Location': '',
            'Passcode': passcode,
            'Friends List': friends_list,
            'Date Added': datetime.datetime.now()
        }
        return users.insert_one(document).inserted_id #returns the ID




def get_user(client): 
    cursor = users.find({'_id': ObjectId(client)})
    return cursor;

def get_friend(code): 
    return users.find_one({'Passcode': code})

@app.route('/create-user')
def query_create():
    id = add_user(secrets.token_urlsafe(8), {})
    return str(id), 201;


@app.route('/update-user')
def query_update():
    id = request.args.get('id')
    name = request.args.get('name')
    location = request.args.get('location')
    myquery = {"_id": ObjectId(id)}
    newvalues = {"$set": {'Name': name, 'Location': location}}
    users.update_one(myquery, newvalues)
    return id, 201;

@app.route('/get-user')
def query_get():
    tag = request.args.get('id')
    list_cur = list(get_user(tag))
    json_data = dumps(list_cur, indent = 2)
    return json_data, 200;

@app.route('/get')
def qget():
    tag = request.args.get('id')
    return {tag: 5};


if __name__ == "__main__":
	app.run(debug=True)



#add_friend(ObjectId('60e18e52a7b279a45dab055b'), 85)
#remove_friend(ObjectId('60e18e52a7b279a45dab055b'), 85)
# def find_user(client): #used to find user: returns None if doesn't exist
#     return users.find_one({'_id': client})
    
# def add_friend(client, friend):
#     #probably will need to convert friend to objectid
#     users.update_one({'_id': client}, {'$addToSet': {'Friends List': friend}})

# def remove_friend(client, friend):
#     users.update_one({'_id': client}, {'$pull': {'Friends List': friend}})

#whenever using ID from friends list, remember to convert to ObjectId, otherwise query will fail

