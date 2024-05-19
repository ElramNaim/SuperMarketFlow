import mysql.connector
import random
import uuid


class Customer:

    def __init__(self, enter_hour, enter_minute):
        self.id = None
        self.enter_hour = enter_hour
        self.enter_minute = enter_minute
        self.time_before_queue = None
        self.serving_hour = None
        self.serving_minute = None
        self.queue_hour = None
        self.waiting_time = None
        self.queue_minute = None
        self.total_time = None
        self.queue_time = 0

    def __repr__(self):
        return str(f"serving hour :{self.serving_hour} ,serving minute: {self.serving_minute} queue hour :{self.queue_hour} ,queue hour: {self.queue_minute} total :{self.queue_time}")


def random_number():
    num = random.uniform(0, 1)  # generate a random float between 0 and 1
    if num < 0.6:  # 60% chance of getting a number between 10 and 17
        return random.randint(10, 17)
    elif num < 0.8:  # 20% chance of getting a number between 7 and 10
        return random.randint(7, 10)
    else:  # 20% chance of getting a number between 17 and 22
        return random.randint(17, 21)


def queueRandomNum():
    return random.uniform(5, 10)


def sort_customers(customer_arrivals):
    sorted_customers = sorted(
        customer_arrivals, key=lambda c: (c.enter_hour, c.enter_minute))
    return sorted_customers


def sort_service(customer_arrivals):
    sorted_customers = sorted(customer_arrivals, key=lambda c: (
        c.serving_hour, c.serving_minute))
    return sorted_customers


def addId(customer_arrivals):
    for i in range(len(customer_arrivals)):
        customer_arrivals[i].id = str(uuid.uuid4())
    return customer_arrivals


def simulate_supermarket():

    cnx = mysql.connector.connect(
        user='root',
        password='password',
        host='localhost',
        database='supermarket'
    )
    cursor = cnx.cursor()

    for week in range(1, 5):
        for day in range(1, 6):
            customer_arrivals = []
        # Generate a fixed number of customers for the day
            customer_count = random.randint((day)*50, (day)*100)
        # create for all customers enter time and append to the customers_arrivals
            for customer in range(customer_count):
                # Generate a random enter hour and minute
                enter_hour = random_number()  # 7
                enter_minute = random.randint(0, 59) 
                customer = Customer(enter_hour, enter_minute)
                customer_arrivals.append(customer)
        # sort and add id
            customer_arrivals = sort_customers(customer_arrivals)
            customer_arrivals = addId(customer_arrivals)
        # add traveling time foreach customer in the store
            for i in range(len(customer_arrivals)):
                customer = customer_arrivals[i]
                customer.time_before_queue = random.randint(4, 10)
                if (customer.enter_minute + customer.time_before_queue > 60):
                    customer.serving_hour = customer.enter_hour+1
                    customer.serving_minute = (
                        customer.enter_minute + customer.time_before_queue) % 60
                else:
                    customer.serving_hour = customer.enter_hour
                    customer.serving_minute = customer.enter_minute + customer.time_before_queue
    # sort customer in their way to the queue
            sort_service(customer_arrivals)
            for customer in customer_arrivals:
                queuetime = queueRandomNum()
                if (customer.serving_minute + queuetime > 60):
                    customer.queue_hour = customer.serving_hour+1
                    customer.queue_minute = (
                        customer.serving_minute + queuetime) % 60
                else:
                    customer.queue_hour = customer.serving_hour
                    customer.queue_minute = customer.serving_minute+queuetime
            for i in range(1, len(customer_arrivals)):
                customer = customer_arrivals[i]
                perv_customers = customer_arrivals[i-1]
                if perv_customers.queue_hour == customer.serving_hour and perv_customers.queue_minute >= customer.serving_minute:
                    customer.queue_time = (perv_customers.queue_minute -
                                           customer.serving_minute)+perv_customers.queue_time
                    # open another queue
                    if customer.queue_time > 60:
                        customer.queue_time = customer.serving_minute
            for customer in customer_arrivals:
                query = "INSERT INTO cq1(id,week,day,serv_hour, serv_minute,queue_time) VALUES (%s,%s,%s, %s, %s, %s)"
                values = (customer.id, week, day, customer.serving_hour,
                          customer.serving_minute, customer.queue_time)
                cursor.execute(query, values)
                cnx.commit()


simulate_supermarket()
