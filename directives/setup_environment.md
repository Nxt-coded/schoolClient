# Setup Environment

## Requirements
- **Python 3.x**: Required for execution layer scripts.
- **Node.js / npm**: Required for frontend development.
- **Git**: For version control.

## Installation
1. **Frontend**:
   ```bash
   npm install
   ```
2. **Python Environment**:
   (Optional) Create a virtual environment for execution scripts.
   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   ```

## Verification
Run the following command to verify the execution layer:
```bash
python execution/ping.py
```

## Environment Variables (.env)
Ensure the following keys are present in `.env`:
- (List any required API keys here as they are discovered)
