from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError


try:
    india_tz = ZoneInfo("Asia/Kolkata")
except ZoneInfoNotFoundError:
    india_tz = timezone(timedelta(hours=5, minutes=30))


def indian_time():

    return datetime.now(india_tz)