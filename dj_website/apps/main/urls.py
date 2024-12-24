from django.contrib.sitemaps.views import sitemap
from django.urls import path
from . import views
from .sitemaps import StaticViewSitemap


sitemaps = {
    "static": StaticViewSitemap,
}

urlpatterns = [
    path('', views.index, name='index'),
    path("download-event/<str:event_type>/", views.calendar_event, name="calendar_event"),
    path(
        'sitemap.xml',
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
]