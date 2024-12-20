from django.contrib.sitemaps.views import sitemap
from django.urls import path
from . import views
from .sitemaps import StaticViewSitemap


sitemaps = {
    "static": StaticViewSitemap,
}

urlpatterns = [
    path('', views.index, name='index'),
    path(
        'sitemap.xml',
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
]