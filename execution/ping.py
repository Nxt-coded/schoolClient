import sys
import os

def main():
    print("Agent Execution Environment: ONLINE")
    print(f"Python Version: {sys.version}")
    print(f"Current Directory: {os.getcwd()}")
    
    # Check for .env file
    if os.path.exists(".env"):
        print(".env file found.")
    else:
        print(".env file not found.")

if __name__ == "__main__":
    main()
