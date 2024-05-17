TEST_USER = {"name": "test", "email": "test@gmail.com", "password": "testtest"}


def test_signup(client):
    response = client.post("/users/signup", json=TEST_USER)

    print(response.json())
    assert response.status_code == 201
    assert response.json()["detail"] == "User created successfully."


def test_signin(client):
    test_signup(client)

    response = client.post(
        "/users/signin", json={"email": "test@gmail.com", "password": "testtest"}
    )

    assert response.status_code == 200


def test_get_profile(client, get_user_tokens):

    access_token = get_user_tokens[0]
    response = client.get(
        url="/users/me", headers={"Authorization": f"Bearer {access_token}"}
    )

    assert response.status_code == 200
    assert response.json()["name"] == "testconf"
    assert response.json()["email"] == "test@test.com"


def test_update_profile(client, get_user_tokens):
    access_token = get_user_tokens[0]
    response = client.put(
        url="/users/me",
        headers={"Authorization": f"Bearer {access_token}"},
        json={"email": "test@updated.com"},
    )

    assert response.status_code == 200
    assert response.json()["email"] == "test@updated.com"
