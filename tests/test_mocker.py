# test_mocker.py
import googlemaps
import pytest


def test_mocker_functionality(mocker):
    mock_function = mocker.patch('googlemaps.Client.places_nearby', return_value={'results': []})

    # 模拟 googlemaps.Client 的初始化以忽略 API 密钥验证
    mocker.patch('googlemaps.Client.__init__', return_value=None)

    gmaps = googlemaps.Client(key='test')
    gmaps.key = 'test'  # 手动设置密钥
    result = gmaps.places_nearby(location="40.7128,-74.0060", radius=1500, type="restaurant")

    assert result == {'results': []}
    mock_function.assert_called_once()
