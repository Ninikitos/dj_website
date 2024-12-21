from django.contrib import admin
from .models import *


@admin.register(MainPage)
class MainPageAdmin(admin.ModelAdmin):
    list_display = ('hero_watch_tiktok', 'general_booking', 'party_booking', 'live_booking')


@admin.register(MusicSample)
class MusicSampleAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(MusicContent)
class MusicLinkAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'link',)


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product',)
    list_filter = ('product',)


@admin.register(YoutubeContent)
class YoutubeLinkAdmin(admin.ModelAdmin):
    list_display = ('link',)




