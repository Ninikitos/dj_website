import asyncio
import pytz
import requests
from decouple import config
from datetime import datetime
from TikTokLive import TikTokLiveClient

YOUTUBE_API_KEY = config('YOUTUBE_API_KEY')
CHANNEL_ID = 'UCcJL2ld6kxy_nuV1u7PVQ0g'


# CHANNEL_ID = 'UCpSU8Myul1TknsIzpsGxitg'


async def is_user_live(username):
    """
    Check if a TikTok user is live.
    """
    client = TikTokLiveClient(unique_id=username)
    try:
        # Check if the user is live
        live_status = await client.is_live()
        return live_status
    except Exception as e:
        print(f"Error while checking live status for {username}: {e}")
        return False


def is_today(day, timezone="America/New_York"):
    """
    Check if today matches the specified day in the given timezone.
    (0 = Monday, ..., 6 = Sunday)
    """
    # Set timezone
    tz = pytz.timezone(timezone)
    # Get current time in the specified timezone
    today = datetime.now(tz).weekday()
    return today == day


def check_live_status(username):
    """
    Synchronous wrapper for the async live status check.
    """

    wednesday_live = False
    sunday_live = False

    if is_today(2):
        wednesday_live = asyncio.run(is_user_live(username))

    if is_today(6):
        sunday_live = asyncio.run(is_user_live(username))

    return wednesday_live, sunday_live


def check_youtube_live():
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        'part': 'snippet',
        'channelId': CHANNEL_ID,
        'type': 'video',
        'eventType': 'live',
        'key': YOUTUBE_API_KEY
    }

    try:
        if is_today(2) or is_today(6):
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()

            if 'items' in data and len(data['items']) > 0:
                # Live stream is active
                video_id = data['items'][0]['id']['videoId']
                livestream_url = f"https://www.youtube.com/embed/{video_id}"
                return livestream_url

    except (requests.exceptions.HTTPError, requests.exceptions.ConnectionError) as http_conn_err:
        print(f"HTTP or connection error occurred: {http_conn_err}")
    except (requests.exceptions.Timeout, requests.exceptions.RequestException) as req_err:
        print(f"Request error occurred: {req_err}")
    except KeyError as key_err:
        print(f"Unexpected response format: Missing key {key_err}")
    except Exception as err:
        print(f"An unexpected error occurred: {err}")

    return None

