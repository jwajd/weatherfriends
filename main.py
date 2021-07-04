from flask import Flask, request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
import pymongo
import datetime
import pprint
from bson.objectid import ObjectId
from bson.json_util import dumps
from bson.json_util import loads
import secrets
import config

app = Flask(__name__)
api = Api(app)

#https://pymongo.readthedocs.io/en/stable/tutorial.html

client = pymongo.MongoClient(config.mongo_key)

db = client['mydb']

users = db['users']

def add_user(name, location, passcode, friends_list):
        document = {
            'Name': name,
            'Location': location,
            'Passcode': passcode,
            'Friends List': friends_list,
            'Date Added': datetime.datetime.now()
        }
        return users.insert_one(document).inserted_id #returns the ID

def find_user(client): #used to find user: returns None if doesn't exist
    return users.find_one({'_id': client})
    
def add_friend(client, friend):
    #probably will need to convert friend to objectid
    users.update_one({'_id': client}, {'$addToSet': {'Friends List': friend}})

def remove_friend(client, friend):
    users.update_one({'_id': client}, {'$pull': {'Friends List': friend}})


def get_user(client): 
    cursor = users.find({'_id': ObjectId(client)})
    return loads(dumps(cursor))

def get_friend(code): 
    return users.find_one({'Passcode': code})

@app.route('/create-user')
def query_create():
    name = request.args.get('name')
    location = request.args.get('location')
    id = add_user(name, location, secrets.token_urlsafe(8), {})
    return "", 201;

@app.route('/get-user')
def query_get():
    tag = request.args.get('id')
    return get_user(tag), 200;

if __name__ == "__main__":
	app.run(debug=True)
#add_friend(ObjectId('60e18e52a7b279a45dab055b'), 85)
#remove_friend(ObjectId('60e18e52a7b279a45dab055b'), 85)

#whenever using ID from friends list, remember to convert to ObjectId, otherwise query will fail

