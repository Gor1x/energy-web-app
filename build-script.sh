#!/bin/bash
pip install -r requirements3.7.txt
printf 'db.create_all()\nquit()' | python3 -m flask -app run shell
