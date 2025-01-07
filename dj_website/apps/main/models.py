from django.core.validators import URLValidator, MinValueValidator
from django.core.exceptions import ValidationError
from django.db import models


def social_media_link_validator(url: str) -> None:
    """Custom validator to ensure only specific social media URLs are allowed."""
    allowed_socials = ['youtube.com', 'tiktok.com', 'mixcloud.com']
    validator = URLValidator(schemes=['http', 'https'])
    try:
        # Validate the URL format first
        validator(url)
        # Ensure at least one allowed social media link is present
        if not any(social in url.lower() for social in allowed_socials):
            raise ValidationError("Only YouTube, TikTok, and MixCloud URLs are allowed.")
    except ValidationError:
        raise ValidationError("Enter a valid social media URL.")


class MainPage(models.Model):
    hero_watch_tiktok = models.URLField(
        blank=True,
        validators=[social_media_link_validator],
        help_text="Only YouTube, TikTok, and MixCloud links are allowed."
    )
    general_booking = models.URLField(blank=True)
    party_booking = models.URLField(blank=True)
    live_booking = models.URLField(blank=True)

    def __str__(self):
        return "Main Page Content"

    class Meta:
        verbose_name_plural = "Main Page"


class MusicSample(models.Model):
    title = models.CharField(blank=True, max_length=255)
    audio_file = models.FileField(blank='', upload_to="music_samples/")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Music Sample"
        verbose_name_plural = "Music Samples"


class YoutubeContent(models.Model):
    thumbnail = models.ImageField(blank='', upload_to="youtube_thumbnails/")
    link = models.URLField(
        blank=True,
        validators=[social_media_link_validator],
        help_text="Only YouTube, TikTok, and MixCloud links are allowed."
    )

    def __str__(self):
        return f"YouTube Content for {self.link}"

    class Meta:
        verbose_name = "YouTube Content"
        verbose_name_plural = "YouTube Content"


class MusicContent(models.Model):
    title = models.CharField(blank=True, max_length=35)
    photo = models.ImageField(blank=True, upload_to="music_links/")
    link = models.URLField(
        blank=True,
        validators=[social_media_link_validator],
        help_text="Only YouTube, TikTok, and MixCloud links are allowed."
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Music Link"
        verbose_name_plural = "Music Content"


class Product(models.Model):
    title = models.CharField(blank=True, max_length=255)
    price = models.DecimalField(
        blank=True,
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0.00)])
    discount_price = models.DecimalField(
        blank=True,
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0.00)],
        null=True,
        help_text="Note: Don't forget to update Stripe Price."
    )
    thumbnail_photo = models.ImageField(blank=True, upload_to="product_thumbnails/")
    link = models.URLField()
    is_sale = models.BooleanField(default=False, null=True)
    is_out_of_stack = models.BooleanField(default=False, null=True)


    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Product Item"
        verbose_name_plural = "Product Items"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name="product_images", on_delete=models.CASCADE)
    image = models.ImageField(blank=True, upload_to="product_images/")

    def __str__(self):
        return f"Images for {self.product.title}"

    class Meta:
        verbose_name = "Product Image"
        verbose_name_plural = "Product Images"
