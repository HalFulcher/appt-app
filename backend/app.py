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
        inter = dict()
        inter.update(id=doc.id)
        inter.update(doc.to_dict())

        tmpList.append(inter)
    
    return jsonify(tmpList)

@app.route('/test/', methods=['GET'])
def find_interviewers():
    day=request.args.get('day')
    candArea=request.args.get('candArea')
    tmpList = []
    for doc in db.collection('interviewer').stream():
        inter = dict()
        inter.update(id=doc.id)
        inter.update(doc.to_dict())
        tmpList.append(inter)
    
    finalList = []
    for i in tmpList:
        if candArea in i['Area'] and i['Availability'][day] == True:
            finalList.append(i)

    if len(finalList) == 0:
        return 'No interviewer available'
    
    return jsonify(finalList)
    

@app.route('/update/', methods=['GET'])
def update_availability(candId, interId, day):

    interDoc = db.collection('interviewer').document(interId)
    interUpdate = {"Availability."+day : False}
    interDoc.update(interUpdate)

    candDoc = db.collection('candidate').document(candId)
    candUpdate = {'booked' : False}
    candDoc.update(candUpdate)


    return 'Success!'





if __name__ == '__main__':
    app.run(debug=True)

