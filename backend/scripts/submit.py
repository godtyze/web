import random
import requests

if __name__ == '__main__':
    cpu = round(random.random() * 100)
    ram = round(random.random() * 100)
    cpu_response = requests.post('http://localhost:5000/cpu', json={
        'usage': cpu
    })
    ram_response = requests.post('http://localhost:5000/ram', json={
        'usage': ram
    })
    print('cpu request status:' + str(cpu_response.status_code))
    print('ram request status:' + str(ram_response.status_code))
