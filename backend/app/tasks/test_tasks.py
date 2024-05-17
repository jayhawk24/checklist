def test_get_task(client, get_user_tokens):

    response = client.get(
        "/tasks", headers={"Authorization": f"Bearer {get_user_tokens[0]}"}
    )

    assert response.status_code == 200


def test_create_task(client, get_user_tokens):

    response = client.post(
        "/tasks",
        json={"title": "Test Task", "description": "Test Description"},
        headers={"Authorization": f"Bearer {get_user_tokens[0]}"},
    )

    assert response.status_code == 200


def test_update_task(client, get_user_tokens):

    test_create_task(client, get_user_tokens)

    tasks = client.get(
        "/tasks", headers={"Authorization": f"Bearer {get_user_tokens[0]}"}
    ).json()

    print(tasks)

    response = client.put(
        f"/tasks/{tasks['items'][0]['id']}",
        json={"title": "Test Task", "description": "Test Description"},
        headers={"Authorization": f"Bearer {get_user_tokens[0]}"},
    )

    assert response.status_code == 200


def test_delete_task(client, get_user_tokens):

    test_create_task(client, get_user_tokens)

    tasks = client.get(
        "/tasks", headers={"Authorization": f"Bearer {get_user_tokens[0]}"}
    ).json()

    response = client.delete(
        f"/tasks/{tasks['items'][0]['id']}",
        headers={"Authorization": f"Bearer {get_user_tokens[0]}"},
    )

    assert response.status_code == 200
