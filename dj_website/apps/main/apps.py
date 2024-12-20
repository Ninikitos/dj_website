from django.apps import AppConfig


class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dj_website.apps.main'


    def ready(self):
        import dj_website.apps.main.signals
