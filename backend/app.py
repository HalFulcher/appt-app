from flask import Flask, jsonify, request
from firebase_admin import credentials, firestore, initialize_app

# Initialize Flask App
app = Flask(__name__)

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()


@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    return jsonify({'name':'Jimit',
                    'area':'Software Engineer'})


@app.route('/candidates/', methods=['GET'])
def get_candidates():
    "Get all candidates"
    
    tmpList =[]
    for doc in db.collection('candidate').stream():
        cand = dict()
        cand.update(id=doc.id)
        cand.update(doc.to_dict())

        tmpList.append(cand)
    
    return jsonify(tmpList)

@app.route('/interviewers/', methods=['GET'])
def get_interviewers():
    "Get all interviewers"
    
    tmpList =[]
    for doc in db.collection('interviewer').stream():
        cand = dict()
        cand.update(id=doc.id)
        cand.update(doc.to_dict())

        tmpList.append(cand)
    
    return jsonify(tmpList)







if __name__ == '__main__':
    app.run(debug=True)

