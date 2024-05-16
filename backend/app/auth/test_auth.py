from auth.tokens import create_refresh_token


def test_refresh_token_invalid(client):

    response = client.post(
        "/auth/refresh-token", json={"refresh_token": "random string"}
    )

    assert response.status_code == 400


def test_refresh_token(client):
    refresh_token = create_refresh_token(data={"user_id": "RANDOM_ID"})

    response = client.post("/auth/refresh-token", json={"refresh_token": refresh_token})

    assert response.status_code == 200
