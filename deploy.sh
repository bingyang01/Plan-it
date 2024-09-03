# Stop and remove existing Docker containers
docker-compose down || exit 1

# Remove old Docker images, ignoring errors if they don't exist
docker image rm comp47360_research-practicum_web || true
docker image rm comp47360_research-practicum_nginx || true

# Pull the latest code
git pull || exit 1

# Navigate to front_end directory
cd front_end || exit 1

# Remove the build directory
rm -rf build || exit 1

# Install npm dependencies
npm install || exit 1

# Build the project
npm run build || exit 1

cd ..

# Start Docker containers in a detached screen session
docker-compose up --detach --build