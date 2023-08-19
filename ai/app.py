from flask import Flask, render_template, Response,jsonify,abort
import json
import cv2
import numpy as np
from tensorflow.keras.models import model_from_json  
from tensorflow.keras.preprocessing import image  
import uuid
from users import getUserEmotions,increaseUserEmotion ,set_video_url,get_video_url  
from flask_cors import CORS


app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

#######################    Databse    ########################
from pymongo import MongoClient
app.config['MONGO_URI'] = 'mongodb://localhost:27017/ai_db'
mongo = MongoClient(app.config['MONGO_URI'])
db = mongo.get_database()

from pymongo.collection import Collection

class User(Collection):
    def __init__(self):
        super().__init__(db, 'users')

class Emotion:
    def __init__(self, emotion):
        self.emotion = emotion


#######################    Databse       ######################

#load model  
model = model_from_json(open("fer.json", "r").read())  
#load weights  
model.load_weights('fer.h5')  
face_haar_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')  



camera = cv2.VideoCapture(0)
flag = True
time = 0    

def gen_frames(userId):  # generate frame by frame from camera
    global flag
    global time

    if(not flag):
        print("false----flag")
        flag = True
        time = 0
    user_uuid = uuid.uuid4().hex
    print("uuid: 0,",user_uuid)
    while camera.isOpened():
        # Capture frame by frame
        success, frame = camera.read()
        if not success:
            break
        else:
            gray_img= cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  
        
            faces_detected = face_haar_cascade.detectMultiScale(gray_img, 1.32, 5)  
            
        
            for (x,y,w,h) in faces_detected:
                print('WORKING')
                cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),thickness=5)  
                roi_gray=gray_img[y:y+w,x:x+h]          #cropping region of interest i.e. face area from  image  
                roi_gray=cv2.resize(roi_gray,(48,48))  
                img_pixels = image.img_to_array(roi_gray)  
                img_pixels = np.expand_dims(img_pixels, axis = 0)  
                img_pixels /= 255  
        
                print(img_pixels.shape)
                
                predictions = model.predict(img_pixels)  
        
                #find max indexed array  
                
                max_index = np.argmax(predictions[0])  
        
                emotions = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']  
                #          [disgust,  angry,     fear,   sad,    natural,   happy,     surp]
                predicted_emotion = emotions[max_index]  
                
                #increase user emotions
                increaseUserEmotion(
                    userId=userId, time=time, emotion=str(max_index))
                time+=1
                print(predicted_emotion)
                cv2.putText(frame, predicted_emotion, (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 2)  
        
            resized_img = cv2.resize(frame, (1000, 700))  
            
            ret, buffer = cv2.imencode('.jpg', frame)

            # Save frame as video
            # if video_writer is None:
            #     # Create video writer object
            #     fps = 30  # Frames per second
            #     width, height = frame.shape[1], frame.shape[0]
            #     video_path = "./videos/"+user_uuid+".mp4"
            #     video_writer = cv2.VideoWriter(video_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))
            #     set_video_url(userId=userId,url=video_path)
            # Write frame to video file
            # video_writer.write(frame)
            
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result


@app.route('/video_feed/<userId>')
def video_feed(userId):
    print("feed userid: " + userId)
    #camera = cv2.VideoCapture(0)

    #Video streaming route. Put this in the src attribute of an img tag
    return Response(gen_frames(userId), mimetype='multipart/x-mixed-replace; boundary=frame')




@app.route('/<userId>')
def index(userId):
    global camera
    global flag 
    #flag = True
    camera = cv2.VideoCapture(0)
    print("userId : ",userId)
    return render_template('index.html',userId=userId)

@app.route('/get_predected_emotion/<userId>')
def get_predected_emotion(userId):
    #set time = 0
    global camera
    global time
    global flag
    time =  0
    user_emotions = getUserEmotions(userId=userId)
    # video_url = get_video_url(userId=userId)
    #print("user emotions: ",user_emotions)
    user_data = {
        'id': userId,
        'emotions': user_emotions,
        "map": {
            '0': 'angry',
            '1': 'disgust',
            '2': 'fear',
            '3': "happy",
            '4': 'sad',
            '5': 'surprise',
            '6': 'neutral'
        }
    }
    user_collection = User()

    # Update the user data if it exists, otherwise insert it as a new document
    user_collection.update_one({'id': user_data['id']}, {'$set': user_data}, upsert=True)
    #close the camera
    camera.release()
    flag = False
    return jsonify(user_data)

@app.route('/get_user_latest_data/<userId>', methods=['GET'])
def get_user_latest_data(userId):
    user_collection = User()
    user = user_collection.find_one({'id': userId})
    if(user is None):
        abort(404, "user not found")
    user = json.dumps(user,default=str)
    return Response(user)


if __name__ == '__main__':
    app.run(debug=True,port=5051,host='0.0.0.0')
