from app import create_app
from app.config import ProdConfig


app = create_app(ProdConfig)

if __name__ == "__main__":
    app.run()