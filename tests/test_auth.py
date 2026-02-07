from app.application.auth import hash_password, verify_password


def test_hash_and_verify_password():
    password = "secret123"
    stored = hash_password(password)
    assert "$" in stored
    assert verify_password(password, stored)
    assert not verify_password("wrong", stored)
