from bs4 import BeautifulSoup
from selenium import webdriver
import time
from pyvirtualdisplay import Display
from api.constants import *

coin_address = '0x4e8a9d0bf525d78fd9e0c88710099f227f6924cf'


def scraping(url):
    display = Display(visible=0, size=(1200, 1200))
    display.start()
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--disable-extensions')
    chrome_options.add_argument('--profile-directory=Default')
    chrome_options.add_argument("--incognito")
    chrome_options.add_argument("--disable-plugins-discovery")
    print(chrome_driver_dir)
    driver = webdriver.Chrome(executable_path=chrome_driver_dir, options=chrome_options)
    driver.delete_all_cookies()
    driver.get(url)

    time.sleep(5)  # 5 seconds
    html = driver.page_source
    display.stop()

    return BeautifulSoup(html, 'lxml')

# Get Html
page = scraping("https://poocoin.app/tokens/" + coin_address)

# Extract price as str
prices = page.find_all("span", class_="text-success")
# the element position always changes
price = prices[7].getText()
print(price)
