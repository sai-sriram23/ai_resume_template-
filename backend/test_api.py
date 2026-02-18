import requests
import json

BASE_URL = "http://localhost:8000"

def test_api():
    print("Testing Root...")
    try:
        r = requests.get(BASE_URL)
        print(r.json())
    except Exception as e:
        print(f"Failed to connect: {e}")
        return

    data = {
        "personal": {
            "fullName": "Test User",
            "jobTitle": "Developer",
            "email": "test@example.com",
            "phone": "1234567890",
            "linkedin": "linkedin.com/in/test",
            "summary": "Experienced developer."
        },
        "experience": [],
        "education": [],
        "skills": ["Python", "React"],
        "template": "modern"
    }

    print("Testing PDF Generation...")
    try:
        r = requests.post(f"{BASE_URL}/generate/pdf", json=data)
        if r.status_code == 200:
            print(f"PDF Generated: {len(r.content)} bytes")
            with open("test_output.pdf", "wb") as f:
                f.write(r.content)
        else:
            print(f"PDF Failed: {r.text}")
    except Exception as e:
        print(f"PDF Error: {e}")

if __name__ == "__main__":
    test_api()
