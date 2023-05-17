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

    def signup(self):
        return self.client.post(
            "/auth/signup",
            json={
                "username": "testuser",
                "email": "testuser@test.com",
                "password": "password",
            }
        )

    def login(self):
        return self.client.post(
            "/auth/login", 
            json={
                "username": "testuser",
                "password": "password"
            }
        )
    
    def add_algorithm(self, access_token):
        return self.client.post(
            "/algorithms/",
            headers={"Authorization": f"Bearer {access_token}"},
            data={
                "file": (self.resources / "algorithms.py").open("rb"),
            }
        )

    def add_dataset(self, access_token):
        return self.client.post(
            "/datasets/",
            headers={"Authorization": f"Bearer {access_token}"},
            data={
                "file": (self.resources / "dataset.csv").open("rb"),
            }
        )

    def test_signup(self):
        signup_response = self.signup()
        status_code = signup_response.status_code
        self.assertEqual(status_code, 201)

    def test_login(self):
        self.signup()
        login_response = self.login()
        status_code = login_response.status_code
        self.assertEqual(status_code, 200)

    def test_add_algorithm(self):
        self.signup()
        login_response = self.login()
        access_token = login_response.json['data']['access_token']
        add_response = self.add_algorithm(access_token)
        status_code = add_response.status_code
        self.assertEqual(status_code, 200)

    def test_add_dataset(self):
        self.signup()
        login_response = self.login()
        access_token = login_response.json['data']['access_token']
        add_response = self.add_dataset(access_token)
        status_code = add_response.status_code
        self.assertEqual(status_code, 200)

    def test_get_algorithm(self):
        self.signup()
        login_response = self.login()
        access_token = login_response.json['data']['access_token']
        add_response = self.add_algorithm(access_token)
        id = add_response.json[0]['id']
        get_response = self.client.get(
            f"/algorithms/{id}",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        status_code = get_response.status_code
        self.assertEqual(status_code, 200)

    def test_get_dataset(self):
        self.signup()
        login_response = self.login()
        access_token = login_response.json['data']['access_token']
        add_response = self.add_dataset(access_token)
        id = add_response.json[0]['id']
        get_response = self.client.get(
            f"/datasets/{id}",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        status_code = get_response.status_code
        self.assertEqual(status_code, 200)

    def test_run(self):
        self.signup()
        login_response = self.login()
        access_token = login_response.json['data']['access_token']
        add_response = self.add_algorithm(access_token)
        algorithm_id = add_response.json[0]['id']
        add_response = self.add_dataset(access_token)
        dataset_id = add_response.json[0]['id']
        num_rows = add_response.json[0]['num_rows']
        run_response = self.client.get(
            f"/run/?algorithm_id={algorithm_id}&dataset_id={dataset_id}",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        status_code = run_response.status_code
        self.assertEqual(status_code, 200)
        self.assertEqual(len(run_response.json), num_rows)


if __name__ == "__main__":
    unittest.main()