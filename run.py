from app import create_app
from app.config import ProdConfig, DevConfig


app = create_app()

if __name__ == "__main__":
    app.run()