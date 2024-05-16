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


def test_get_profile(client):
    test_signin(client)

    response = client.get("/users/me")

    assert response.status_code == 200
    assert response.json()["name"] == TEST_USER["name"]
    assert response.json()["email"] == TEST_USER["email"]


def test_update_profile(client):
    test_signin(client)

    response = client.put("/users/me", json={"name": "updated test"})

    assert response.status_code == 200
    assert response.json()["name"] == "updated test"
