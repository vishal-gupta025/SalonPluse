from datetime import datetime
from zoneinfo import ZoneInfo


india_tz = ZoneInfo("Asia/Kolkata")


def indian_time():

    return datetime.now(india_tz)