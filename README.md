# Django/React CRM System
Building a CRM system using React as a front end and Django (django_restframework) as a REST API backend service. Following guide by Ahmed Boucherfra from DigitalOcean.


# Before you start
- Understanding of REST API
- Understanding of Django Framework
- Understanding of React Framework


# Running the development servers
```sh
# Activate virtual environment before hand
source /**location_of_python3_virtualenv**/bin/activate

# Running the backend REST API
cd /root_directory
python manage.py runserver

# Running the frontend React server
cd /frontend
npm install
npm start
```

# Screenshots
- No screenshots at this point in time.

# Tests
- Successfully deleted a record via the front end server (Delete button via http://localhost:3000/)
- Successfully created a record (Customer) via the front end server (http://localhost:3000/customer/)
- Successfully rendering list of records via front end server (http://localhost:3000/)
- Successfully paginated results on front end server bidirectionally
- Successfully updated a record via front end server (Update button via http://localhost:3000/customer/:pk)


# Contributors
- Daniel Corcoran


# Sources
- [How To Build a Modern Web Application to Manage Customer Information with Django and React on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-build-a-modern-web-application-to-manage-customer-information-with-django-and-react-on-ubuntu-18-04)