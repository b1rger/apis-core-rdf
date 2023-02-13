name: Run tests

on: [push, pull_request, workflow_dispatch]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.8", "3.9", "3.10"]
        poetry-version: ["1.3"]
    steps:
    - uses: actions/checkout@v3
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v3
      with:
        python-version: ${{ matrix.python-version }}
    - name: Install poetry ${{ matrix.poetry-version }}
      run: |
        python -m ensurepip
        python -m pip install --upgrade pip
        python -m pip install poetry==${{ matrix.poetry-version }}
    - name: Install dependencies
      run: |
        poetry install
    - name: Run tests
      run: |
        ./manage.py test
