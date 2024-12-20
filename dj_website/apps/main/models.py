from django.db import models


class MainPage(models.Model):
    hero_watch_tiktok = models.URLField()
    general_booking = models.TextField()
    party_booking = models.TextField()
    live_booking = models.TextField()

    def __str__(self):
        return "Main Page Content"

    class Meta:
        verbose_name = "Main Page"
        verbose_name_plural = "Main Pages"


class MusicSample(models.Model):
    title = models.CharField(max_length=255)
    audio_file = models.FileField(upload_to="music_samples/")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Music Sample"
        verbose_name_plural = "Music Samples"


class YoutubeLink(models.Model):
    thumbnail = models.ImageField(upload_to="youtube_thumbnails/")
    link = models.URLField()

    def __str__(self):
        return f"YouTube Link to {self.link}"

    class Meta:
        verbose_name = "YouTube Link"
        verbose_name_plural = "YouTube Links"


class MusicLink(models.Model):
    title = models.CharField(max_length=255)
    photo = models.ImageField(upload_to="music_links/")
    link = models.URLField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Music Link"
        verbose_name_plural = "Music Links"


class Shop(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    thumbnail_photo = models.ImageField(upload_to="shop_thumbnails/")
    preview_photo = models.ImageField(upload_to="shop_previews/")
    link = models.URLField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Shop Item"
        verbose_name_plural = "Shop Items"


class ProductImage(models.Model):
    shop = models.ForeignKey(Shop, related_name="product_images", on_delete=models.CASCADE)
    image_1 = models.ImageField(upload_to="product_images/", blank=True, null=True)
    image_2 = models.ImageField(upload_to="product_images/", blank=True, null=True)
    image_3 = models.ImageField(upload_to="product_images/", blank=True, null=True)
    image_4 = models.ImageField(upload_to="product_images/", blank=True, null=True)
    image_5 = models.ImageField(upload_to="product_images/", blank=True, null=True)

    def __str__(self):
        return f"Images for {self.shop.title}"

    class Meta:
        verbose_name = "Product Image"
        verbose_name_plural = "Product Images"
