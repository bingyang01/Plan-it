def test_app_index(client):
    response = client.get("/")
    assert response.status_code == 200
def test_app_is_running(client):
    response = client.get('/hello')
    assert response.status_code == 200
    assert response.data == b'Hello, World!'