from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import TravelOffer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class TravelOfferAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.travel_offer = TravelOffer.objects.create(
            title='Sample Offer',
            description='Sample Description',
            price=100.0,
            date_departure='2024-06-01T10:00:00Z',
            place_departure='Warsaw',
            place_arrival='Krakow',
            number_of_seats=3,
            phone_number='123456789',
            user=self.user
        )
        self.client.login(username='testuser', password='testpass')
        self.access_token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)

    def test_get_offer(self):
        url = reverse('get_offer', args=[self.travel_offer.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['place_departure'], 'Warsaw')

    def test_my_travel_offers(self):
        url = reverse('my_travel_offers')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_offer(self):
        url = reverse('travel_offers_add')
        data = {
            'title': 'New Offer',
            'description': 'New Description',
            'price': 200.0,
            'date_departure': '2024-06-15T10:00:00Z',
            'place_departure': 'Berlin',
            'place_arrival': 'Munich',
            'number_of_seats': 4,
            'phone_number': '987654321'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['place_departure'], 'Berlin')

    def test_update_offer(self):
        url = reverse('offer_update', args=[self.travel_offer.pk])
        data = {
            'title': 'Updated Offer',
            'description': 'Updated Description',
            'price': 150.0,
            'date_departure': '2024-06-01T10:00:00Z',
            'place_departure': 'Warsaw',
            'place_arrival': 'Gdansk',
            'number_of_seats': 3,
            'phone_number': '123456789'
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['place_arrival'], 'Gdansk')

    def test_delete_offer(self):
        url = reverse('delete_offer', args=[self.travel_offer.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(TravelOffer.objects.filter(pk=self.travel_offer.pk).exists())

    def test_offer_archive(self):
        url = reverse('offer_archive', args=[self.travel_offer.pk])
        response = self.client.put(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.travel_offer.refresh_from_db()
        self.assertFalse(self.travel_offer.status)
