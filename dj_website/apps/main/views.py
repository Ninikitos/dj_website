import pytz
import asyncio

from django.shortcuts import render
from django.http import HttpResponse

from icalendar import Calendar, Event
from datetime import datetime, timedelta

from .models import *
from .utils import check_live_status, check_youtube_live


def index(request):
    main_page_urls = MainPage.objects.first()
    music_samples = MusicSample.objects.all()
    youtube_content = YoutubeContent.objects.all()
    music_content = MusicContent.objects.all()
    products = Product.objects.all()

    # Check live status for Wednesday and Sunday
    username = 'olsonparker'
    wednesday_live, sunday_live = check_live_status(username)
    youtube_live_url = check_youtube_live()
    youtube_live_url = ''

    context = {
        'main_page_urls': main_page_urls,
        'music_samples': music_samples,
        'youtube_content': youtube_content,
        'music_content': music_content,
        'products': products,
        'wednesday_live': wednesday_live,
        'sunday_live': sunday_live,
        'username': username,
        'youtube_live_url': youtube_live_url
    }

    return render(request, 'main/index.html', context)


def calendar_event(request, event_type):
    cal = Calendar()

    if event_type == "wine_down_wednesday":
        event_title = "Wine Down Wednesday"
        start_time = get_closest_wednesday()
        end_time = start_time + timedelta(hours=2)
        description = "Relax and enjoy Wine Down Wednesday with DJ DESTRUCT."
    elif event_type == "rnb_sundays":
        event_title = "R&B Sundays"
        start_time = get_closest_sunday()
        end_time = start_time + timedelta(hours=2)
        description = "Groove to smooth R&B beats this Sunday night."
    else:
        return HttpResponse("Invalid event type.", status=400)

    # Create an event
    event = Event()
    event.add("summary", event_title)
    event.add("dtstart", start_time)
    event.add("dtend", end_time)
    event.add("dtstamp", datetime.now(pytz.UTC))
    event.add("description", description)

    # Add the event to the calendar
    cal.add_component(event)

    # Serve the calendar file
    response = HttpResponse(content_type="text/calendar")
    response["Content-Disposition"] = f'attachment; filename="{event_title}.ics"'
    response.write(cal.to_ical())
    return response


def get_closest_wednesday():
    # Get the current date and time in EST
    est = pytz.timezone("US/Eastern")
    now = datetime.now(est)

    # Calculate days until the next Wednesday (weekday=2, 0=Monday)
    days_until_wednesday = (2 - now.weekday()) % 7
    # If today is Wednesday
    if days_until_wednesday == 0:
        # Get the next Wednesday, not today
        days_until_wednesday = 7

    # Calculate the next Wednesday
    next_wednesday = now + timedelta(days=days_until_wednesday)
    return next_wednesday.replace(hour=20, minute=0, second=0, microsecond=0)


def get_closest_sunday():
    # Get the current date and time in EST
    est = pytz.timezone("US/Eastern")
    now = datetime.now(est)

    # Calculate days until the next Sunday (weekday=6, 0=Monday)
    days_until_sunday = (6 - now.weekday()) % 7
    # If today is Sunday
    if days_until_sunday == 0:
        # Get the next Sunday, not today
        days_until_sunday = 7

    # Calculate the next Sunday
    next_sunday = now + timedelta(days=days_until_sunday)
    return next_sunday.replace(hour=21, minute=0, second=0, microsecond=0)

