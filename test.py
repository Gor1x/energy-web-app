import unittest
from app import create_app
from app.config import TestConfig
from app.exts import db
from pathlib import Path


class APITestCase(unittest.TestCase):
    resources = Path(__file__).parent / "testdata"
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_signup(self):
        signup_response = self.client.post(
            "/auth/signup",
            json={
                "username": "testuser",
                "email": "testuser@test.com",
                "password": "password",
            },
        )
        status_code = signup_response.status_code
        self.assertEqual(status_code, 201)

    def test_login(self):
        self.client.post(
            "/auth/signup",
            json={
                "username": "testuser",
                "email": "testuser@test.com",
                "password": "password",
            }
        )
        login_response = self.client.post(
            "/auth/login", 
            json={
                "username": "testuser",
                "password": "password"
            }
        )
        status_code = login_response.status_code
        self.assertEqual(status_code, 200)

    def test_add_algorithm(self):
        self.client.post(
            "/auth/signup",
            json={
                "username": "testuser",
                "email": "testuser@test.com",
                "password": "password",
            }
        )
        login_response = self.client.post(
            "/auth/login", 
            json={
                "username": "testuser",
                "password": "password"
            }
        )
        access_token = login_response.json['data']['access_token']
        add_response = self.client.post(
            "/algorithms/",
            headers={"Authorization": f"Bearer {access_token}"},
            data={
                "file": (self.resources / "algorithms.py").open("rb"),
            }
        )
        status_code = add_response.status_code
        self.assertEqual(status_code, 200)


if __name__ == "__main__":
    unittest.main()