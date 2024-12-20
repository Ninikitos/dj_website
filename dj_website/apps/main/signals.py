from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.db.models import FileField


@receiver(post_delete)
def delete_files_on_model_delete(sender, instance, **kwargs):
    """
    Automatically deletes files when a model
    instance with FileField or ImageField is deleted.
    """
    for field in instance._meta.fields:
        if isinstance(field, FileField):
            file = getattr(instance, field.name)
            if file and file.name:
                file.delete(save=False)