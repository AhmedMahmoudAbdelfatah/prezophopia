import json


users = {}

def increaseUserEmotion(userId, time, emotion):
    if userId not in users:
        users[userId] = []
    users[userId].append((time, emotion))

def getUserEmotions(userId):
    if userId not in users:
        return json.dumps(None)

    emotions = users[userId]
    del users[userId]

    return json.dumps(emotions)

increaseUserEmotion(123,1,"angry")
increaseUserEmotion(123,2,"happy")
increaseUserEmotion(123,3,"sad")

print(getUserEmotions(123))
print(getUserEmotions(321))