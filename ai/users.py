import json

users = {}
users_videos ={}

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



def set_video_url(userId, url):
    users_videos[userId]=url

def get_video_url(userId):
    if userId not in users_videos:
        return json.dumps(None)
    ans = users_videos[userId]
    del[userId]    
    return json.dumps(ans)        