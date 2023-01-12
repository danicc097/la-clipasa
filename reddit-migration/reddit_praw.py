import datetime as dt
import json
import os
import praw
from pmaw import PushshiftAPI
from dotenv import load_dotenv

load_dotenv()


reddit = praw.Reddit(client_id=os.getenv('CLIENT_ID'),
                     client_secret=os.getenv('CLIENT_SECRET'),
                     user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',)

api = PushshiftAPI(praw=reddit, num_workers=4)

# start_epoch=int(dt.datetime(2019, 10, 1).timestamp()) # wait until migrated
# start_epoch=int(dt.datetime(2020, 10, 1).timestamp()) # wait until migrated
start_epoch=int(dt.datetime(2022, 12, 1).timestamp()) # wait until migrated
end_epoch=int(dt.datetime.now().timestamp()) # wait until migrated
# start_epoch=int(dt.datetime(2022, 11, 4).timestamp())
# IMPORTANT: Submissions earlier than November 3rd still have not been loaded
# https://www.reddit.com/r/pushshift/comments/zuclhb/psa_pmaw_has_been_updated_to_handle_the_api/
# https://www.reddit.com/r/pushshift/comments/108b6ch/will_data_prior_to_03_nov_2022_be_added_back_to/
submissions_generator = api.search_submissions(since=start_epoch, until=end_epoch, subreddit='caliebre', limit=1000)

submissions = list(submissions_generator)
out = {
    "data": [
        {
            "id": s["id"],
            "title": f"[{str(s['author'])}] {s['title']}",
            "url": s["url"],
            "created_at_timestamp": s["created_utc"],
            # "url": s["url_overridden_by_dest"]
        } for s in submissions
        ],
}

# yq -P '.data = [.data[] | select(.url != "")]' submissions.json -i -o=json
with open("submissions.json", "w", encoding='utf8') as f:
    f.write(json.dumps(out, ensure_ascii=False))
