import json
import uuid
categorylist={}
with open('questiondata.txt', encoding='utf-8') as json_file:
    data=json.load(json_file)
    for q in data:
        q['category']=q['category'][:(len(q['category'])-8)] # remove _cut.txt
        if(q['category']) not in categorylist.keys():
            uid=uuid.uuid4().hex
            c=q['category']
            categorylist[c]=uid
            q['category']={'name':c,'_id':uid}
            
        else:
            c=q['category']
            q['category']={'name':c,'_id':categorylist[c]}
            
with open('questiondata.json', 'w') as outfile:
    json.dump(data, outfile)
