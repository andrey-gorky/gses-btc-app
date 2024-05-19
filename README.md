# BTC application

## 1. HOW TO RUN
Paste inside the project `SECRETS.env` files with your email configuration:
```dotenv
EMAIL_ADDRESS=your.email.address@ukr.net
EMAIL_PASSWORD=password
```

Inside project root directory run:
```bash
docker compose up --build
```

## API Endpoints

### GET http://localhost:3000/api/rate
The route will return current value of USD/UAH exchange rate.
```curl
curl --location 'http://localhost:3000/api/rate' \
--header 'Content-Type: application/x-www-form-urlencoded'
```

### POST http://localhost:3000/api/subscribe
The route will subscribe email for mailing info about USD/UAH exchange rate.
```curl
curl --location 'http://localhost:3000/api/subscribe' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'email=gorkaviya@gmail.com'
```

### GET http://localhost:3000/api/subscribe/manual-mailing
The route will return current value of USD/UAH exchange rate.
```curl
curl --location 'http://localhost:3000/api/subscribe/manual-mailing' \
--header 'Content-Type: application/x-www-form-urlencoded'
```


## Cron Jobs
### emailJob
The job will start mailing code, which will send a letter with current USD/UAH exchange rate to every email stored in the mongo db database at 09:00

