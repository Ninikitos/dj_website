from django.shortcuts import render

from .models import *


def index(request):
    main_page_urls = MainPage.objects.first()
    music_samples = MusicSample.objects.all()
    youtube_content = YoutubeContent.objects.all()
    music_content = MusicContent.objects.all()
    products = Product.objects.all()

    context = {
        'main_page_urls': main_page_urls,
        'music_samples': music_samples,
        'youtube_content': youtube_content,
        'music_content': music_content,
        'products': products
    }

    return render(request, 'main/index.html', context)