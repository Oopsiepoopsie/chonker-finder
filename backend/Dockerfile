# Dockerfile for Flask backend

# Use an official Python image as a parent image
FROM python:3.10-slim

# Set the working directory
WORKDIR /backend

# Install any needed packages specified in requirements.txt
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Run the app
# CMD ["flask", "run", "--host=0.0.0.0", "--port=8080"]
CMD ["flask", "run"]
